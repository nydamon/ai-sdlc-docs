# AI-SDLC CLI Reference

Complete command reference for the AI-SDLC framework CLI utility.

## 🚀 Overview

The AI-SDLC CLI provides a unified interface for all development automation tasks:

```bash
./ai-sdlc <command> [options]
```

## 📋 Command Categories

### Core Commands

- [`init`](#init) - Initialize AI-SDLC framework in project
- [`validate`](#validate) - Run comprehensive validation checks
- [`repair`](#repair) - Auto-repair configuration drift and issues
- [`status`](#status) - Show current setup status
- [`clean`](#clean) - Clean up temporary files and caches
- [`doctor`](#doctor) - Run full health check and diagnostics

### Environment Commands

- [`docker`](#docker) - Manage Docker development environment
- [`serve`](#serve) - Start AI-SDLC development dashboard

### Communication Commands

- [`teams`](#teams) - Manage MS Teams webhook notifications

### Performance Commands

- [`performance`](#performance) - Monitor and optimize performance

### Development Commands

- [`dev`](#dev) - Development utilities and tools

### Utility Commands

- [`--help`](#help) - Show help information
- [`--version`](#version) - Show version information

---

## 📖 Command Details

### `init`

Initialize AI-SDLC framework in the current project with intelligent project detection.

```bash
./ai-sdlc init
```

**What it does:**

- Automatically detects project type (Laravel, React, TypeScript)
- Installs and configures all necessary development tools
- Sets up Git hooks for automated quality checks
- Configures CI/CD workflows
- Creates VS Code workspace settings
- Sets up semantic release automation

**Options:** None

**Example output:**

```
╔════════════════════════════════════════════════════════════════╗
║                  AI-SDLC Framework Setup                      ║
║                     Version 1.0.0                            ║
╚════════════════════════════════════════════════════════════════╝

✅ Laravel backend detected
✅ TypeScript client frontend detected
✅ Git hooks configured
✅ CI/CD workflows configured
✅ 🎉 AI-SDLC Framework setup complete!
```

### `validate`

Run comprehensive validation checks on the current project setup.

```bash
./ai-sdlc validate
```

**What it does:**

- Runs 28+ automated validation checks
- Generates detailed validation report
- Checks configuration integrity
- Validates tool installations
- Sends MS Teams notification (if configured)

**Options:** None

**Example output:**

```
╔════════════════════════════════════════════════════════════════╗
║                AI-SDLC Framework Validation                    ║
╚════════════════════════════════════════════════════════════════╝

✅ Git repository initialized
✅ Package.json configured
✅ Laravel project structure valid
...
📊 Success rate: 92% (26/28 checks passed)
🟢 EXCELLENT - Your AI-SDLC setup is production-ready!
```

### `repair`

Automatically repair configuration drift and common issues.

```bash
./ai-sdlc repair
```

**What it does:**

- Fixes 19+ common configuration issues
- Repairs Git hooks if broken
- Updates outdated configurations
- Migrates legacy settings (e.g., ESLint v9)
- Restores missing files

**Options:** None

**Example output:**

```
🔧 Auto-repair system activated...
✅ Fixed ESLint configuration
✅ Updated Git hooks
✅ Repaired package.json scripts
🎉 Auto-repair complete! 3 issues fixed.
```

### `status`

Show current AI-SDLC setup status and health.

```bash
./ai-sdlc status
```

**What it does:**

- Displays setup status overview
- Shows configured tools and their status
- Checks Git hooks integrity
- Validates tool configurations

**Options:** None

**Example output:**

```
📊 AI-SDLC Framework Status
✅ Git repository initialized
✅ Git hooks configured
✅ ESLint configured
✅ Prettier configured
⚠️  VS Code not configured
Status: 80% (4/5 checks passed)
```

### `clean`

Clean up temporary files and caches.

```bash
./ai-sdlc clean
```

**What it does:**

- Removes temporary AI-SDLC files
- Clears validation reports
- Removes performance metrics files
- Cleans up log files

**Options:** None

### `doctor`

Run comprehensive health check and diagnostics.

```bash
./ai-sdlc doctor
```

**What it does:**

- Checks system prerequisites
- Validates project structure
- Tests tool installations
- Checks configuration integrity
- Provides detailed diagnostic report

**Options:** None

### `docker`

Manage Docker development environment.

```bash
./ai-sdlc docker <subcommand>
```

**Subcommands:**

- `up` - Start Docker development environment
- `down` - Stop Docker development environment
- `logs [service]` - Show logs for services
- `status` - Show container status

**Examples:**

```bash
# Start complete development environment
./ai-sdlc docker up

# Stop all containers
./ai-sdlc docker down

# View logs for all services
./ai-sdlc docker logs

# View logs for specific service
./ai-sdlc docker logs sonarqube

# Check container status
./ai-sdlc docker status
```

**Docker Environment Includes:**

- AI-SDLC Tools Container (port 3001)
- Grafana Monitoring (port 3000)
- SonarQube Analysis (port 9000)
- Prometheus Metrics (port 9090)
- PostgreSQL Database (port 5432)
- Redis Cache (port 6379)

### `serve`

Start AI-SDLC development dashboard server.

```bash
./ai-sdlc serve
```

**What it does:**

- Starts web-based AI-SDLC control panel
- Provides API endpoints for validation, repair, status
- Enables remote management of AI-SDLC operations

**Access:** http://localhost:3001

**API Endpoints:**

- `GET /health` - Health check
- `GET /api/validate` - Run validation
- `POST /api/repair` - Run auto-repair
- `GET /api/status` - Get project status
- `POST /api/test` - Run tests
- `GET /api/metrics` - Get project metrics

### `teams`

Manage MS Teams webhook notifications.

```bash
./ai-sdlc teams <subcommand>
```

**Subcommands:**

- `setup <webhook-url>` - Setup MS Teams webhook
- `test` - Test webhook connectivity
- `validate` - Send validation report to Teams

**Examples:**

```bash
# Setup webhook
./ai-sdlc teams setup https://outlook.office.com/webhook/...

# Test webhook
./ai-sdlc teams test

# Send validation report
./ai-sdlc teams validate
```

**Prerequisites:**

- MS Teams webhook URL configured
- `MS_TEAMS_WEBHOOK_URI` environment variable set

### `performance`

Monitor and optimize performance.

```bash
./ai-sdlc performance <subcommand>
# or
./ai-sdlc perf <subcommand>
```

**Subcommands:**

- `monitor` - Run comprehensive performance monitoring
- `optimize` - Optimize workspace for better performance
- `report` - Show latest performance metrics

**Examples:**

```bash
# Run full performance analysis
./ai-sdlc perf monitor

# Optimize workspace configuration
./ai-sdlc perf optimize

# Show performance report
./ai-sdlc perf report
```

**What it monitors:**

- npm/yarn operations
- Git operations
- Laravel operations (if applicable)
- AI-SDLC operations
- Build and test performance

### `dev`

Development utilities and tools.

```bash
./ai-sdlc dev <subcommand>
```

**Subcommands:**

- `report` - Generate development environment report
- `clean` - Clean development artifacts
- `updates` - Check for package updates

**Examples:**

```bash
# Generate environment report
./ai-sdlc dev report

# Clean development artifacts
./ai-sdlc dev clean

# Check for package updates
./ai-sdlc dev updates
```

### `--help`

Show help information and command usage.

```bash
./ai-sdlc --help
# or
./ai-sdlc -h
# or
./ai-sdlc help
```

### `--version`

Show version information.

```bash
./ai-sdlc --version
# or
./ai-sdlc -v
# or
./ai-sdlc version
```

---

## 🔗 Command Chaining

You can chain commands for complex workflows:

```bash
# Initialize, validate, and start Docker environment
./ai-sdlc init && ./ai-sdlc validate && ./ai-sdlc docker up

# Run performance monitoring and optimization
./ai-sdlc perf monitor && ./ai-sdlc perf optimize

# Validate and send results to MS Teams
./ai-sdlc validate && ./ai-sdlc teams validate
```

## 🚨 Error Handling

All commands include comprehensive error handling:

- **Exit Code 0**: Success
- **Exit Code 1**: General error
- **Exit Code 2**: Invalid command or usage

Error messages are descriptive and include suggestions for resolution.

## 📊 Output Formats

Commands provide structured output:

- **Success messages**: Green checkmarks (✅)
- **Warning messages**: Yellow warning symbols (⚠️)
- **Error messages**: Red X symbols (❌)
- **Info messages**: Blue info symbols (ℹ️)

## 🔧 Environment Variables

Commands respect these environment variables:

- `MS_TEAMS_WEBHOOK_URI` - MS Teams webhook URL
- `NODE_ENV` - Node.js environment (development/production)
- `DEBUG` - Enable debug logging

## 📝 Logging

All commands generate logs for troubleshooting:

- Validation reports: `AI_SDLC_VALIDATION_REPORT.md`
- Performance reports: `PERFORMANCE_REPORT.md`
- Development reports: `DEVELOPMENT_REPORT.md`
- Performance metrics: `performance-metrics.json`

## 🔄 Automation Integration

Commands integrate with:

- **Git Hooks**: Automatic validation on commits
- **CI/CD Pipelines**: GitHub Actions integration
- **MS Teams**: Automated notifications
- **Performance Monitoring**: Grafana dashboards
- **Code Quality**: SonarQube analysis

---

For more detailed information on specific features, see:

- [Docker Setup Guide](docker-setup.md)
- [MS Teams Integration](ms-teams-integration.md)
- [Performance Monitoring](performance-monitoring.md)
- [Development Utilities](development-utilities.md)
