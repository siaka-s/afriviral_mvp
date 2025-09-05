#!/bin/bash

# SSL Certificate Setup Script for AfriViral
# Supports Let's Encrypt and self-signed certificates

set -e

DOMAIN=${1:-localhost}
EMAIL=${2:-admin@afriviral.com}
CERT_TYPE=${3:-letsencrypt}

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
    exit 1
}

# Check if running as root
check_root() {
    if [[ $EUID -ne 0 ]]; then
        error "This script must be run as root for SSL certificate installation"
    fi
}

# Install Certbot for Let's Encrypt
install_certbot() {
    log "Installing Certbot..."
    
    if command -v apt-get &> /dev/null; then
        apt-get update
        apt-get install -y certbot python3-certbot-nginx
    elif command -v yum &> /dev/null; then
        yum install -y epel-release
        yum install -y certbot python3-certbot-nginx
    elif command -v dnf &> /dev/null; then
        dnf install -y certbot python3-certbot-nginx
    else
        error "Package manager not supported. Please install Certbot manually."
    fi
}

# Generate Let's Encrypt certificate
setup_letsencrypt() {
    log "Setting up Let's Encrypt certificate for $DOMAIN..."
    
    # Stop nginx temporarily
    docker-compose stop nginx
    
    # Generate certificate
    certbot certonly --standalone -d $DOMAIN -d www.$DOMAIN --email $EMAIL --agree-tos --no-eff-email
    
    # Copy certificates to nginx directory
    mkdir -p nginx/ssl
    cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem nginx/ssl/cert.pem
    cp /etc/letsencrypt/live/$DOMAIN/privkey.pem nginx/ssl/key.pem
    
    # Set proper permissions
    chmod 644 nginx/ssl/cert.pem
    chmod 600 nginx/ssl/key.pem
    
    # Start nginx
    docker-compose start nginx
    
    log "Let's Encrypt certificate setup completed"
}

# Generate self-signed certificate for development
setup_selfsigned() {
    log "Setting up self-signed certificate for $DOMAIN..."
    
    mkdir -p nginx/ssl
    
    openssl req -x509 -newkey rsa:4096 -keyout nginx/ssl/key.pem -out nginx/ssl/cert.pem -days 365 -nodes \
        -subj "/C=CI/ST=Abidjan/L=Abidjan/O=AfriViral/CN=$DOMAIN"
    
    chmod 644 nginx/ssl/cert.pem
    chmod 600 nginx/ssl/key.pem
    
    log "Self-signed certificate setup completed"
}

# Setup auto-renewal for Let's Encrypt
setup_renewal() {
    log "Setting up auto-renewal for Let's Encrypt..."
    
    # Create renewal script
    cat > /usr/local/bin/certbot-renew-afriviral.sh << EOF
#!/bin/bash
# Auto-renewal script for AfriViral SSL certificates

docker-compose stop nginx
certbot renew --quiet
docker-compose start nginx
EOF
    
    chmod +x /usr/local/bin/certbot-renew-afriviral.sh
    
    # Add to crontab
    (crontab -l 2>/dev/null; echo "0 2 * * * /usr/local/bin/certbot-renew-afriviral.sh") | crontab -
    
    log "Auto-renewal setup completed"
}

# Main function
main() {
    log "🔒 Starting SSL certificate setup for AfriViral..."
    log "Domain: $DOMAIN"
    log "Email: $EMAIL"
    log "Certificate type: $CERT_TYPE"
    
    check_root
    
    case $CERT_TYPE in
        "letsencrypt")
            install_certbot
            setup_letsencrypt
            setup_renewal
            ;;
        "selfsigned")
            setup_selfsigned
            ;;
        *)
            error "Invalid certificate type. Use 'letsencrypt' or 'selfsigned'"
            ;;
    esac
    
    log "✅ SSL certificate setup completed successfully!"
    log "Certificate files are located in nginx/ssl/"
    
    if [[ $CERT_TYPE == "letsencrypt" ]]; then
        log "Auto-renewal is configured via cron job"
    fi
}

# Handle script interruption
trap 'error "SSL setup interrupted by user"' INT TERM

# Run main function
main "$@"