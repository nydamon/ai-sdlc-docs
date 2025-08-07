# MCP Server Reference Guide

## 🔌 Complete MCP Server Documentation

This document provides comprehensive details about all 10 MCP (Model Context Protocol) servers included in the AI-SDLC framework, optimized for credit repair development workflows.

## 📋 Quick Reference

| Server Name              | Type          | Package/Script                                | Capabilities              | Domain                |
| ------------------------ | ------------- | --------------------------------------------- | ------------------------- | --------------------- |
| 🎭 Playwright Automation | Official      | `@playwright/mcp`                             | tools, resources, prompts | E2E Testing           |
| 🐙 GitHub Integration    | Custom        | `./scripts-complex/github-mcp-server.js`      | tools, resources          | Repository Management |
| 📁 Secure Filesystem     | Official      | `@modelcontextprotocol/server-filesystem`     | resources, tools          | Security              |
| 🗄️ PostgreSQL Enhanced   | Official      | `@modelcontextprotocol/server-postgres`       | tools, resources          | Database              |
| 🌐 Web Content Fetch     | Custom        | `./scripts-complex/web-fetch-mcp-server.js`   | resources                 | Research              |
| 🔧 Everything Server     | Official      | `@modelcontextprotocol/server-everything`     | resources, tools, prompts | Development           |
| 🛠️ AI-SDLC Toolkit       | Custom        | `./scripts-complex/mcp-server.js`             | resources, tools, prompts | Framework             |
| ⚖️ Credit Compliance     | Custom        | `./qodo-agents/credit-compliance-agent.js`    | tools, resources          | Compliance            |
| 🧪 Test Automation       | Custom        | `./scripts-complex/real-ai-test-generator.js` | tools, prompts            | Testing               |
| 🗃️ Database Automation   | Configuration | Server config only                            | tools, resources          | Database Management   |

## 🎭 Playwright Automation MCP

**Purpose**: Browser automation for E2E testing with AI-driven test generation

**Package**: `@playwright/mcp`  
**Reference URL**: https://npmjs.com/package/@playwright/mcp  
**GitHub**: https://github.com/executeautomation/playwright-mcp-server

**Capabilities**: tools, resources, prompts

**Features**:

- Automatic browser installation (Chrome, Firefox, Safari)
- AI-driven test generation with natural language
- Credit repair domain patterns (dispute forms, credit reports, customer portals)
- Visual regression testing capabilities
- Automatic screenshot/video capture on failures

**Configuration**:

```json
{
  "command": "npx",
  "args": ["-y", "@playwright/mcp"],
  "env": {
    "PLAYWRIGHT_BROWSERS_PATH": "${PLAYWRIGHT_BROWSERS_PATH}",
    "HEADLESS": "${HEADLESS:-true}",
    "DOMAIN_PATTERNS": "credit_repair,dispute_portal,customer_dashboard",
    "TCP_E2E_PATTERNS": "true"
  }
}
```

**Usage Examples**:

- Generate E2E tests for dispute form submission
- Test credit report viewing workflows
- Validate customer portal authentication
- Test admin dashboard functionality

## 🐙 GitHub Integration MCP

**Purpose**: Repository management and CI/CD automation with compliance checking

**Implementation**: Custom script (`./scripts-complex/github-mcp-server.js`)  
**Reference URL**: Custom AI-SDLC implementation

**Capabilities**: tools, resources

**Features**:

- Automated PR reviews with FCRA compliance checking
- PII detection in code changes
- Credit repair domain pattern validation
- Issue tracking and management
- Compliance automation workflows
- Repository security scanning

**Configuration**:

```json
{
  "command": "node",
  "args": ["./scripts-complex/github-mcp-server.js"],
  "env": {
    "GITHUB_TOKEN": "${GITHUB_TOKEN}",
    "GITHUB_REPOSITORY": "${GITHUB_REPOSITORY:-auto-detect}"
  }
}
```

**Usage Examples**:

- Automatic PR compliance review
- PII exposure prevention
- FCRA regulation adherence checking
- Automated issue creation for compliance violations

## 📁 Secure Filesystem MCP

**Purpose**: PII-safe file operations with built-in credit data protection

**Package**: `@modelcontextprotocol/server-filesystem`  
**Reference URL**: https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem  
**Documentation**: https://modelcontextprotocol.io/servers/filesystem

**Capabilities**: resources, tools

**Features**:

- Automatic PII filtering and detection
- Secure file handling for credit data
- Audit trail logging for file operations
- Encrypted storage for sensitive configurations
- Access control and permission management

