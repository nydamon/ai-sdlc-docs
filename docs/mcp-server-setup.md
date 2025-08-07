# MCP Server Setup Guide - AI-SDLC Framework

**Framework Version:** {{ extra.version.framework }} - {{ extra.version.name }}

## 🔌 Model Context Protocol (MCP) Integration

The AI-SDLC framework includes comprehensive MCP server integration to enhance Claude Code functionality with specialized credit repair domain automation and FCRA compliance tools.

---

## 🚀 Quick Setup

### **1. Prerequisites**

```bash
# Ensure Node.js 18+ is installed
node --version

# Install MCP SDK (if needed)
npm install @modelcontextprotocol/sdk
```

### **2. Configure MCP Servers**

The framework includes a pre-configured `.mcp.json` file with four specialized servers:

```bash
# Add AI-SDLC MCP servers to Claude Code
claude mcp add --config ./.mcp.json

# Verify servers are loaded
claude mcp list
```

### **3. Environment Variables**

Create or update your `.env` file:

```bash
# Required for AI features
OPENAI_API_KEY=sk-proj-your-key-here
GITHUB_TOKEN=ghp_your-token-here

# Optional for enhanced functionality
QASE_API_TOKEN=your-qase-token
TCP_COMPLIANCE_RULES=strict
DB_HOST=localhost
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASS=your_db_password
```

---

## 🛠️ Available MCP Servers

### **1. AI-SDLC Toolkit Server**

**Purpose:** Core AI-powered development automation  
**Command:** `node ./scripts-complex/mcp-server.js`

**Capabilities:**

- AI test generation with OpenAI GPT-4
- Smart test selection and execution
- Credit score validation
- PII data auditing

### **2. Credit Compliance Server**

**Purpose:** FCRA/FACTA compliance validation  
**Command:** `node ./qodo-agents/credit-compliance-agent.js --mcp-mode`

**Capabilities:**

- FCRA Section 604/607/615 validation
- Credit repair domain rule enforcement
- Regulatory compliance checking

### **3. Test Automation Server**

**Purpose:** AI-powered test generation  
**Command:** `node ./scripts-complex/real-ai-test-generator.js --mcp-server`

**Capabilities:**

- Vitest/Playwright test generation
- Domain-specific test patterns
- Coverage analysis and reporting

### **4. Database Automation Server**

**Purpose:** PostgreSQL automation with compliance  
**Command:** `bash ./scripts-complex/postgres-automation.sh mcp-mode`

**Capabilities:**

- FCRA compliance testing on existing data
- Database schema auditing
- Automated backup and reporting

---

## 🎯 Using MCP Tools in Claude Code

### **Generate AI Tests**

```
/mcp

Use the generate_ai_tests tool to create comprehensive tests for src/components/CreditScore.tsx with FCRA compliance validation.
```

### **Validate FCRA Compliance**

```
/mcp

Run validate_fcra_compliance on src/services/creditReport.js to check for Section 604, 607, and 615 compliance.
```

### **Audit PII Handling**

```
/mcp

Execute audit_pii_handling on the ./src directory to identify and validate proper PII data encryption.
```

### **Smart Test Execution**

```
/mcp

Run run_smart_tests with coverage_threshold of 85 to execute optimized test selection.
```

---

## 📋 MCP Resources Available

### **Credit Score Validation Rules**

- URI: `tcp://credit-score/validation-rules`
- FICO 8 algorithm specifications
- Compliance requirements and validation patterns

### **FCRA Compliance Patterns**

- URI: `tcp://fcra/compliance-patterns`
- Section 604/607/615 code patterns
- Required validation and prohibited patterns

### **AI Test Templates**

- URI: `tcp://tests/templates`
- Credit repair domain test patterns
- Framework-specific templates (Vitest, Playwright)

---

## 🎨 Prompt Templates

### **Credit Repair Test Generation**

```
/mcp

Use the credit_repair_test_generation prompt for src/utils/creditCalculation.js with compliance_sections "604,607"
```

This generates comprehensive tests including:

- FICO 8 credit score validation
- FCRA compliance checks
- Edge case handling
- Domain-specific patterns

---

## 🔧 Advanced Configuration

### **Custom Tool Parameters**

```json
{
  "generate_ai_tests": {
    "file_path": "src/components/CreditReport.jsx",
    "test_type": "integration",
    "compliance_mode": true
  },
  "validate_credit_score": {
    "score": 725,
    "factors": {
      "payment_history": 85,
      "credit_utilization": 25,
      "credit_history": 72,
      "credit_mix": 7,
      "new_credit": 2
    }
  }
}
```

### **Server Timeout and Retry Configuration**

```json
{
  "global_settings": {
    "timeout": 30000,
    "retry_attempts": 3,
    "log_level": "info"
  }
}
```

---

## 🚨 Troubleshooting

### **Server Not Starting**

```bash
# Check Node.js version
node --version  # Should be 18+

# Verify MCP SDK installation
npm list @modelcontextprotocol/sdk

# Test server manually
node ./scripts-complex/mcp-server.js
```

### **Tools Not Available**

```bash
# Refresh MCP configuration
claude mcp refresh

# Check server status
claude mcp status

# Re-add servers
claude mcp add --config ./.mcp.json
```

### **API Key Issues**

```bash
# Validate environment variables
echo $OPENAI_API_KEY | head -c 20
echo $GITHUB_TOKEN | head -c 10

# Test API connectivity
./ai-sdlc validate --api-keys
```

---

## 📊 Performance Optimization

### **Resource Usage**

- **Memory:** ~50MB per MCP server
- **CPU:** Low impact during idle
- **Network:** Only for AI API calls

### **Caching Strategy**

- Test templates cached locally
- Compliance rules cached for 24 hours
- Resource queries cached for session duration

---

## 🔒 Security Considerations

### **API Key Protection**

- All sensitive data handled via environment variables
- No API keys stored in MCP configuration
- Secure transport via stdio protocol

### **FCRA Compliance**

- All PII data handling audited automatically
- Compliance validation integrated into tools
- Audit trails maintained for regulatory requirements

---

## 📈 Usage Examples

### **Complete Workflow Example**

```
# 1. Generate AI tests for a credit component
/mcp
Use generate_ai_tests for src/services/creditScore.js with compliance_mode true

# 2. Validate FCRA compliance
/mcp
Run validate_fcra_compliance on src/services/creditScore.js

# 3. Execute smart tests
/mcp
Execute run_smart_tests with coverage_threshold 80

# 4. Audit PII handling
/mcp
Run audit_pii_handling on ./src directory
```

### **Credit Score Validation Example**

```
/mcp
Validate credit score 682 with factors:
- payment_history: 80
- credit_utilization: 30
- credit_history: 60
- credit_mix: 5
- new_credit: 2
```

---

## 🆘 Support

### **Documentation References**

- [MCP Protocol Documentation](https://modelcontextprotocol.io/docs)
- [Claude Code MCP Integration](https://docs.anthropic.com/en/docs/claude-code/mcp)
- [AI-SDLC Framework Guide](./README.md)

### **Getting Help**

1. Check the [Troubleshooting Guide](troubleshooting-simple.md)
2. Run `./ai-sdlc doctor` for automated diagnostics
3. Use `claude mcp list` to verify server status
4. Review server logs for specific error messages

---

**🏦 Specialized for The Credit Pros credit repair domain with FCRA compliance automation and validated $2.43M annual ROI potential.**
