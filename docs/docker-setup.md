# Docker Development Environment Setup

Complete containerized development environment for The Credit Pros AI-SDLC framework.

## 🐳 Overview

The AI-SDLC Docker environment provides a complete, isolated development stack including:

- **AI-SDLC Tools Container** - All development utilities and monitoring tools
- **SonarQube** - Advanced code quality analysis
- **Grafana + Prometheus** - Performance monitoring and metrics
- **PostgreSQL** - Metrics storage and analysis
- **Redis** - Caching and session storage

## 🚀 Quick Start

### Prerequisites

- Docker Desktop installed and running
- AI-SDLC framework cloned/downloaded

### One-Command Setup

```bash
# Start complete development environment
./ai-sdlc docker up

# Verify environment is running
./ai-sdlc docker status
```

### Access Points

After running `./ai-sdlc docker up`:

- **AI-SDLC Dashboard**: http://localhost:3001
- **Grafana Monitoring**: http://localhost:3000 (admin/admin123)
- **SonarQube Analysis**: http://localhost:9000
- **Prometheus Metrics**: http://localhost:9090

## 📊 Available Services

### AI-SDLC Tools Container

**Port**: 3001  
**Purpose**: Main development utilities and web dashboard

**Features**:

- Web-based AI-SDLC control panel
- Performance monitoring APIs
- Validation and repair utilities
- Development environment reporting

**API Endpoints**:

- `GET /health` - Health check
- `GET /api/validate` - Run AI-SDLC validation
- `POST /api/repair` - Run auto-repair
- `GET /api/status` - Get project status
- `POST /api/test` - Run tests
- `GET /api/metrics` - Get project metrics

### SonarQube Code Analysis

**Port**: 9000  
**Purpose**: Advanced code quality analysis

**Features**:

- Code smell detection
- Security vulnerability scanning
- Technical debt analysis
- Code coverage tracking

**Setup**:

1. Access http://localhost:9000
2. Login with admin/admin (change password on first login)
3. Create new project for your Laravel/React application
4. Follow SonarQube setup instructions for your project

### Grafana Monitoring

**Port**: 3000  
**Purpose**: Performance monitoring dashboards

**Login**: admin/admin123

**Pre-configured Dashboards**:

- AI-SDLC Framework Overview
- Performance Metrics Tracking
- Project Health Monitoring
- CI/CD Pipeline Metrics

### Prometheus Metrics

**Port**: 9090  
**Purpose**: Metrics collection and storage

**Monitored Endpoints**:

- AI-SDLC dashboard metrics
- PostgreSQL performance
- Redis performance
- Application metrics (if configured)

### PostgreSQL Database

**Port**: 5432  
**Purpose**: Metrics and analytics storage

**Connection Details**:

- Database: ai_sdlc_metrics
- Username: ai_sdlc
- Password: secure_password_here

**Tables**:

- `validation_results` - AI-SDLC validation history
- `project_metrics` - Performance and project metrics
- `test_results` - Test execution results
- `automation_events` - CI/CD and automation events
- `performance_metrics` - Performance test results

### Redis Cache

**Port**: 6379  
**Purpose**: Caching validation results and session storage

## 🛠️ Management Commands

### Basic Operations

```bash
# Start environment
./ai-sdlc docker up

# Stop environment
./ai-sdlc docker down

# View logs
./ai-sdlc docker logs

# View logs for specific service
./ai-sdlc docker logs sonarqube

# Check status
./ai-sdlc docker status
```

### Development Workflow

```bash
# Start environment and run validation
./ai-sdlc docker up && ./ai-sdlc validate

# Monitor performance while developing
./ai-sdlc perf monitor

# Send results to MS Teams (if configured)
./ai-sdlc teams validate
```

## 🔧 Configuration

### Environment Variables

Set these in your `.env` file or environment:

```bash
# MS Teams Integration (optional)
MS_TEAMS_WEBHOOK_URI=your_webhook_url_here

# Custom Database Password (optional)
POSTGRES_PASSWORD=your_secure_password

# SonarQube Configuration (optional)
SONAR_JDBC_PASSWORD=your_sonar_password
```

### Volume Mounts

The Docker environment automatically mounts:

- `.:/workspace` - Your project files
- `/var/run/docker.sock` - Docker socket for container management
- Persistent volumes for databases and caches

### Network Configuration

All services run on the `ai-sdlc-network` Docker network, enabling:

- Service discovery by container name
- Isolated networking
- Secure inter-service communication

## 🚨 Troubleshooting

### Common Issues

#### Docker not starting

```bash
# Check if Docker is running
docker version

# Check for port conflicts
lsof -i :3000 -i :3001 -i :5432 -i :6379 -i :9000 -i :9090

# Stop conflicting services and retry
./ai-sdlc docker down
./ai-sdlc docker up
```

#### Services not accessible

```bash
# Check container status
./ai-sdlc docker status

# View container logs
./ai-sdlc docker logs

# Restart specific service
docker-compose -f docker-compose.dev.yml restart grafana
```

#### Database connection issues

```bash
# Check PostgreSQL logs
./ai-sdlc docker logs postgres

# Test database connection
docker exec -it ai-sdlc-postgres psql -U ai_sdlc -d ai_sdlc_metrics -c "SELECT version();"
```

#### Performance issues

```bash
# Check resource usage
docker stats

# Free up resources
./ai-sdlc docker down
docker system prune

# Restart with more resources allocated to Docker Desktop
```

### Log Locations

Container logs are available through:

```bash
# All services
./ai-sdlc docker logs

# Specific service
docker logs ai-sdlc-tools
docker logs ai-sdlc-grafana
docker logs ai-sdlc-sonarqube
docker logs ai-sdlc-postgres
docker logs ai-sdlc-redis
```

## 🔄 Updates and Maintenance

### Updating Containers

```bash
# Pull latest images
docker-compose -f docker-compose.dev.yml pull

# Restart with new images
./ai-sdlc docker down
./ai-sdlc docker up
```

### Backup Data

```bash
# Backup PostgreSQL data
docker exec ai-sdlc-postgres pg_dump -U ai_sdlc ai_sdlc_metrics > backup.sql

# Backup Grafana dashboards
docker cp ai-sdlc-grafana:/var/lib/grafana ./grafana-backup
```

### Clean Up

```bash
# Stop and remove containers
./ai-sdlc docker down

# Remove volumes (WARNING: This deletes all data)
docker-compose -f docker-compose.dev.yml down -v

# Clean up unused Docker resources
docker system prune -a
```

## 🎯 Integration with Existing Workflow

### Laravel Integration

The Docker environment automatically detects and supports Laravel projects:

- Artisan commands available in ai-sdlc container
- Database connections configured
- Laravel Pulse integration ready

### React Integration

Full React development support:

- Hot reload support (configure your React dev server)
- Build optimization recommendations
- Performance monitoring for React apps

### CI/CD Integration

The Docker environment integrates with your CI/CD pipeline:

- Same container images for consistent environments
- Performance metrics feed into CI/CD decisions
- Automated quality gates with SonarQube

## 📈 Next Steps

1. **Configure MS Teams**: Set up webhook notifications for team updates
2. **Customize Grafana**: Create project-specific monitoring dashboards
3. **Set up SonarQube**: Configure quality gates for your projects
4. **Performance Baselines**: Establish performance benchmarks
5. **Automated Reporting**: Schedule regular performance and quality reports

---

For more advanced configuration and troubleshooting, see:

- [Performance Monitoring Setup](performance-monitoring.md)
- [MS Teams Integration](ms-teams-integration.md)
- [Development Utilities](development-utilities.md)
