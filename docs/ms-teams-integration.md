# MS Teams Integration Guide

Complete setup and management of MS Teams webhook notifications for AI-SDLC automation.

## 🔔 Overview

The AI-SDLC framework provides comprehensive MS Teams integration for:

- **CI/CD Pipeline Notifications** - Deployment status, test results, security scans
- **Validation Reports** - Automated validation results with detailed metrics
- **Performance Alerts** - Performance monitoring and optimization recommendations
- **Custom Notifications** - Flexible webhook management for team communication

## 🚀 Quick Setup

### Step 1: Create MS Teams Webhook

1. **Open MS Teams** and navigate to your development channel
2. **Click the three dots (...)** next to the channel name
3. **Select "Connectors"**
4. **Find "Incoming Webhook"** and click "Add"
5. **Configure the webhook**:
   - Name: `AI-SDLC Notifications`
   - Description: `Automated notifications from The Credit Pros AI-SDLC framework`
   - Upload logo (optional): Use The Credit Pros logo
6. **Copy the webhook URL** (keep this secure!)

### Step 2: Configure AI-SDLC

```bash
# Setup webhook with AI-SDLC
./ai-sdlc teams setup https://your-webhook-url-here

# Test the connection
./ai-sdlc teams test

# Send validation report
./ai-sdlc teams validate
```

### Step 3: Verify Integration

You should see a test message in your MS Teams channel confirming the webhook is working.

## ⚙️ Configuration Options

### Environment Variables

Set your webhook URL as an environment variable:

```bash
# Add to your .env file or environment
export MS_TEAMS_WEBHOOK_URI="https://outlook.office.com/webhook/..."

# Or add to your shell profile
echo 'export MS_TEAMS_WEBHOOK_URI="your-webhook-url"' >> ~/.bashrc
```

### GitHub Secrets (for CI/CD)

For automated CI/CD notifications:

1. **Go to Repository Settings** → Secrets and variables → Actions
2. **Add new secret**: `MS_TEAMS_WEBHOOK_URI`
3. **Value**: Your MS Teams webhook URL
4. **CI/CD pipeline will automatically use this** for deployment notifications

## 📊 Notification Types

### 1. Validation Reports

**Triggered by**: `./ai-sdlc validate` or automatic validation
**Contains**:

- Validation score percentage
- Number of passed/failed checks
- Overall health status
- Timestamp and branch information

**Example Message**:

```
✅ AI-SDLC Validation Report
Score: 92% (26/28)
Status: Excellent
Branch: main
```

### 2. CI/CD Pipeline Status

**Triggered by**: GitHub Actions workflow
**Contains**:

- Deployment environment (staging/production)
- Security scan results
- Test execution results
- Build and deployment status
- Performance test outcomes

**Example Message**:

```
🚀 AI-SDLC Staging Deployment
Status: SUCCESS
Security Scan: ✅ PASSED
Tests: ✅ 34/34 PASSED
Performance: ✅ Within thresholds
```

### 3. Performance Alerts

**Triggered by**: Performance monitoring or `./ai-sdlc perf monitor`
**Contains**:

- Performance metrics summary
- Optimization recommendations
- Threshold violations (if any)
- Resource usage statistics

**Example Message**:

```
📊 Daily Performance Report
Monitoring: Completed
Average Response Time: 245ms
Recommendations: 3 optimizations available
```

### 4. Security Notifications

**Triggered by**: Security scans or vulnerability detection
**Contains**:

- Vulnerability count by severity
- Security scan tool results
- Recommended actions
- Risk assessment

**Example Message**:

```
🛡️ Security Scan Results
Tool: npm audit
Total Vulnerabilities: 0
Status: Clean
```

### 5. Custom Notifications

**Triggered by**: Manual commands or custom integrations
**Fully customizable content**

## 🛠️ Management Commands

### Basic Operations

