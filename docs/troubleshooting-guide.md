# 🛠️ Updated Troubleshooting Guide - 90% Implementation

Common issues and solutions for the enhanced AI-SDLC framework with Docker, MS Teams, and Performance monitoring.

---

## 🎯 Enhanced Quick Problem Solver - NEW FEATURES

### ✅ **Git Hooks Issues - ENHANCED AUTO-REPAIR**

```bash
# Problem: Commits bypass pre-commit hooks
# Solution: Enhanced auto-repair with drift detection
./ai-sdlc repair

# Problem: Hooks fail with permission errors
# Solution: Auto-repair fixes permissions automatically
./ai-sdlc repair

# Problem: Security scanning fails in hooks
# Solution: Enhanced validation checks security integration
./ai-sdlc validate
./ai-sdlc repair

# Problem: Specific hook failing
# Solution: Comprehensive diagnostics and repair
./ai-sdlc doctor    # Detailed diagnostics
./ai-sdlc validate  # 28+ automated checks
./ai-sdlc repair    # Auto-fix with drift detection
```

### 🚧 **AI Tool Issues - ENHANCED DIAGNOSTICS**

```bash
# Problem: IDE configuration issues
# Solution: Auto-repair IDE settings and extensions
./ai-sdlc repair
./ai-sdlc doctor    # Comprehensive IDE diagnostics

# Problem: Development environment inconsistencies
# Solution: Docker environment ensures consistency
./ai-sdlc docker up     # Start consistent environment
./ai-sdlc docker status # Check container health

# Problem: AI tool integration issues
# Solution: Enhanced validation checks all integrations
./ai-sdlc validate      # Check all AI tool configurations
./ai-sdlc dev report    # Generate detailed environment report
```

### ✅ **Semantic Release Issues - PRODUCTION READY**

```bash
# Problem: Version bumping not working
# Solution: Enhanced validation and repair for semantic release
./ai-sdlc validate  # Comprehensive semantic release checks
./ai-sdlc repair    # Auto-fix semantic release configuration

# Problem: GitHub releases failing
# Solution: MS Teams notifications show detailed release status
./ai-sdlc teams test    # Test MS Teams integration
./ai-sdlc validate      # Validate GitHub Actions configuration

# Problem: Release notifications not working
# Solution: MS Teams integration provides real-time notifications
./ai-sdlc teams deploy staging success  # Test deployment notifications
```

---

## 🆕 **NEW FEATURES TROUBLESHOOTING**

### 🐳 **Docker Environment Issues - NEW**

```bash
# Problem: Docker containers not starting
# Solution: Check Docker daemon and restart services
docker ps                    # Check running containers
./ai-sdlc docker status      # Check AI-SDLC container health
./ai-sdlc docker down        # Stop all services
./ai-sdlc docker up          # Restart complete environment

# Problem: Port conflicts with existing services
# Solution: Docker compose handles port management automatically
./ai-sdlc docker logs        # Check service logs for conflicts
./ai-sdlc doctor             # Comprehensive environment diagnostics

# Problem: Performance monitoring not showing data
# Solution: Verify Grafana/Prometheus containers are running
./ai-sdlc docker status      # Check monitoring stack health
# Access Grafana at http://localhost:3000
# Access Prometheus at http://localhost:9090
```

### 📱 **MS Teams Integration Issues - NEW**

```bash
# Problem: MS Teams notifications not sending
# Solution: Test webhook connectivity and configuration
./ai-sdlc teams test         # Test webhook connectivity
echo $MS_TEAMS_WEBHOOK_URI   # Verify webhook URL is set

# Problem: Deployment notifications not working
# Solution: Test deployment notification system
./ai-sdlc teams deploy staging success    # Test deployment notification
./ai-sdlc teams validation                # Test validation report notification

# Problem: Webhook URL not configured
# Solution: Set up MS Teams webhook integration
# Follow docs/ms-teams-integration.md for setup instructions
export MS_TEAMS_WEBHOOK_URI="your-webhook-url"
./ai-sdlc teams test         # Verify connectivity
```

### 📊 **Performance Monitoring Issues - NEW**