**Configuration**:

```json
{
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-filesystem", "/secure/path"],
  "env": {
    "ALLOWED_EXTENSIONS": "js,ts,json,md,yml,yaml",
    "PII_PROTECTION": "true",
    "AUDIT_LOGGING": "true"
  }
}
```

**Usage Examples**:

- Safe handling of customer data files
- Secure configuration management
- Audit trail for compliance reporting
- Encrypted storage for sensitive documents

## 🗄️ PostgreSQL Enhanced MCP

**Purpose**: Database operations with FCRA audit trails and compliance logging

**Package**: `@modelcontextprotocol/server-postgres`  
**Reference URL**: https://github.com/modelcontextprotocol/servers/tree/main/src/postgres  
**Documentation**: https://modelcontextprotocol.io/servers/postgres

**Capabilities**: tools, resources

**Features**:

- FCRA audit trail logging for all database operations
- PII encryption and decryption capabilities
- Schema validation for compliance
- Automated compliance reporting
- Query optimization for credit data operations

**Configuration**:

```json
{
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-postgres"],
  "env": {
    "POSTGRES_CONNECTION_STRING": "${DATABASE_URL}",
    "FCRA_AUDIT_MODE": "true",
    "PII_ENCRYPTION": "true",
    "COMPLIANCE_LOGGING": "true"
  }
}
```

**Usage Examples**:

- FCRA-compliant database queries
- Automated audit trail generation
- PII-encrypted data storage
- Compliance reporting for regulatory audits

## 🌐 Web Content Fetch MCP

**Purpose**: Safe content fetching for compliance documentation and research

**Implementation**: Custom script (`./scripts-complex/web-fetch-mcp-server.js`)  
**Reference URL**: Custom AI-SDLC implementation

**Capabilities**: resources

**Features**:

- Rate-limited content fetching
- Trusted source validation (CFPB, FTC, credit bureaus)
- Content filtering and safety checks
- Compliance documentation caching
- Regulation update monitoring

**Configuration**:

```json
{
  "command": "node",
  "args": ["./scripts-complex/web-fetch-mcp-server.js"],
  "env": {
    "RATE_LIMIT": "100",
    "TRUSTED_DOMAINS": "cfpb.gov,ftc.gov,experian.com,equifax.com,transunion.com",
    "CONTENT_FILTERING": "true"
  }
}
```

**Usage Examples**:

- Fetch CFPB regulation updates
- Research credit bureau API documentation
- Monitor compliance requirement changes
- Cache regulatory guidance documents

## 🔧 Everything Server MCP

**Purpose**: Comprehensive development utilities and testing

**Package**: `@modelcontextprotocol/server-everything`  
**Reference URL**: https://github.com/modelcontextprotocol/servers/tree/main/src/everything  
**Documentation**: https://modelcontextprotocol.io/servers/everything

**Capabilities**: resources, tools, prompts

**Features**:

- Complete MCP feature testing
- Development debugging utilities
- Multi-capability integration testing
- Tool discovery and validation
- Development environment diagnostics

**Configuration**:

```json
{
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-everything"],
  "env": {
    "DEBUG_MODE": "true",
    "FEATURE_TESTING": "true"
  }
}
```

**Usage Examples**:

- Test MCP functionality during development
- Debug MCP server interactions
- Validate tool integrations
- Development environment diagnostics

## 🛠️ AI-SDLC Toolkit MCP

**Purpose**: Framework-specific automation with credit repair domain expertise

**Implementation**: Custom script (`./scripts-complex/mcp-server.js`)  
**Reference URL**: Custom AI-SDLC implementation

**Capabilities**: resources, tools, prompts

**Features**:

- AI-SDLC framework automation
- Credit repair domain-specific utilities
- Custom workflow automation
- Framework-specific tools and helpers
- Integration with existing AI-SDLC commands

**Configuration**:

```json
{
  "command": "node",
  "args": ["./scripts-complex/mcp-server.js"],
  "env": {
    "AI_SDLC_MODE": "true",
    "CREDIT_REPAIR_DOMAIN": "true",
    "FRAMEWORK_VERSION": "3.0.0"
  }
}
```

**Usage Examples**:

- Automate AI-SDLC framework tasks
- Generate credit repair specific code patterns
- Framework configuration management
- Custom workflow execution

## ⚖️ Credit Compliance MCP

**Purpose**: FCRA/FACTA validation with regulatory expertise