```bash
# Setup new webhook
./ai-sdlc teams setup <webhook-url>

# Test webhook connectivity
./ai-sdlc teams test

# Send validation report
./ai-sdlc teams validate

# Help and options
./ai-sdlc teams --help
```

### Advanced Operations

```bash
# Using the webhook manager directly
node scripts/webhook-manager.js test
node scripts/webhook-manager.js deploy staging success
node scripts/webhook-manager.js validation
node scripts/webhook-manager.js security '{"critical":0,"high":0,"medium":2,"low":5}'
node scripts/webhook-manager.js tests unit '{"total":34,"passed":34,"failed":0}'
```

### Custom Notifications

```bash
# Send custom notification
node scripts/webhook-manager.js custom "🎉 Deployment Complete" "success" '[
  {"name": "Environment", "value": "Production"},
  {"name": "Version", "value": "v2.1.0"},
  {"name": "Duration", "value": "3m 45s"}
]'
```

## 🔧 Integration with Workflows

### Git Hooks Integration

MS Teams notifications are automatically integrated with git hooks for major branch pushes:

**Triggered on**: Push to main/master/develop branches
**Message includes**:

- Branch name
- Commit author
- Commit hash (short)
- Commit message

### CI/CD Pipeline Integration

The GitHub Actions workflow automatically sends notifications at key stages:

1. **Security Scan Complete** - Results of vulnerability scanning
2. **Test Suite Complete** - Unit, integration, and E2E test results
3. **Build Complete** - Application build status
4. **Deployment Complete** - Staging/production deployment results
5. **Performance Tests Complete** - Performance benchmark results

### Validation Integration

Automatic notifications after validation runs:

```bash
# Manual validation with notification
./ai-sdlc validate  # Automatically sends MS Teams report if webhook configured

# Or explicit notification
./ai-sdlc validate && ./ai-sdlc teams validate
```

## 🎨 Message Customization

### Theme Colors

The integration uses The Credit Pros brand colors:

- **Success**: `#00ff00` (Green)
- **Warning**: `#ff902a` (TCP Orange)
- **Error**: `#ff0000` (Red)
- **Info**: `#0f314b` (TCP Navy)

### Message Templates

Messages follow a consistent format:

```json
{
  "@type": "MessageCard",
  "@context": "http://schema.org/extensions",
  "themeColor": "0f314b",
  "summary": "Brief summary for notifications",
  "sections": [
    {
      "activityTitle": "🚀 Main Title with Emoji",
      "activitySubtitle": "The Credit Pros - AI-SDLC",
      "facts": [{ "name": "Field Name", "value": "Field Value" }],
      "markdown": true
    }
  ]
}
```

## 🚨 Troubleshooting

### Common Issues

#### Webhook Not Receiving Messages

```bash
# Test webhook connectivity
./ai-sdlc teams test

# Check webhook URL format
echo $MS_TEAMS_WEBHOOK_URI

# Verify webhook is active in MS Teams
# Go to Teams → Channel → Connectors → Configured → Incoming Webhook
```

#### Messages Not Formatting Correctly

```bash
# Test with simple message first
node scripts/webhook-manager.js custom "Test Message" "info" '[]'

# Check JSON formatting
cat scripts/webhook-manager.js | grep -A 20 "payload ="
```

#### CI/CD Notifications Not Working

```bash
# Check GitHub secrets
# Repository Settings → Secrets → MS_TEAMS_WEBHOOK_URI should exist

# Test locally first
export MS_TEAMS_WEBHOOK_URI="your-webhook-url"
node scripts/webhook-manager.js deploy staging success
```

#### Rate Limiting Issues

MS Teams webhooks have rate limits:

- **4 requests per second per webhook**
- **12,000 requests per hour per webhook**

If you hit rate limits:

1. Reduce notification frequency
2. Batch notifications where possible
3. Use different webhooks for different notification types

### Debug Mode

Enable debug logging:

```bash
# Enable debug output
DEBUG=webhook node scripts/webhook-manager.js test

# Check webhook response
curl -X POST -H "Content-Type: application/json" \
  -d '{"text":"Test message"}' \
  "$MS_TEAMS_WEBHOOK_URI"
```

### Log Analysis

Check webhook delivery logs:

```bash
# Check AI-SDLC logs
./ai-sdlc docker logs | grep -i webhook

# Check validation logs
./ai-sdlc validate 2>&1 | grep -i teams

# Check performance monitoring logs
./ai-sdlc perf monitor 2>&1 | grep -i notification
```

## 🔒 Security Considerations

### Webhook URL Security

- **Never commit webhook URLs** to version control
- **Use environment variables** or secure secret management
- **Rotate webhook URLs** periodically
- **Limit webhook permissions** in MS Teams

### Message Content

- **Avoid sensitive data** in notifications (passwords, keys, personal data)
- **Use commit hashes** instead of full commit messages if they might contain sensitive info
- **Sanitize user input** in custom notifications

### Access Control

- **Limit who can configure webhooks** in MS Teams
- **Use separate webhooks** for different environments (dev/staging/prod)
- **Monitor webhook usage** for unusual activity

## 📈 Best Practices

### Notification Strategy

1. **Be Selective** - Only notify on important events
2. **Provide Context** - Include relevant details (branch, environment, etc.)
3. **Use Consistent Formatting** - Maintain message structure
4. **Include Actions** - Provide links to logs, dashboards, or fix instructions

### Team Coordination

1. **Create Dedicated Channels** - Separate development notifications from general chat
2. **Set Channel Notifications** - Configure Teams notifications appropriately
3. **Document Webhook Usage** - Team members should know what notifications to expect
4. **Regular Review** - Periodically review and optimize notification frequency

### Performance

1. **Batch Notifications** - Group related events when possible
2. **Async Processing** - Don't block main processes waiting for webhook delivery
3. **Retry Logic** - Handle webhook failures gracefully
4. **Monitor Usage** - Track webhook performance and delivery success

## 🔄 Advanced Configuration

### Multiple Webhooks

Configure different webhooks for different purposes:

```bash
# Setup separate webhooks
export MS_TEAMS_WEBHOOK_CI="webhook-url-for-ci-cd"
export MS_TEAMS_WEBHOOK_ALERTS="webhook-url-for-alerts"
export MS_TEAMS_WEBHOOK_REPORTS="webhook-url-for-reports"

# Use specific webhook
MS_TEAMS_WEBHOOK_URI=$MS_TEAMS_WEBHOOK_CI ./ai-sdlc teams test
```

### Custom Integration Scripts

Create custom scripts for specific notification needs:

```bash
# Create custom notification script
cat > notify-deployment.sh << 'EOF'
#!/bin/bash
ENVIRONMENT=$1
STATUS=$2
VERSION=$3

node scripts/webhook-manager.js custom \
  "🚀 Deployment to $ENVIRONMENT" \
  "$([[ $STATUS == "success" ]] && echo "success" || echo "error")" \
  "[{\"name\":\"Environment\",\"value\":\"$ENVIRONMENT\"},{\"name\":\"Status\",\"value\":\"$STATUS\"},{\"name\":\"Version\",\"value\":\"$VERSION\"}]"
EOF

chmod +x notify-deployment.sh

# Use custom script
./notify-deployment.sh production success v2.1.0
```

## 📋 Webhook URL Format Reference

Valid MS Teams webhook URLs follow this pattern:

```
https://outlook.office.com/webhook/XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX@XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX/IncomingWebhook/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
```

Or for newer webhooks:

```
https://TENANT.webhook.office.com/webhookb2/XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX@XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX/IncomingWebhook/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
```

---

For more integration examples and advanced configurations, see:

- [Docker Setup Guide](docker-setup.md)
- [Performance Monitoring](performance-monitoring.md)
- [Development Utilities](development-utilities.md)