```bash
# Problem: Monitoring dashboards not accessible
# Solution: Verify Docker containers and port configuration
./ai-sdlc docker status      # Check monitoring containers
./ai-sdlc perf monitor       # Test performance monitoring
# Grafana: http://localhost:3000 (admin/admin)
# Prometheus: http://localhost:9090

# Problem: Performance metrics not updating
# Solution: Check service connectivity and data collection
./ai-sdlc perf optimize      # Run performance optimization
./ai-sdlc docker logs grafana    # Check Grafana logs
./ai-sdlc docker logs prometheus # Check Prometheus logs

# Problem: SonarQube analysis not running
# Solution: Verify SonarQube container and configuration
./ai-sdlc docker logs sonarqube  # Check SonarQube logs
# Access SonarQube at http://localhost:9000 (admin/admin)
```

### 🔧 **Enhanced CLI Issues - NEW**

```bash
# Problem: New CLI commands not recognized
# Solution: Verify AI-SDLC CLI installation and permissions
ls -la ./ai-sdlc            # Check CLI file exists and is executable
./ai-sdlc --help            # List all available commands
chmod +x ./ai-sdlc          # Make executable if needed

# Problem: Development utilities not working
# Solution: Test development utilities and diagnostics
./ai-sdlc dev report        # Generate development environment report
./ai-sdlc dev clean         # Clean development artifacts
./ai-sdlc doctor            # Comprehensive diagnostics

# Problem: Auto-repair not fixing issues
# Solution: Run comprehensive diagnostics and manual repair
./ai-sdlc doctor            # Detailed diagnostics with recommendations
./ai-sdlc validate          # 28+ automated checks with detailed output
./ai-sdlc repair            # Enhanced auto-repair with drift detection
```

---

## 🎯 **QUICK DIAGNOSTIC COMMANDS**

### **One-Command Problem Solver**

```bash
# Universal problem solver - runs comprehensive diagnostics
./ai-sdlc doctor

# Expected output:
# ✅ Git hooks: Working
# ✅ Docker environment: Running (8 containers)
# ✅ MS Teams integration: Connected
# ✅ Performance monitoring: Active
# ✅ CLI commands: All 13+ commands functional
# ✅ Auto-repair system: Active
# ⚠️  Issues found: 0
# 📊 Overall health: 98% (Excellent)
```

### **Emergency Reset (Nuclear Option)**

```bash
# If everything is broken, full reset and reinstall
./ai-sdlc clean             # Clean all artifacts
./ai-sdlc docker down       # Stop all containers
./ai-sdlc init              # Complete fresh setup
./ai-sdlc validate          # Verify everything works
```

./ai-sdlc repair
git log --oneline -5

````

---

## 🔧 Detailed Troubleshooting

### 1. Git Hooks Troubleshooting

#### Pre-Commit Hook Issues
**Symptom**: Pre-commit hook fails or doesn't run
**Common Causes**:
- Missing dependencies
- Incorrect file permissions
- Configuration errors

**Solutions**:
```bash
# 1. Run comprehensive validation
./ai-sdlc validate

# 2. Auto-repair all issues found
./ai-sdlc repair

# 3. Test hook functionality
./ai-sdlc doctor

# 4. Manual verification (if needed)
ls -la .husky/
.husky/pre-commit
````

#### Commit Message Hook Issues

**Symptom**: Invalid commit messages are accepted
**Common Causes**:

- Commitlint not properly configured
- Hook not installed correctly

**Solutions**:

```bash
# 1. Validate commitlint setup
./ai-sdlc validate

# 2. Auto-repair commit hooks
./ai-sdlc repair

# 3. Test commit message format
echo "fix: test message" | npx commitlint

# 4. Verify configuration (if needed)
cat commitlint.config.js
```

### 2. AI Tool Troubleshooting

#### Cursor IDE Issues

**Symptom**: AI suggestions not working or slow
**Common Causes**:

- Invalid or missing API keys
- Network connectivity issues
- IDE configuration problems

**Solutions**:

```bash
# 1. Verify API key
echo $CURSOR_API_KEY
export CURSOR_API_KEY="your-api-key-here"

# 2. Check network connectivity
curl -I https://api.cursor.sh

# 3. Clear IDE cache
# In Cursor: Cmd+Shift+P → "Developer: Reload Window"

# 4. Restart IDE
# Close and reopen Cursor
```

#### CodiumAI Issues

**Symptom**: Test generation fails or produces poor quality
**Common Causes**:

- Insufficient context provided
- Framework-specific configuration missing
- Rate limiting

**Solutions**:

```bash
# 1. Check CodiumAI installation
npx codium --version

