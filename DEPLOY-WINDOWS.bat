@echo off
REM AfriViral MVP - Windows Production Deployment Script
REM Run as Administrator

echo.
echo 🚀 AfriViral MVP - Production Deployment
echo ========================================
echo.

REM Check if running as Administrator
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo ❌ Please run this script as Administrator
    pause
    exit /b 1
)

REM Set variables
set TIMESTAMP=%date:~-4%%date:~4,2%%date:~7,2%_%time:~0,2%%time:~3,2%%time:~6,2%
set TIMESTAMP=%TIMESTAMP: =0%
set LOG_FILE=deploy_%TIMESTAMP%.log

echo [INFO] Starting deployment at %date% %time% > %LOG_FILE%
echo [INFO] Deployment log: %LOG_FILE%
echo.

REM Pre-deployment checks
echo 🔍 Pre-deployment checks...
echo [INFO] Checking Docker... >> %LOG_FILE%
docker --version >nul 2>&1
if %errorLevel% neq 0 (
    echo ❌ Docker not found. Please install Docker Desktop
    pause
    exit /b 1
)
echo ✅ Docker found

echo [INFO] Checking Docker Compose... >> %LOG_FILE%
docker-compose --version >nul 2>&1
if %errorLevel% neq 0 (
    echo ❌ Docker Compose not found
    pause
    exit /b 1
)
echo ✅ Docker Compose found

echo [INFO] Checking .env file... >> %LOG_FILE%
if not exist .env (
    echo ❌ .env file not found. Please copy .env.production to .env
    pause
    exit /b 1
)
echo ✅ .env file found

echo [INFO] Checking SSL certificates... >> %LOG_FILE%
if not exist nginx\ssl\cert.pem (
    echo ⚠️ SSL certificates not found. Using HTTP for development.
    echo ⚠️ For production, run: docker-compose -f docker-compose.yml -f docker-compose.ssl.yml up -d
)

REM Build and deploy
echo.
echo 🏗️ Building application...
echo [INFO] Building Docker images... >> %LOG_FILE%
docker-compose build >> %LOG_FILE% 2>&1
if %errorLevel% neq 0 (
    echo ❌ Build failed. Check %LOG_FILE%
    pause
    exit /b 1
)
echo ✅ Build completed

echo.
echo 🚀 Starting services...
echo [INFO] Starting Docker containers... >> %LOG_FILE%
docker-compose up -d >> %LOG_FILE% 2>&1
if %errorLevel% neq 0 (
    echo ❌ Failed to start services. Check %LOG_FILE%
    pause
    exit /b 1
)
echo ✅ Services started

REM Health checks
echo.
echo 🔍 Running health checks...
timeout /t 30 /nobreak >nul

REM Check if services are running
docker-compose ps
if %errorLevel% neq 0 (
    echo ❌ Services health check failed
    pause
    exit /b 1
)
echo ✅ Services are running

REM Display status
echo.
echo 📊 Deployment Status:
echo =====================
echo.
docker-compose ps
echo.
echo 🌐 Application URLs:
echo   Frontend: http://localhost:80
if exist nginx\ssl\cert.pem (
echo   Frontend (HTTPS): https://localhost:443
)
echo   Backend API: http://localhost:3001
if exist nginx\ssl\cert.pem (
echo   Backend API (HTTPS): https://localhost:443/api
)
echo   n8n: http://localhost:5678
if exist nginx\ssl\cert.pem (
echo   n8n (HTTPS): https://localhost:443/n8n
)
echo.
echo 📝 Next Steps:
echo   1. Check logs: docker-compose logs -f
echo   2. Health check: node monitoring/health-check.js
echo   3. Open browser: http://localhost
if exist nginx\ssl\cert.pem (
echo   4. SSL check: https://localhost
)
echo.
echo ✅ Deployment completed successfully!
echo [INFO] Deployment completed at %date% %time% >> %LOG_FILE%

pause