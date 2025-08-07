# Claude Code Sub-Agents Configuration - AI-SDLC Framework

**Framework Version:** {{ extra.version.framework }} - {{ extra.version.name }}

## 🤖 Claude Code Sub-Agents Integration

The AI-SDLC framework provides **optional** Claude Code sub-agents integration that works **in addition to** the primary Cline workflow. This is specifically designed for developers who use Claude Code as their secondary AI coding assistant alongside Cline.

!!! info "Framework Compatibility"
This configuration is **optional** and designed for teams using **both** Cline and Claude Code. If you only use Cline, you can skip this setup entirely.

---

## 🔄 Cline vs Claude Code: Clear Delineations

### **Primary Development Platform: Cline**

- **Role**: Primary AI coding assistant and development automation platform
- **Integration**: Full MCP server integration with 6 specialized servers
- **Usage**: Day-to-day development, testing, automation, compliance validation
- **Configuration**: `cline_config/` directory with model routing and multi-model strategy
- **Scripts**: All `scripts-complex/` automation designed for Cline integration

### **Secondary Enhancement Platform: Claude Code**

- **Role**: Enhanced specialized agent system for complex domain tasks
- **Integration**: Sub-agents work alongside MCP servers through orchestration system
- **Usage**: Complex credit repair tasks, advanced compliance validation, architectural planning
- **Configuration**: `claude-code-sub-agents-config.json` with domain-specific agents
- **Scripts**: Agent orchestration system bridges Cline MCP and Claude Code sub-agents

### **Orchestration Layer**

- **Purpose**: Intelligently routes tasks between Cline MCP servers and Claude Code sub-agents
- **Benefits**: Cost optimization, domain expertise matching, performance optimization
- **Implementation**: `scripts-complex/agent-orchestrator.js` provides unified routing

---

## 🎯 When to Use Each Platform

### **Use Cline For:**

✅ **Daily Development Tasks**

- Code generation and modification
- Testing and debugging
- Git operations and CI/CD
- Database operations
- File system operations
- Standard compliance checks

### **Use Claude Code Sub-Agents For:**

✅ **Complex Domain-Specific Tasks**

- FCRA compliance architectural planning
- Advanced security auditing
- Credit repair workflow design
- Complex test generation with domain patterns
- Technical documentation for compliance

### **Automatic Orchestration Handles:**

🎭 **Intelligent Task Routing**

- Analyzes task complexity and domain requirements
- Routes simple tasks to budget-friendly agents
- Routes complex credit repair tasks to specialized agents
- Provides fallback chains for high availability

---

## 🚀 Quick Setup (Optional)

### **Prerequisites**

```bash
# Ensure Claude Code is installed
npm install -g @anthropic/claude-code

# Verify Cline is working (required)
./ai-sdlc status

# Ensure MCP servers are configured (required)
npm run mcp:setup
```

### **Install Claude Code Sub-Agents**

```bash
# Install the orchestration system
npm run subagents:install

# Configure domain-specific agents
npm run subagents:setup

# Validate the configuration
npm run subagents:validate
```

---

## 🤖 Available Claude Code Sub-Agents

### **Credit Repair Specialized Agents**

#### **1. Credit Compliance Reviewer**

- **Base Agent**: code-reviewer
- **Domain**: Code quality with FCRA compliance
- **Cost Tier**: Premium ($0.25/task)
- **Specializations**: FCRA compliance, PII protection, credit repair
- **Integration**: Works with `ai_sdlc_toolkit` MCP server
- **Use Cases**: Code review with Section 604/607/615 validation

#### **2. Credit Test Generator**

- **Base Agent**: test-generator
- **Domain**: Testing with credit repair patterns
- **Cost Tier**: Premium ($0.25/task)
- **Specializations**: Credit repair, E2E automation, domain testing
- **Integration**: Works with `test_automation` MCP server
- **Use Cases**: FICO algorithm testing, dispute workflow testing

#### **3. Security Auditor Enhanced**

