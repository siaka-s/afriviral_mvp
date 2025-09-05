#!/bin/bash

# AfriViral Production Deployment Script
# Usage: ./deploy.sh [environment] [domain]

set -e

# Configuration
ENVIRONMENT=${1:-production}
DOMAIN=${2:-localhost}
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/afriviral"
LOG_FILE="/var/log/afriviral/deploy_${TIMESTAMP}.log"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}" | tee -a "$LOG_FILE"
}

warning() {
    echo -a "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}" | tee -a "$LOG_FILE"
}

# Check if running as root for system operations
check_root() {
    if [[ $EUID -ne 0 ]]; then
        warning "Some operations require root privileges. Run with sudo if needed."
    fi
}

# Pre-deployment checks
pre_deploy_checks() {
    log "Starting pre-deployment checks..."
    
    # Check Docker
    if ! command -v docker &> /dev/null; then
        error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    # Check Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    
    # Check environment variables
    if [[ ! -f .env ]]; then
        warning ".env file not found. Creating from .env.example..."
        cp .env.example .env
        error "Please configure .env file with production values before continuing."
        exit 1
    fi
    
    # Check SSL certificates
    if [[ ! -f nginx/ssl/cert.pem ]] || [[ ! -f nginx/ssl/key.pem ]]; then
        warning "SSL certificates not found. Generating self-signed certificates for development..."
        mkdir -p nginx/ssl
        openssl req -x509 -newkey rsa:4096 -keyout nginx/ssl/key.pem -out nginx/ssl/cert.pem -days 365 -nodes -subj "/C=CI/ST=Abidjan/L=Abidjan/O=AfriViral/CN=$DOMAIN"
    fi
    
    log "Pre-deployment checks completed successfully."
}

# Backup current deployment
backup_current() {
    log "Creating backup of current deployment..."
    
    mkdir -p "$BACKUP_DIR"
    
    # Backup database
    if docker-compose ps postgres | grep -q "Up"; then
        docker-compose exec -T postgres pg_dump -U afriviral_user afriviral > "$BACKUP_DIR/db_backup_${TIMESTAMP}.sql"
        log "Database backup created: $BACKUP_DIR/db_backup_${TIMESTAMP}.sql"
    fi
    
    # Backup application logs
    if [[ -d backend/logs ]]; then
        tar -czf "$BACKUP_DIR/logs_backup_${TIMESTAMP}.tar.gz" backend/logs/
        log "Logs backup created: $BACKUP_DIR/logs_backup_${TIMESTAMP}.tar.gz"
    fi
}

# Deploy application
deploy_application() {
    log "Starting deployment process..."
    
    # Pull latest images
    log "Pulling latest Docker images..."
    docker-compose pull
    
    # Build images
    log "Building application images..."
    docker-compose build --no-cache
    
    # Stop current services
    log "Stopping current services..."
    docker-compose down
    
    # Start services
    log "Starting services..."
    docker-compose up -d
    
    # Wait for services to be ready
    log "Waiting for services to be ready..."
    sleep 30
    
    # Health checks
    log "Performing health checks..."
    
    # Check database
    if docker-compose exec postgres pg_isready -U afriviral_user -d afriviral; then
        log "✅ Database is ready"
    else
        error "❌ Database health check failed"
        exit 1
    fi
    
    # Check backend
    if curl -f http://localhost:3001/health > /dev/null 2>&1; then
        log "✅ Backend API is ready"
    else
        error "❌ Backend health check failed"
        exit 1
    fi
    
    # Check frontend
    if curl -f http://localhost:3000 > /dev/null 2>&1; then
        log "✅ Frontend is ready"
    else
        error "❌ Frontend health check failed"
        exit 1
    fi
    
    log "✅ All services are healthy and ready!"
}

# Post-deployment tasks
post_deploy() {
    log "Running post-deployment tasks..."
    
    # Update database schema if needed
    if [[ -f database/migrations.sql ]]; then
        log "Running database migrations..."
        docker-compose exec postgres psql -U afriviral_user -d afriviral -f /docker-entrypoint-initdb.d/migrations.sql
    fi
    
    # Clear cache
    log "Clearing application cache..."
    docker-compose exec redis redis-cli FLUSHALL
    
    # Restart n8n workflows
    log "Restarting n8n workflows..."
    docker-compose restart n8n
    
    log "Post-deployment tasks completed."
}

# Monitoring setup
setup_monitoring() {
    log "Setting up monitoring..."
    
    # Create monitoring directories
    mkdir -p monitoring/logs
    mkdir -p monitoring/metrics
    
    # Install monitoring tools if not present
    if ! command -v htop &> /dev/null; then
        log "Installing monitoring tools..."
        apt-get update && apt-get install -y htop iotop nethogs
    fi
    
    log "Monitoring setup completed."
}

# Generate deployment report
generate_report() {
    log "Generating deployment report..."
    
    cat > "deployment_report_${TIMESTAMP}.md" << EOF
# AfriViral Deployment Report

**Date:** $(date)
**Environment:** $ENVIRONMENT
**Domain:** $DOMAIN

## Services Status
\`\`\`
$(docker-compose ps)
\`\`\`

## Health Checks
- Database: $(docker-compose exec postgres pg_isready -U afriviral_user -d afriviral && echo "✅ HEALTHY" || echo "❌ FAILED")
- Backend: $(curl -f http://localhost:3001/health > /dev/null 2>&1 && echo "✅ HEALTHY" || echo "❌ FAILED")
- Frontend: $(curl -f http://localhost:3000 > /dev/null 2>&1 && echo "✅ HEALTHY" || echo "❌ FAILED")

## URLs
- Application: https://$DOMAIN
- API: https://$DOMAIN/api
- n8n: https://$DOMAIN:5678
- Health Check: https://$DOMAIN/health

## Logs Location
- Application logs: ./logs/
- Deployment logs: $LOG_FILE
- Database backup: $BACKUP_DIR/

## Next Steps
1. Configure DNS to point to your server IP
2. Update SSL certificates for production
3. Configure monitoring alerts
4. Set up automated backups
5. Configure CDN (optional)
EOF
    
    log "Deployment report generated: deployment_report_${TIMESTAMP}.md"
}

# Main deployment flow
main() {
    log "🚀 Starting AfriViral production deployment..."
    log "Environment: $ENVIRONMENT"
    log "Domain: $DOMAIN"
    
    check_root
    pre_deploy_checks
    backup_current
    deploy_application
    post_deploy
    setup_monitoring
    generate_report
    
    log "🎉 Deployment completed successfully!"
    log "Access your application at: https://$DOMAIN"
    log "Check deployment report: deployment_report_${TIMESTAMP}.md"
}

# Handle script interruption
trap 'error "Deployment interrupted by user"' INT TERM

# Run main function
main "$@"