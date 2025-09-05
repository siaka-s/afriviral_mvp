#!/bin/bash

# AfriViral Production Backup Script
# Creates comprehensive backups of database, files, and configurations

set -e

# Configuration
BACKUP_DIR="/opt/backups/afriviral"
RETENTION_DAYS=30
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="afriviral_backup_${TIMESTAMP}"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
}

warning() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

# Create backup directory
setup_backup_dir() {
    log "Setting up backup directory..."
    mkdir -p "${BACKUP_DIR}/${BACKUP_NAME}"
    mkdir -p "${BACKUP_DIR}/logs"
}

# Database backup
backup_database() {
    log "Starting database backup..."
    
    local db_container="afriviral-db-1"
    local db_name="afriviral"
    local db_user="afriviral"
    
    # Check if container exists
    if ! docker ps -q -f name=${db_container} | grep -q .; then
        error "Database container ${db_container} not found"
        return 1
    fi
    
    # Create database backup
    docker exec ${db_container} pg_dump \
        -U ${db_user} \
        -d ${db_name} \
        --clean \
        --if-exists \
        --create \
        --verbose \
        > "${BACKUP_DIR}/${BACKUP_NAME}/database.sql"
    
    # Compress backup
    gzip "${BACKUP_DIR}/${BACKUP_NAME}/database.sql"
    
    log "Database backup completed: ${BACKUP_DIR}/${BACKUP_NAME}/database.sql.gz"
}

# Application files backup
backup_application_files() {
    log "Starting application files backup..."
    
    # Backup uploads and media
    mkdir -p "${BACKUP_DIR}/${BACKUP_NAME}/uploads"
    
    # Copy from container if using volume mounts
    if docker volume ls | grep -q "afriviral_uploads"; then
        docker run --rm \
            -v afriviral_uploads:/source \
            -v "${BACKUP_DIR}/${BACKUP_NAME}/uploads":/backup \
            alpine:latest \
            sh -c "cp -r /source/* /backup/"
    fi
    
    # Backup environment files
    if [[ -f ".env" ]]; then
        cp ".env" "${BACKUP_DIR}/${BACKUP_NAME}/"
    fi
    
    # Backup configuration files
    mkdir -p "${BACKUP_DIR}/${BACKUP_NAME}/config"
    cp docker-compose.yml "${BACKUP_DIR}/${BACKUP_NAME}/config/"
    cp nginx.conf "${BACKUP_DIR}/${BACKUP_NAME}/config/"
    
    log "Application files backup completed"
}

