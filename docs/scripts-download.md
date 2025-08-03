# Scripts Download & Implementation

## 📦 **Complete Script Library for Implementation Managers**

This page provides direct access to all working scripts for review and implementation.

## 🚀 **Core Setup Scripts**

### [`auto-setup.sh`](auto-setup.sh) - Main Setup Script

- **Size**: 255 lines of bash code
- **Function**: Complete automated setup for Laravel + React + TypeScript projects
- **Features**:
  - Prerequisites validation
  - Multi-project detection
  - Modern Husky v8+ integration
  - Automatic configuration generation
  - Built-in validation

**Download**: [auto-setup.sh](auto-setup.sh) | **Usage**: `./auto-setup.sh`

### [`ai-sdlc`](ai-sdlc) - CLI Interface

- **Size**: 229 lines of bash code
- **Function**: Professional CLI with 6 working commands
- **Features**:
  - setup, status, validate, test-init, test-gen, help
  - Comprehensive status checking
  - Built-in validation with detailed reporting
  - Professional colored output

**Download**: [ai-sdlc](ai-sdlc) | **Usage**: `./ai-sdlc help`

## 🤖 **AI Automation Scripts**

### [`scripts-complex/ai-test-generator.js`](scripts-complex/ai-test-generator.js)

- **Function**: AI-powered test generation with OpenAI GPT-4
- **Features**:
  - Multi-language support (JS, TS, React, PHP)
  - Credit repair domain patterns
  - Qase integration
  - Template fallback without API keys

**Usage**: `node scripts-complex/ai-test-generator.js`

### [`scripts-complex/ai-e2e-generator.js`](scripts-complex/ai-e2e-generator.js)

- **Function**: Automated Playwright E2E test generation
- **Features**:
  - Credit repair compliance patterns
  - FCRA/FACTA validation
  - Consumer-friendly error handling

**Usage**: `node scripts-complex/ai-e2e-generator.js`

### [`scripts-complex/qodo-pr-agent.js`](scripts-complex/qodo-pr-agent.js)

- **Function**: GitHub PR automation and AI code review
- **Features**:
  - Automated PR analysis
  - Quality metrics reporting
  - Integration with GitHub API

**Usage**: `node scripts-complex/qodo-pr-agent.js`

## 🔧 **Additional Automation Scripts**

| Script                                                                 | Function                        | Status     |
| ---------------------------------------------------------------------- | ------------------------------- | ---------- |
| [`security-scanner.js`](scripts-complex/security-scanner.js)           | Security vulnerability scanning | ✅ Working |
| [`performance-monitor.js`](scripts-complex/performance-monitor.js)     | Performance metrics tracking    | ✅ Working |
| [`dev-utils.js`](scripts-complex/dev-utils.js)                         | Development utilities           | ✅ Working |
| [`webhook-manager.js`](scripts-complex/webhook-manager.js)             | Webhook automation              | ✅ Working |
| [`sonarqube-integration.js`](scripts-complex/sonarqube-integration.js) | SonarQube integration           | ✅ Working |

## 📋 **Quick Implementation Guide**

### **For Implementation Managers:**

1. **Review Scripts**: Click any script link above to view complete source code
2. **Download Framework**: `git clone https://github.com/nydamon/ai-sdlc.git`
3. **Test Setup**: Run `./auto-setup.sh` in test project
4. **Validate**: Run `./ai-sdlc status` to verify installation

### **For Development Teams:**

1. **Basic Setup** (5 minutes):

   ```bash
   ./auto-setup.sh
   ./ai-sdlc status
   ```

2. **AI Features** (with API keys):

   ```bash
   # Configure .env file
   cp .env.example .env

   # Generate tests
   npm run ai:generate-tests your-file.js
   npm run ai:generate-e2e your-component.jsx
   ```

## 🔐 **Security & Validation**

- ✅ All scripts include comprehensive error handling
- ✅ No hardcoded credentials (uses .env files)
- ✅ Git hooks prevent committing sensitive data
- ✅ Security auditing built into pre-commit hooks

## 📞 **Support**

- **Documentation**: Complete guides available in [Technical Guides](../git-hooks-automation/) section
- **Troubleshooting**: See [Troubleshooting Guide](../troubleshooting-simple/) for common issues
- **Validation**: Use `./ai-sdlc validate` for health checks

---

**All scripts are production-ready and extensively tested with real API integrations.**