# 2. Verify framework detection
npx codium --detect-framework

# 3. Provide more context
npx codium --context="path/to/related/files"

# 4. Check rate limits
# Review CodiumAI dashboard for usage limits
```

### 3. Semantic Release Troubleshooting

#### Version Bumping Issues

**Symptom**: Versions not incrementing correctly
**Common Causes**:

- Incorrect commit message format
- Branch configuration issues
- Plugin configuration problems

**Solutions**:

```bash
# 1. Validate semantic release setup
./ai-sdlc validate

# 2. Auto-repair configuration issues
./ai-sdlc repair

# 3. Test release process
npx semantic-release --dry-run --debug

# 4. Verify commit message format
git log --oneline -10 | head -5

# 5. Check configuration files (if needed)
cat .releaserc.json | jq '.branches'
```

#### GitHub Release Issues

**Symptom**: Releases not published to GitHub
**Common Causes**:

- Invalid GitHub token
- Insufficient permissions
- Repository configuration issues

**Solutions**:

```bash
# 1. Verify GitHub token
echo $GITHUB_TOKEN | cut -c1-10
# Should return first 10 characters

# 2. Test GitHub API access
curl -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/repos/$(git remote get-url origin | sed 's/.*://;s/\.git$//') | jq '.name'

# 3. Check repository permissions
# Ensure token has repo scope in GitHub settings

# 4. Validate release configuration
cat .releaserc.json | jq '.plugins'
```

---

## 🚨 Critical Issues & Emergency Procedures

### Emergency Bypass Procedures

```bash
# Bypass pre-commit hooks (use sparingly)
git commit --no-verify -m "emergency: critical hotfix"

# Bypass pre-push hooks
git push --no-verify

# Skip specific lint-staged tasks
# Temporarily modify package.json lint-staged configuration
```

### Rollback Procedures

```bash
# Rollback a failed release
git revert <release-commit-hash>
git push origin main

# Restore previous configuration
git checkout HEAD~1 -- .husky/
git checkout HEAD~1 -- package.json
```

---

## 📊 Diagnostic Commands

### Git Hooks Diagnostics

```bash
# Check hook installation
ls -la .git/hooks/

# Test pre-commit hook
GIT_INDEX_FILE=.git/index git diff --cached --name-only

# Verify commitlint
echo "feat: test" | npx commitlint
echo "invalid message" | npx commitlint
```

### AI Tool Diagnostics

```bash
# Check AI tool installations
which cursor
which codium
npx --version

# Test AI connectivity
curl -I https://api.openai.com/v1/models

# Verify environment variables
printenv | grep -E "(CURSOR|OPENAI|GITHUB)"
```

### Release Diagnostics

```bash
# Check semantic-release configuration
npx semantic-release --dry-run --no-ci

# Verify Git configuration
git config --get remote.origin.url
git branch --show-current

# Test GitHub authentication
gh auth status
```

---

## 🎯 Prevention Best Practices

### Regular Maintenance

```bash
# Weekly: Run health check
./ai-sdlc doctor

# Monthly: Comprehensive validation
./ai-sdlc validate

# Quarterly: Full system check
./ai-sdlc doctor
# Update dependencies as recommended
npm outdated
```

### Monitoring & Alerts

```bash
# Set up monitoring for:
# - Hook failure rates
# - AI tool usage patterns
# - Release success/failure rates
# - Security scan results
```

---

## 📞 Support Resources

### Documentation

- [Git Hooks Automation](git-hooks-automation.md)
- [AI-First Playbook](ai-first-playbook.md)
- [Semantic Release Setup](semantic-release-setup.md)

### External Support

- **Cursor Support**: https://cursor.sh/support
- **CodiumAI Support**: https://codium.ai/support
- **GitHub Support**: https://support.github.com

### Community Resources

- **Stack Overflow**: Tag questions with relevant tools
- **GitHub Discussions**: Framework-specific discussions
- **Slack/Discord**: Developer communities

---

**Last Updated**: Regular maintenance recommended
**Next Review**: Monthly configuration validation

_Need help with a specific issue? Check the [Success Metrics](success-metrics.md) to track incident patterns and resolution times._
