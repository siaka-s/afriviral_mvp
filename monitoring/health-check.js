#!/usr/bin/env node

// Health Check Script for AfriViral Production
// Usage: node health-check.js

const https = require('https');
const http = require('https');
const fs = require('fs');

class HealthChecker {
    constructor() {
        this.endpoints = {
            frontend: process.env.FRONTEND_URL || 'http://localhost:3000',
            backend: process.env.BACKEND_URL || 'http://localhost:3001',
            database: process.env.DATABASE_URL || 'postgresql://localhost:5432/afriviral',
            redis: process.env.REDIS_URL || 'redis://localhost:6379',
            n8n: process.env.N8N_URL || 'http://localhost:5678'
        };
        
        this.results = {
            timestamp: new Date().toISOString(),
            overall: 'unknown',
            checks: {}
        };
    }

    async checkEndpoint(name, url, options = {}) {
        const startTime = Date.now();
        
        try {
            const response = await this.makeRequest(url, options);
            const duration = Date.now() - startTime;
            
            this.results.checks[name] = {
                status: 'healthy',
                responseTime: duration,
                statusCode: response.statusCode,
                message: 'OK'
            };
            
            return true;
        } catch (error) {
            this.results.checks[name] = {
                status: 'unhealthy',
                responseTime: null,
                statusCode: null,
                message: error.message
            };
            
            return false;
        }
    }

    makeRequest(url, options = {}) {
        return new Promise((resolve, reject) => {
            const client = url.startsWith('https') ? https : http;
            const requestOptions = {
                method: 'GET',
                timeout: options.timeout || 5000,
                ...options
            };

            const req = client.request(url, requestOptions, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    if (res.statusCode >= 200 && res.statusCode < 300) {
                        resolve(res);
                    } else {
                        reject(new Error(`HTTP ${res.statusCode}`));
                    }
                });
            });

            req.on('error', reject);
            req.on('timeout', () => {
                req.destroy();
                reject(new Error('Request timeout'));
            });
            
            req.end();
        });
    }

    async checkDatabase() {
        try {
            const { Client } = require('pg');
            const client = new Client({
                connectionString: this.endpoints.database,
                connectionTimeoutMillis: 5000
            });
            
            await client.connect();
            const result = await client.query('SELECT NOW() as current_time');
            await client.end();
            
            this.results.checks.database = {
                status: 'healthy',
                responseTime: null,
                statusCode: 200,
                message: `Connected at ${result.rows[0].current_time}`
            };
            
            return true;
        } catch (error) {
            this.results.checks.database = {
                status: 'unhealthy',
                responseTime: null,
                statusCode: null,
                message: error.message
            };
            
            return false;
        }
    }

    async checkRedis() {
        try {
            const redis = require('redis');
            const client = redis.createClient({
                url: this.endpoints.redis
            });
            
            await client.connect();
            const result = await client.ping();
            await client.quit();
            
            this.results.checks.redis = {
                status: 'healthy',
                responseTime: null,
                statusCode: 200,
                message: `Redis PING: ${result}`
            };
            
            return true;
        } catch (error) {
            this.results.checks.redis = {
                status: 'unhealthy',
                responseTime: null,
                statusCode: null,
                message: error.message
            };
            
            return false;
        }
    }

    async runAllChecks() {
        log('Starting health checks...');
        
        const checks = [
            this.checkEndpoint('frontend', `${this.endpoints.frontend}/health`),
            this.checkEndpoint('backend', `${this.endpoints.backend}/health`),
            this.checkEndpoint('n8n', `${this.endpoints.n8n}/healthz`),
            this.checkDatabase(),
            this.checkRedis()
        ];
        
        await Promise.allSettled(checks);
        
        // Determine overall status
        const allHealthy = Object.values(this.results.checks)
            .every(check => check.status === 'healthy');
        
        this.results.overall = allHealthy ? 'healthy' : 'unhealthy';
        
        return this.results;
    }

    generateReport() {
        const report = {
            ...this.results,
            summary: {
                total: Object.keys(this.results.checks).length,
                healthy: Object.values(this.results.checks).filter(c => c.status === 'healthy').length,
                unhealthy: Object.values(this.results.checks).filter(c => c.status === 'unhealthy').length
            }
        };
        
        return report;
    }

    async saveReport() {
        const report = this.generateReport();
        const filename = `health_report_${new Date().toISOString().split('T')[0]}.json`;
        
        fs.writeFileSync(`monitoring/${filename}`, JSON.stringify(report, null, 2));
        log(`Health report saved: ${filename}`);
    }

    log(message) {
        console.log(`[${new Date().toISOString()}] ${message}`);
    }
}

// CLI interface
async function main() {
    const checker = new HealthChecker();
    
    try {
        await checker.runAllChecks();
        const report = checker.generateReport();
        
        console.log('\n📊 Health Check Results:');
        console.log('========================');
        console.log(`Overall Status: ${report.overall.toUpperCase()}`);
        console.log(`Checked at: ${report.timestamp}`);
        console.log(`\nSummary: ${report.summary.healthy}/${report.summary.total} services healthy`);
        
        console.log('\n📋 Detailed Results:');
        Object.entries(report.checks).forEach(([service, check]) => {
            const status = check.status === 'healthy' ? '✅' : '❌';
            console.log(`${status} ${service}: ${check.message}`);
        });
        
        await checker.saveReport();
        
        // Exit with appropriate code
        process.exit(report.overall === 'healthy' ? 0 : 1);
        
    } catch (error) {
        console.error('Health check failed:', error.message);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = HealthChecker;