# SSL certificates backup
backup_ssl() {
    log "Starting SSL certificates backup..."
    
    if [[ -d "nginx/ssl" ]]; then
        mkdir -p "${BACKUP_DIR}/${BACKUP_NAME}/ssl"
        cp -r nginx/ssl/* "${BACKUP_DIR}/${BACKUP_NAME}/ssl/"
        log "SSL certificates backup completed"
    else
        warning "SSL directory not found, skipping SSL backup"
    fi
}

# Docker images backup
backup_docker_images() {
    log "Starting Docker images backup..."
    
    # Save current running containers
    docker-compose config > "${BACKUP_DIR}/${BACKUP_NAME}/docker-compose-config.yml"
    
    # Save Docker images
    docker-compose images | grep afriviral > "${BACKUP_DIR}/${BACKUP_NAME}/docker-images.txt"
    
    log "Docker configuration backup completed"
}

# Create backup manifest
create_manifest() {
    log "Creating backup manifest..."
    
    cat > "${BACKUP_DIR}/${BACKUP_NAME}/manifest.json" << EOF
{
    "backup_name": "${BACKUP_NAME}",
    "timestamp": "$(date -Iseconds)",
    "hostname": "$(hostname)",
    "docker_version": "$(docker --version)",
    "docker_compose_version": "$(docker-compose --version)",
    "files": [
        "database.sql.gz",
        "uploads/",
        ".env",
        "config/",
        "ssl/",
        "docker-compose-config.yml",
        "docker-images.txt"
    ],
    "size": "$(du -sh "${BACKUP_DIR}/${BACKUP_NAME}" | cut -f1)"
}
EOF
    
    log "Backup manifest created"
}

# Clean old backups
cleanup_old_backups() {
    log "Cleaning up old backups (older than ${RETENTION_DAYS} days)..."
    
    find "${BACKUP_DIR}" -maxdepth 1 -type d -name "afriviral_backup_*" -mtime +${RETENTION_DAYS} -exec rm -rf {} \; 2>/dev/null || true
    
    log "Old backups cleaned up"
}

# Upload to cloud storage (optional)
upload_to_cloud() {
    log "Uploading backup to cloud storage..."
    
    # AWS S3 example
    if command -v aws &> /dev/null && [[ -n "${AWS_S3_BUCKET}" ]]; then
        aws s3 cp "${BACKUP_DIR}/${BACKUP_NAME}" "s3://${AWS_S3_BUCKET}/afriviral-backups/${BACKUP_NAME}" --recursive
        log "Backup uploaded to S3"
    fi
    
    # Google Cloud Storage example
    if command -v gsutil &> /dev/null && [[ -n "${GCS_BUCKET}" ]]; then
        gsutil -m cp -r "${BACKUP_DIR}/${BACKUP_NAME}" "gs://${GCS_BUCKET}/afriviral-backups/"
        log "Backup uploaded to GCS"
    fi
}

# Send notification
send_notification() {
    local status=$1
    local message=$2
    
    # Slack notification
    if [[ -n "${SLACK_WEBHOOK_URL}" ]]; then
        curl -X POST -H 'Content-type: application/json' \
            --data "{\"text\":\"AfriViral Backup: ${status} - ${message}\"}" \
            "${SLACK_WEBHOOK_URL}"
    fi
    
    # Email notification
    if [[ -n "${BACKUP_EMAIL}" ]]; then
        echo "${message}" | mail -s "AfriViral Backup ${status}" "${BACKUP_EMAIL}"
    fi
}

# Main backup function
main() {
    log "🔄 Starting AfriViral backup process..."
    
    setup_backup_dir
    
    local backup_success=true
    
    # Run all backup operations
    backup_database || backup_success=false
    backup_application_files || backup_success=false
    backup_ssl || backup_success=false
    backup_docker_images || backup_success=false
    create_manifest || backup_success=false
    
    if [[ $backup_success == true ]]; then
        log "✅ Backup completed successfully"
        log "Backup location: ${BACKUP_DIR}/${BACKUP_NAME}"
        log "Backup size: $(du -sh "${BACKUP_DIR}/${BACKUP_NAME}" | cut -f1)"
        
        upload_to_cloud
        cleanup_old_backups
        send_notification "SUCCESS" "Backup completed: ${BACKUP_NAME}"
        
        # Create latest symlink
        ln -sf "${BACKUP_DIR}/${BACKUP_NAME}" "${BACKUP_DIR}/latest"
        
    else
        error "❌ Backup failed - check logs for details"
        send_notification "FAILED" "Backup failed: ${BACKUP_NAME}"
        exit 1
    fi
}

# Handle script interruption
trap 'error "Backup interrupted by user"' INT TERM

# Show usage
usage() {
    echo "Usage: $0 [OPTIONS]"
    echo "Options:"
    echo "  -h, --help     Show this help message"
    echo "  -q, --quiet    Suppress output"
    echo "  -f, --force    Force backup even if checks fail"
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--help)
            usage
            exit 0
            ;;
        -q|--quiet)
            exec > /dev/null 2>&1
            shift
            ;;
        -f|--force)
            FORCE=true
            shift
            ;;
        *)
            error "Unknown option: $1"
            usage
            exit 1
            ;;
    esac
done

# Check if running as root for backup directory
if [[ $EUID -ne 0 ]] && [[ ! -w "/opt/backups" ]]; then
    warning "Running as non-root, using current directory for backups"
    BACKUP_DIR="./backups"
fi

# Create backup directory if it doesn't exist
mkdir -p "${BACKUP_DIR}"

# Run main function
main "$@"