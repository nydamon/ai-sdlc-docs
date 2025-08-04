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

#### **Script Preview:**

```bash
#!/bin/bash
# Enhanced AI-Powered SDLC Setup Script
# Supports Laravel + TypeScript React projects

### INTELLIGENT PROJECT DETECTION
detect_and_setup_project() {
  # Laravel Backend Detection
  if [[ -f "artisan" ]] || [[ -d "backend" ]]; then
    echo_color $GREEN "📦 Laravel project detected"
    composer require --dev pestphp/pest laravel/pulse laravel/pennant
  fi

  # TypeScript Client Frontend Detection
  if [[ -f "client-frontend/package.json" ]]; then
    echo_color $GREEN "📦 TypeScript client detected"
    npm install --save-dev vitest @testing-library/react
  fi

  # JavaScript Admin Frontend Detection
  if [[ -f "admin-frontend/package.json" ]]; then
    echo_color $GREEN "📦 JavaScript admin detected"
    npm install --save-dev jest @testing-library/react
  fi
}
```

### [`ai-sdlc`](ai-sdlc) - CLI Interface

- **Size**: 229 lines of bash code
- **Function**: Professional CLI with 6 working commands
- **Features**:
  - setup, status, validate, test-init, test-gen, help
  - Comprehensive status checking
  - Built-in validation with detailed reporting
  - Professional colored output

**Download**: [ai-sdlc](ai-sdlc) | **Usage**: `./ai-sdlc help`

## ✅ **Installation Verification**

### **Quick Test (30 seconds)**

After running `./auto-setup.sh`, verify everything works:

```bash
# 1. Check system status
./ai-sdlc status

# Expected output:
# ✅ Git repository detected
# ✅ Node.js 18+ detected
# ✅ Husky hooks configured
# ✅ ESLint configuration found
# ✅ Prettier configuration found
# ✅ All systems operational

# 2. Test git hooks work
echo "console.log('test');" > test-verification.js
git add test-verification.js
git commit -m "test: verify ai-sdlc installation"

# Expected: Code gets formatted, commit succeeds
# Clean up: git reset --soft HEAD~1 && rm test-verification.js
```

### **Comprehensive Validation**

For full system validation:

```bash
./ai-sdlc validate

# Expected output:
# 🔍 Validating AI-SDLC Installation...
# ✅ Prerequisites: Node.js, Git, npm detected
# ✅ Git Hooks: Husky v8+ configured correctly
# ✅ Code Quality: ESLint + Prettier working
# ✅ Project Detection: [Your project type] detected
# ✅ Configuration: All files generated successfully
#
# 🎉 AI-SDLC installation is READY FOR USE
```

## 🤖 **AI Automation Scripts**

### [`scripts-complex/ai-test-generator.js`](scripts-complex/ai-test-generator.js)

- **Function**: AI-powered test generation with OpenAI GPT-4
- **Features**:
  - Multi-language support (JS, TS, React, PHP)
  - Credit repair domain patterns
  - Qase integration
  - Template fallback without API keys

**Usage**: `node scripts-complex/ai-test-generator.js`

#### **Script Preview:**

```javascript
// AI-Powered Test Generator with Credit Repair Domain Expertise
class AITestGenerator {
  generatePrompt(filePath, componentName) {
    return `Generate comprehensive Jest tests for ${componentName} with:

CREDIT REPAIR DOMAIN REQUIREMENTS:
- FCRA compliance validation (Fair Credit Reporting Act)
- PII data handling security tests
- Credit score range validation (300-850)
- Consumer dispute workflow testing
- Audit logging for regulatory compliance

TECHNICAL REQUIREMENTS:
- React Testing Library best practices
- Edge cases and error handling
- 90%+ code coverage
- TypeScript type safety validation
- Integration with existing test patterns`;
  }

  async generateAITest(prompt) {
    // OpenAI GPT-4 integration for intelligent test generation
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 2000,
      temperature: 0.1,
    });
    return response.choices[0].message.content;
  }
}
```

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