- **Base Agent**: security-auditor
- **Domain**: Security with PII focus
- **Cost Tier**: Premium ($0.25/task)
- **Specializations**: PII protection, FCRA audit, encryption validation
- **Integration**: Works with `secure_filesystem` MCP server
- **Use Cases**: PII data auditing, encryption implementation review

### **General Development Agents**

#### **4. Documentation Specialist**

- **Base Agent**: documentation-writer
- **Domain**: Technical documentation
- **Cost Tier**: Standard ($0.10/task)
- **Specializations**: Technical writing, API docs, compliance docs
- **Integration**: Works with `github_integration` MCP server
- **Use Cases**: API documentation, compliance guides

#### **5. Architecture Planner (FCRA)**

- **Base Agent**: architecture-planner
- **Domain**: System design with compliance focus
- **Cost Tier**: Premium ($0.25/task)
- **Specializations**: System design, compliance architecture, scalability
- **Integration**: Works with `ai_sdlc_toolkit` MCP server
- **Use Cases**: Compliance architecture, data flow design

#### **6. Performance Optimizer**

- **Base Agent**: performance-optimizer
- **Domain**: Performance optimization
- **Cost Tier**: Standard ($0.10/task)
- **Specializations**: Database optimization, query tuning, caching
- **Integration**: Works with `postgresql_enhanced` MCP server
- **Use Cases**: Database query optimization, API performance tuning

#### **7. Budget Code Assistant**

- **Base Agent**: code-assistant
- **Domain**: General development
- **Cost Tier**: Budget ($0.05/task)
- **Specializations**: Simple tasks, quick fixes, basic refactoring
- **Integration**: Works with `mcp_everything` MCP server
- **Use Cases**: Simple bug fixes, code formatting, basic features

---

## 🎭 Agent Orchestration System

### **Intelligent Routing Logic**

The orchestration system automatically determines whether to use:

- **Cline MCP servers** for infrastructure and standard operations
- **Claude Code sub-agents** for specialized domain expertise
- **Hybrid workflows** combining both platforms

### **Cost Optimization**

| Task Complexity | Agent Type       | Cost Range | Use Case                      |
| --------------- | ---------------- | ---------- | ----------------------------- |
| Simple (1-2)    | Budget Assistant | $0.05      | Quick fixes, formatting       |
| Medium (3-4)    | Standard Agents  | $0.10      | Documentation, optimization   |
| Complex (5+)    | Premium Agents   | $0.25      | FCRA compliance, architecture |

### **Domain Expertise Routing**

```bash
# Credit repair tasks → Specialized agents
"Generate FCRA compliance tests for credit score calculation"
→ Routes to: credit-test-generator + ai_sdlc_toolkit MCP server

# General development → Standard workflow
"Fix the navigation component styling issue"
→ Routes to: budget-code-assistant (cost-optimized)

# Security tasks → Enhanced security agents
"Audit PII handling in customer data processing"
→ Routes to: security-auditor-enhanced + secure_filesystem MCP server
```

---

## 📋 Configuration Files

### **Main Configuration**: `claude-code-sub-agents-config.json`

```json
{
  "name": "claude-code-sub-agents-enhanced",
  "version": "1.0.0",
  "framework_integration": {
    "ai_sdlc_version": "3.1.0",
    "mcp_compatibility": true,
    "orchestration_enabled": true,
    "cost_optimization": true
  },
  "sub_agents": {
    "credit-compliance-reviewer": {
      "specializations": ["fcra_compliance", "pii_protection"],
      "integration": {
        "mcp_server": "ai_sdlc_toolkit"
      }
    }
  }
}
```

### **Orchestration Script**: `scripts-complex/agent-orchestrator.js`

- **Purpose**: Routes tasks between Cline MCP and Claude Code sub-agents
- **Features**: Cost optimization, performance tracking, fallback chains
- **Usage**: `npm run subagents:orchestrate`

---

## 🔧 Advanced Usage Examples

### **Hybrid Workflow Example**