**Implementation**: Custom script (`./qodo-agents/credit-compliance-agent.js`)  
**Reference URL**: Custom AI-SDLC implementation

**Capabilities**: tools, resources

**Features**:

- FCRA Section 604 permissible purpose validation
- PII pattern detection and protection
- Regulatory compliance checking
- Automated compliance reporting
- Credit repair domain expertise

**Configuration**:

```json
{
  "command": "node",
  "args": ["./qodo-agents/credit-compliance-agent.js"],
  "env": {
    "FCRA_COMPLIANCE_MODE": "true",
    "PII_DETECTION": "true",
    "REGULATORY_CHECKS": "true"
  }
}
```

**Usage Examples**:

- Validate FCRA compliance in code
- Detect PII exposure risks
- Generate compliance reports
- Automated regulatory audit preparation

## 🧪 Test Automation MCP

**Purpose**: AI-powered test generation with domain awareness

**Implementation**: Custom script (`./scripts-complex/real-ai-test-generator.js`)  
**Reference URL**: Custom AI-SDLC implementation

**Capabilities**: tools, prompts

**Features**:

- AI-powered test generation
- Credit repair domain-aware patterns
- 100% test coverage targeting
- Intelligent test case creation
- Integration with existing test frameworks

**Configuration**:

```json
{
  "command": "node",
  "args": ["./scripts-complex/real-ai-test-generator.js"],
  "env": {
    "TEST_GENERATION_MODE": "true",
    "DOMAIN_PATTERNS": "credit_repair",
    "COVERAGE_TARGET": "100"
  }
}
```

**Usage Examples**:

- Generate comprehensive test suites automatically
- Create domain-specific test patterns
- Achieve 100% test coverage goals
- Intelligent edge case generation

## 🗃️ Database Automation MCP

**Purpose**: PostgreSQL integration for automated database operations

**Implementation**: Server configuration only (leverages postgresql_enhanced)  
**Reference URL**: Uses PostgreSQL Enhanced MCP capabilities

**Capabilities**: tools, resources

**Features**:

- Automated database setup and migrations
- Performance tuning and optimization
- Backup automation and management
- Database health monitoring
- Integration with PostgreSQL Enhanced MCP

**Configuration**:

```json
{
  "description": "Automated database operations and management",
  "transport": "stdio",
  "capabilities": ["tools", "resources"],
  "dependencies": ["postgresql_enhanced"]
}
```

**Usage Examples**:

- Automated database migrations
- Performance optimization tasks
- Backup and recovery automation
- Database health monitoring

## 🚀 Installation and Setup

All MCP servers are automatically installed and configured when you run:

```bash
./auto-setup.sh
```

**Manual MCP Setup:**

```bash
# Complete MCP setup
npm run mcp:setup

# Validate installation
npm run mcp:validate

# Check status
npm run mcp:status
```

**Configuration File Location**: `.mcp.json` in project root

**Generated Documentation**:

- `MCP-SETUP-GUIDE.md` - Setup instructions
- `MCP-VALIDATION-REPORT.md` - Validation results
- `MCP-QUICK-START.md` - Quick start guide

## 🔧 Troubleshooting

**Common Issues:**

1. **Missing Environment Variables**: Add required variables to `.env` file
2. **Package Not Found**: Some packages may not exist in npm registry - uses custom implementations
3. **Permission Issues**: Ensure proper file permissions for custom scripts
4. **Claude Code Integration**: Run `claude mcp add --config ./.mcp.json` to integrate with Claude Code

**Support Resources:**

- **MCP Protocol Documentation**: https://modelcontextprotocol.io/
- **Claude Code MCP Guide**: https://docs.anthropic.com/en/docs/claude-code/mcp
- **AI-SDLC Framework Documentation**: https://nydamon.github.io/ai-sdlc-docs/

## 📈 Performance Optimization

**Best Practices:**

1. **Environment Variables**: Configure all optional environment variables for optimal performance
2. **Resource Management**: MCP servers use minimal resources when not actively used
3. **Selective Usage**: Use specific MCP servers for targeted tasks
4. **Monitoring**: Regular validation ensures optimal performance

**Performance Metrics:**

- **Installation Time**: ~2-3 minutes (including Playwright browsers)
- **Memory Usage**: ~50-100MB per active server
- **Response Time**: <200ms for most operations
- **Validation Time**: ~30 seconds for all servers

---

**Framework Version**: AI-SDLC v3.2.0  
**Last Updated**: August 2025  
**MCP Protocol Version**: 1.0.0
