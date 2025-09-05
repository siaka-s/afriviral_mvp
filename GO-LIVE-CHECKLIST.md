# 🚀 AfriViral MVP - Go-Live Checklist

## 📋 Pre-Launch Verification (15 minutes)

### ✅ Environment Setup
- [ ] **Production `.env` file configured** - Copy `.env.production` to `.env`
- [ ] **SSL certificates generated** - Run `./scripts/setup-ssl.sh`
- [ ] **Domain DNS configured** - A records pointing to server IP
- [ ] **Firewall ports open** - 80, 443, 5432, 6379

### ✅ Security Checklist
- [ ] **JWT secrets changed** from defaults in production
- [ ] **Database password updated** from defaults
- [ ] **Redis password configured** if using external Redis
- [ ] **API rate limiting enabled** in nginx.conf
- [ ] **Security headers verified** in nginx.conf

### ✅ Database & Data
- [ ] **Database migrations run** - `./scripts/migrate.sh`
- [ ] **Production database seeded** with minimal data
- [ ] **Database backups configured** - Daily automated backups
- [ ] **Connection pooling configured** - Check PostgreSQL settings

### ✅ Services Health
- [ ] **All containers building** - `docker-compose build`
- [ ] **Services starting** - `docker-compose up -d`
- [ ] **Health checks passing** - Run `node monitoring/health-check.js`
- [ ] **Logs accessible** - Check `docker-compose logs`

---

## 🎯 Go-Live Commands (5 minutes)

```bash
# 1. Quick deployment
chmod +x deploy.sh
./deploy.sh

# 2. Verify deployment
node monitoring/health-check.js

# 3. Check SSL
openssl s_client -connect your-domain.com:443

# 4. Monitor real-time logs
docker-compose logs -f
```

---

## 🚨 Post-Launch Monitoring (30 minutes)

### 🔍 Health Monitoring
- [ ] **Frontend accessible** - https://your-domain.com
- [ ] **Backend API responding** - https://your-domain.com/api/health
- [ ] **Database connections** - Check PostgreSQL logs
- [ ] **Redis cache working** - Monitor cache hits/misses

### 📊 Performance Monitoring
- [ ] **Response times < 500ms** - Monitor via health checks
- [ ] **Memory usage < 80%** - `docker stats`
- [ ] **CPU usage < 70%** - `htop` or `top`
- [ ] **Disk space > 20% free** - `df -h`

### 🛡️ Security Monitoring
- [ ] **No failed auth attempts** - Check application logs
- [ ] **Rate limiting working** - Test with curl
- [ ] **SSL grade A+** - Test at ssllabs.com/ssltest
- [ ] **No exposed ports** - `netstat -tlnp`

---

## 📱 User Acceptance Tests (10 minutes)

### 🔐 Authentication Flow
- [ ] **Registration works** - Test both annonceur & influenceur
- [ ] **Login works** - Verify JWT tokens
- [ ] **Password reset** - Test email delivery
- [ ] **Session management** - Check token expiration

### 📊 Dashboard Features
- [ ] **Statistics loading** - Check dashboard data
- [ ] **Brief creation** - Test full workflow
- [ ] **Campaign management** - Create test campaign
- [ ] **User profile updates** - Test profile changes

---

## 📊 Monitoring Dashboard URLs

| Service | URL | Credentials |
|---------|-----|-------------|
| **Application** | https://your-domain.com | - |
| **Backend API** | https://your-domain.com/api | - |
| **n8n Workflows** | https://your-domain.com/n8n | See .env |
| **Health Check** | https://your-domain.com/health | - |

---

## 🔄 Backup & Recovery

### Daily Backups
```bash
# Automated backup script
./scripts/backup.sh

# Manual backup
docker exec afriviral-db pg_dump -U afriviral > backup_$(date +%Y%m%d_%H%M%S).sql
```

### Recovery Process
1. **Stop services**: `docker-compose down`
2. **Restore database**: `docker exec -i afriviral-db psql -U afriviral < backup.sql`
3. **Restart services**: `docker-compose up -d`
4. **Verify**: Run health checks

---

## 🆘 Emergency Contacts

| Issue | Contact | Method |
|-------|---------|--------|
| **Server Down** | Hosting Provider | Support Ticket |
| **Database Issues** | DBA Team | Slack/Email |
| **Security Breach** | Security Team | Phone/Slack |
| **Domain Issues** | Domain Registrar | Support Portal |

---

## 📈 Post-Launch Metrics

### Key Performance Indicators (KPIs)
- **Page Load Time**: < 3 seconds
- **API Response Time**: < 500ms
- **Database Query Time**: < 100ms
- **Uptime**: > 99.9%
- **Error Rate**: < 1%

### Monitoring Tools
- **Health Checks**: Every 5 minutes
- **Uptime Monitoring**: UptimeRobot or similar
- **Performance**: New Relic or DataDog
- **Logs**: ELK Stack or CloudWatch

---

## 🎉 Launch Success Criteria

✅ **All checklist items completed**  
✅ **Health checks passing for 30 minutes**  
✅ **No critical errors in logs**  
✅ **User acceptance tests passed**  
✅ **SSL certificate valid**  
✅ **Monitoring alerts configured**  

---

## 🚀 Next Steps After Launch

1. **Monitor for 24 hours** - Watch for any issues
2. **Send launch announcement** - Email to users
3. **Schedule first maintenance** - Weekly review
4. **Plan feature roadmap** - Next sprint planning
5. **Gather user feedback** - Survey users

---

**🎯 Ready to Launch?** Run `./deploy.sh` and follow this checklist!