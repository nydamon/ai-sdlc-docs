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
  - **NEW: Qase AIDEN integration** with @playwright/test and @qase/playwright dependencies
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
    npm install --save-dev vitest @testing-library/react jsdom
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

## 🐘 **PostgreSQL Database Automation Scripts**

### [`scripts-complex/postgres-automation.sh`](scripts-complex/postgres-automation.sh) - **Works with YOUR Existing Database**

- **Function**: FCRA-compliant database automation that maps to your existing PostgreSQL tables
- **⚠️ Important**: Does NOT create new tables - integrates with your current Credit Pros database
- **Features**:
  - Maps to your existing audit, dispute, and client tables
  - FCRA Section 604 & 611 compliance testing on your data
  - Performance analysis of your existing queries
  - Automated compliance reporting from your current database

**Download**: [postgres-automation.sh](scripts-complex/postgres-automation.sh) | **Setup Guide**: [Existing Database Setup](existing-database-setup.md)

#### **Quick Start with Your Database:**

```bash
# Map to your existing tables
export EXISTING_AUDIT_TABLE=your_audit_table_name
export EXISTING_DISPUTE_TABLE=your_disputes_table_name
export DB_NAME=your_existing_database

# Test with your existing data
./scripts-complex/postgres-automation.sh test
```

### [`scripts-complex/existing-database-mapping.json`](scripts-complex/existing-database-mapping.json) - Table Mapping Configuration

- **Function**: Configuration file for mapping AI-SDLC to your existing PostgreSQL schema
- **Features**:
  - Step-by-step instructions for identifying your existing tables
  - Environment variable mapping examples
  - Common Credit Pros database schema patterns
  - Validation queries for testing your setup

**Download**: [existing-database-mapping.json](scripts-complex/existing-database-mapping.json)

### [`scripts-complex/laravel-postgres-testing.php`](scripts-complex/laravel-postgres-testing.php) - Laravel Integration Tests

- **Function**: PHPUnit test classes for FCRA compliance testing with your existing Laravel database
- **Features**:
  - Tests your existing data for FCRA Section 604 & 611 compliance
  - Credit score validation on your current data
  - PII protection testing with your existing consumer records
  - Performance benchmarks for your database queries

**Download**: [laravel-postgres-testing.php](scripts-complex/laravel-postgres-testing.php)

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
    return `Generate comprehensive Vitest tests for ${componentName} with:

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

### [`scripts-complex/qase-aiden-integration.js`](scripts-complex/qase-aiden-integration.js) - **NEW: AI Test Generation**

- **Function**: Qase AIDEN integration with auto-healing Playwright test generation
- **Features**:
  - Generate tests from natural language requirements using AI
  - Convert manual Qase test cases to automated Playwright scripts
  - Auto-healing wrapper for all generated tests
  - Credit repair domain-specific test patterns
  - FCRA/FACTA compliance testing integration

**Usage**: `node scripts-complex/qase-aiden-integration.js generate "Test FCRA compliance flow"`

#### **Simple Integration Workflow:**

```bash
# Generate test from requirement
./ai-sdlc generate-from-requirements "Test credit score calculation with FICO 8 algorithm"

# Convert manual test case to automated
./ai-sdlc convert-manual-to-auto 123

# Auto-heal existing tests + generate new ones
./ai-sdlc heal-and-generate

# Complete automated testing setup
./ai-sdlc auto-complete-testing
```

### [`scripts-complex/playwright-auto-healing.js`](scripts-complex/playwright-auto-healing.js) - **NEW: Self-Healing Tests**

- **Function**: Standalone auto-healing utilities for Playwright tests
- **Features**:
  - Smart selector fallback system with learning capabilities
  - Auto-retry with intelligent waiting for flaky tests
  - Credit repair domain-specific utilities (SSN, credit scores, FCRA validation)
  - Statistics export and learning from failed selectors
  - Self-healing test maintenance

**Usage**: `node scripts-complex/playwright-auto-healing.js demo`

### [`scripts-complex/qodo-pr-agent.js`](scripts-complex/qodo-pr-agent.js)

- **Function**: GitHub PR automation and AI code review
- **Features**:
  - Automated PR analysis
  - Quality metrics reporting
  - Integration with GitHub API

**Usage**: `node scripts-complex/qodo-pr-agent.js`

## 🔧 **Additional Automation Scripts**

| Script                                                                     | Function                                                       | Status     |
| -------------------------------------------------------------------------- | -------------------------------------------------------------- | ---------- |
| [`qase-aiden-integration.js`](scripts-complex/qase-aiden-integration.js)   | **NEW: AI test generation with AIDEN**                         | ✅ Working |
| [`playwright-auto-healing.js`](scripts-complex/playwright-auto-healing.js) | **NEW: Self-healing test utilities**                           | ✅ Working |
| [`security-scanner.js`](scripts-complex/security-scanner.js)               | Infrastructure & compliance security (complements GitGuardian) | ✅ Working |
| [`performance-monitor.js`](scripts-complex/performance-monitor.js)         | Performance metrics tracking                                   | ✅ Working |
| [`dev-utils.js`](scripts-complex/dev-utils.js)                             | Development utilities                                          | ✅ Working |
| [`webhook-manager.js`](scripts-complex/webhook-manager.js)                 | Webhook automation                                             | ✅ Working |
| [`sonarqube-integration.js`](scripts-complex/sonarqube-integration.js)     | SonarQube integration                                          | ✅ Working |

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

   # Generate tests with existing AI tools
   ./ai-sdlc test-gen your-file.js
   node scripts-complex/ai-e2e-generator.js your-component.jsx

   # NEW: Qase AIDEN Integration
   ./ai-sdlc generate-from-requirements "Test FCRA compliance flow"
   ./ai-sdlc convert-manual-to-auto 123
   ./ai-sdlc heal-and-generate
   ```

3. **NEW: Qase AIDEN Quick Start**:

   ```bash
   # Set environment variable (optional - works in demo mode without)
   export QASE_API_TOKEN="your-qase-token"
   export QASE_PROJECT_CODE="TCP"

   # Generate test from natural language
   ./ai-sdlc generate-from-requirements "Validate credit score calculation accuracy"

   # Convert existing manual Qase test case
   ./ai-sdlc convert-manual-to-auto 456

   # Complete automated testing setup
   ./ai-sdlc auto-complete-testing
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