```bash
# Complex credit repair task using both platforms
Task: "Design secure architecture for dispute resolution system with FCRA compliance"

Orchestration Decision:
1. Infrastructure: postgresql_enhanced MCP server (database design)
2. Logic: architecture-planner-fcra sub-agent (compliance architecture)
3. Validation: security-auditor-enhanced sub-agent (security review)

Cost: $0.01 (MCP) + $0.25 (architecture) + $0.25 (security) = $0.51
```

### **Cost-Optimized Example**

```bash
# Simple task routed to budget agent
Task: "Fix typo in user registration form"

Orchestration Decision:
1. Agent: budget-code-assistant ($0.05)
2. Fallback: mcp_everything server (infrastructure)

Cost: $0.05 (optimized for simple tasks)
```

---

## 🚨 Important Usage Guidelines

### **DO Use Claude Code Sub-Agents For:**

- Complex FCRA compliance architectural decisions
- Advanced security auditing requiring domain expertise
- Credit repair workflow design and validation
- Complex test generation with industry-specific patterns

### **DO Use Cline (Primary Platform) For:**

- Daily development tasks and code generation
- Standard testing and debugging
- File system operations and git workflows
- Database operations and standard compliance checks

### **DON'T Use Sub-Agents For:**

- Simple code changes or bug fixes (use budget agent or Cline)
- Standard development tasks without domain complexity
- Tasks already handled efficiently by MCP servers

---

## 📊 Monitoring and Optimization

### **Cost Tracking**

```bash
# View orchestration metrics
npm run subagents:orchestrate -- --metrics

# Daily budget limit: $10.00
# Per-task limit: $1.00
# Alert threshold: 80%
```

### **Performance Monitoring**

```bash
# Validate agent performance
npm run subagents:validate

# Success rate threshold: 85%
# Response time threshold: 30 seconds
# Retry limit: 3 attempts
```

---

## 🔧 Troubleshooting

### **Sub-Agents Not Available**

```bash
# Check Claude Code installation
claude --version

# Reinstall sub-agents configuration
npm run subagents:setup

# Validate orchestration system
node scripts-complex/agent-orchestrator.js --test
```

### **Orchestration Not Working**

```bash
# Check MCP servers (required dependency)
npm run mcp:status

# Validate agent configuration
npm run subagents:validate

# Test routing logic
node scripts-complex/agent-orchestrator.js
```

### **Cost Optimization Issues**

```bash
# Review routing decisions
npm run subagents:orchestrate -- --analysis

# Adjust budget thresholds in configuration
# Edit: claude-code-sub-agents-config.json
```

---

## 📈 Integration with Existing Workflow

### **With Cline Development**

1. **Continue normal Cline workflow** for daily development
2. **Orchestration system automatically determines** when Claude Code sub-agents add value
3. **Cost optimization ensures** simple tasks stay with budget-friendly options
4. **Specialized agents handle** credit repair domain complexity

### **With MCP Servers**

1. **MCP servers provide infrastructure** (filesystem, database, GitHub)
2. **Sub-agents provide specialized logic** (compliance, architecture, security)
3. **Hybrid workflows combine both** for optimal results
4. **Orchestration manages complexity** automatically

---

## 🆘 Support and Documentation

### **Related Documentation**

- [MCP Server Setup Guide](mcp-server-setup.md) - **Required** for sub-agents
- [Agent Orchestration Guide](agent-orchestration-guide.md) - Detailed routing logic
- [Enhanced Cline Guidelines](enhanced-cursor-guidelines.md) - Primary platform setup
- [Cost Optimization Guide](enhanced-config-management.md) - Budget management

### **Getting Help**

1. **Primary Platform Issues**: Use standard Cline troubleshooting
2. **MCP Server Issues**: Run `npm run mcp:validate`
3. **Sub-Agent Issues**: Run `npm run subagents:validate`
4. **Orchestration Issues**: Check `scripts-complex/agent-orchestrator.js`

---

**🏦 This configuration enhances the AI-SDLC framework with domain-specific Claude Code agents while preserving the primary Cline workflow, providing intelligent cost optimization and specialized credit repair expertise.**
