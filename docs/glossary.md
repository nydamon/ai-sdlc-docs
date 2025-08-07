# 📚 AI-SDLC Glossary

## Core Framework Terms

**AI-SDLC** - AI-powered Software Development Lifecycle framework that automates code quality, testing, and compliance processes.

**Progressive Architecture** - The 3-level implementation system (Free → AI-Powered → Enterprise) allowing gradual adoption.

## Development Tools

**Claude Code** - Terminal-native AI assistant with enterprise policy management, centralized configuration capabilities, and optional sub-agents integration. In the AI-SDLC framework, Claude Code serves as a **secondary enhancement platform** with specialized domain agents for complex credit repair tasks. See [Claude Code Sub-Agents Setup](claude-code-sub-agents-setup.md).

**Cline** - IDE-integrated AI development assistant serving as the **primary AI platform** in the AI-SDLC framework. Features team coordination, multi-model support, and comprehensive MCP server integration. See [Claude Code + Cline Guidelines](enhanced-cursor-guidelines.md).

**ESLint** - JavaScript/TypeScript linting tool that catches code quality issues and enforces consistent style.

**Prettier** - Code formatter that automatically applies consistent formatting rules across your codebase.

**PostgreSQL Integration** - AI-SDLC capability to work with existing PostgreSQL databases without creating new tables. See [Existing Database Setup](existing-database-setup.md).

**Husky** - Git hooks manager that runs automated checks before commits and pushes.

**lint-staged** - Tool that runs linters only on staged files for faster performance.

**Laravel Eloquent** - Object-Relational Mapping (ORM) used for database interactions in Laravel PHP applications, providing elegant database query syntax.

**React Hook Form** - Performant form state management library for React applications with minimal re-renders and built-in validation.

**TypeScript Strict Mode** - Enhanced type checking configuration that enforces stricter type safety rules for better code quality and error prevention.

**Semantic Versioning** - Version numbering system (MAJOR.MINOR.PATCH) for release management that communicates backward compatibility and change impact.

## AI Testing Platforms

**OpenAI GPT-4** - AI model used for intelligent test generation and code analysis in Level 2+ implementations.

**Qase** - Test management platform integrated for professional test case organization and reporting. AI-SDLC supports dual project configuration:

- **TCP Project (Client Frontend)** - Customer-facing portal testing and user experience validation
- **PCU Project (Admin Frontend)** - Internal admin dashboard testing and workflow validation

**Codium AI** - AI-powered testing platform that generates comprehensive test suites with edge case coverage.

**Qodo (formerly CodiumAI)** - AI code review agent that provides automated PR analysis and suggestions.

**Qase AIDEN** - AI-powered test generation system that converts natural language requirements into automated Playwright tests. Integrated with AI-SDLC for intelligent test creation.

**Auto-Healing Tests** - Self-maintaining test framework that automatically adapts when UI selectors change, reducing test maintenance overhead through smart fallback systems.

## v3.1.0 Claude Code + Cline Enterprise Platform

**Agent Orchestration System** - Intelligent routing system that automatically determines whether to use Cline MCP servers or Claude Code sub-agents based on task complexity, domain requirements, and cost optimization. See [Agent Orchestration Guide](agent-orchestration-guide.md).

**MCP Servers** - Model Context Protocol servers providing infrastructure capabilities for AI-powered development. The AI-SDLC framework includes 10 specialized MCP servers optimized for credit repair development. Automatically installed via `auto-setup.sh`. See comprehensive details below.

### Core MCP Servers (10 Total)

**🎭 Playwright Automation MCP** - Browser automation server for E2E testing with AI-driven test generation. Automatically installs browser binaries and provides domain-specific patterns for credit repair workflows.

- **Package**: `@playwright/mcp`
- **Capabilities**: tools, resources, prompts
- **Purpose**: Generate and execute E2E tests for dispute forms, credit reports, customer portals
- **Reference**: https://npmjs.com/package/@playwright/mcp

**🐙 GitHub Integration MCP** - Repository management and CI/CD automation server for compliance and PR reviews.

- **Implementation**: Custom script (`./scripts-complex/github-mcp-server.js`)
- **Capabilities**: tools, resources
- **Purpose**: Automated PR reviews, FCRA code scanning, issue tracking, compliance automation
- **Features**: PII detection, regulatory compliance checking, credit repair domain validation

**📁 Secure Filesystem MCP** - PII-safe file operations server with built-in credit data protection.

- **Package**: `@modelcontextprotocol/server-filesystem`
- **Capabilities**: resources, tools
- **Purpose**: Secure file handling with automatic PII filtering and credit data protection
- **Features**: Prevents accidental PII exposure, secure config management, audit trail logging

**🗄️ PostgreSQL Enhanced MCP** - Database operations server with FCRA audit trails and compliance logging.

- **Package**: `@modelcontextprotocol/server-postgres`
- **Capabilities**: tools, resources
- **Purpose**: Compliant database queries with built-in audit trails and PII encryption
- **Features**: FCRA audit logging, PII encryption, schema validation, compliance reporting

**🌐 Web Content Fetch MCP** - Safe content fetching server for compliance documentation and research.

- **Implementation**: Custom script (`./scripts-complex/web-fetch-mcp-server.js`)
- **Capabilities**: resources
- **Purpose**: Fetch CFPB regulations, credit bureau API docs, compliance requirements safely
- **Features**: Rate limiting, content filtering, trusted source validation

**🔧 Everything Server MCP** - Comprehensive development utilities and testing server.

- **Package**: `@modelcontextprotocol/server-everything`
- **Capabilities**: resources, tools, prompts
- **Purpose**: Full MCP feature testing, development debugging, comprehensive tool access
- **Features**: Multi-capability testing, debugging utilities, development tools integration

**🛠️ AI-SDLC Toolkit MCP** - Framework-specific automation server with credit repair domain expertise.

- **Implementation**: Custom script (`./scripts-complex/mcp-server.js`)
- **Capabilities**: resources, tools, prompts
- **Purpose**: AI-SDLC framework automation, credit repair specific utilities
- **Features**: Framework automation, domain-specific tools, custom workflows

**⚖️ Credit Compliance MCP** - FCRA/FACTA validation agent with regulatory expertise.

- **Implementation**: Custom script (`./qodo-agents/credit-compliance-agent.js`)
- **Capabilities**: tools, resources
- **Purpose**: Automated FCRA compliance checking, PII validation, regulatory audit support
- **Features**: FCRA Section 604 validation, PII pattern detection, compliance reporting

**🧪 Test Automation MCP** - AI-powered test generation server with domain awareness.

- **Implementation**: Custom script (`./scripts-complex/real-ai-test-generator.js`)
- **Capabilities**: tools, prompts
- **Purpose**: Generate comprehensive test suites automatically with credit repair patterns
- **Features**: AI test generation, domain-aware patterns, 100% coverage targeting

**🗃️ Database Automation MCP** - PostgreSQL integration server for automated database operations.

- **Implementation**: Server configuration only (leverages postgresql_enhanced)
- **Capabilities**: tools, resources
- **Purpose**: Automated database setup, migration management, performance optimization
- **Features**: Auto-migrations, performance tuning, backup automation

**Claude Code Sub-Agents** - Specialized AI agents for domain-specific tasks (FCRA compliance, security auditing, architecture planning). Work alongside MCP servers through the orchestration system. Seven agents available from budget ($0.05) to premium ($0.25) tiers.

**Hybrid Workflows** - Advanced task execution combining Cline MCP servers (infrastructure) with Claude Code sub-agents (specialized logic) for optimal performance and cost efficiency.

**Cost-Optimized Routing** - Intelligent agent selection based on budget constraints: Budget ($0.05), Standard ($0.10), Premium ($0.25), with automatic fallback chains for high availability.

## v2.8.1 Open-Source PR-Agent Platform (Previous)

**Open-Source PR-Agent** - Cost-efficient AI-powered code review automation with TCP credit repair compliance optimization, delivering 90% cost reduction vs commercial alternatives.

**TCP Compliance Configuration** - FCRA/FACTA specific validation rules with PII pattern detection, regulatory requirement checking, and credit repair domain expertise built into AI analysis.

**Cost-Optimized AI Routing** - Smart model selection using GPT-4o-mini primary with strategic fallbacks to GPT-3.5-turbo and GPT-4 based on analysis complexity and cost efficiency.

**Cline Rules (.clinerules)** - Project and global rule files that define AI behavior, coding standards, compliance requirements, and domain-specific guidelines for consistent development practices.

**Enterprise Policy Hierarchy** - Claude Code's configuration precedence system: Enterprise Managed Policies → Command Line Arguments → Local Project Settings → User Settings.

**Multi-Model AI Support** - Cline's capability to work with various AI models (Claude, Gemini, Qwen, DeepSeek) with intelligent model selection based on task complexity and cost optimization.

## Previous Version Testing Enhancements (Retained)

**Smart Test Execution** - Intelligent test selection that only runs tests for files changed since the last commit, reducing CI/CD execution time by up to 60%.

**Coverage Quality Gates** - Automated enforcement of code coverage thresholds (80% lines, 80% functions, 70% branches) integrated with Vitest and SonarCloud validation.

**Enhanced E2E Debugging** - Automatic capture of screenshots and video recordings when Playwright end-to-end tests fail, enabling faster debugging and issue resolution.

**CI Test Optimization** - GitHub Actions workflow enhancement that runs E2E tests only on pull requests, optimizing resource usage and pipeline performance.

**test:changed** - NPM script that executes Vitest only on files modified since the last Git commit, providing rapid feedback during development.

**test:watch-coverage** - NPM script that runs Vitest in watch mode with live coverage reporting, enabling real-time quality monitoring during development.

**test:e2e-headed** - NPM script that runs Playwright tests with browser UI visible, useful for debugging and test development.

**ci:test-fast** - Optimized NPM script combining linting and smart test execution for efficient CI/CD pipeline processing.

## Credit Repair Domain

**FCRA** - Fair Credit Reporting Act, federal law governing credit reporting and consumer rights.

**FACTA** - Fair and Accurate Credit Transactions Act, amendment to FCRA adding identity theft protections.

**PII** - Personally Identifiable Information, sensitive consumer data requiring special handling in credit systems.

**PCI-DSS** - Payment Card Industry Data Security Standard for secure payment processing.

## Database & Performance

**Connection Pooling** - Database connection management technique that maintains a pool of reusable connections for optimal PostgreSQL performance and resource utilization.

**Query Optimization** - Process of improving database query performance through indexing, query restructuring, and execution plan analysis for large credit datasets.

**Index Management** - Strategic creation and maintenance of database indexes to accelerate credit data searches, report generation, and regulatory queries.

**Data Encryption at Rest** - PostgreSQL encryption implementation for securing sensitive credit information stored in database files and backups.

## Git & Deployment

**Git Hooks** - Automated scripts that run at specific Git workflow points (pre-commit, commit-msg, etc.).

**Conventional Commits** - Standardized commit message format enabling automated changelog generation.

**GitHub Actions** - CI/CD platform for automated testing, building, and deployment workflows.

**MkDocs** - Static site generator used for this documentation site with Material Design theme.

## Testing & QA

**Vitest** - Modern JavaScript testing framework, faster alternative to Jest with native TypeScript support and Vite integration.

**Playwright** - End-to-end testing framework for comprehensive user flow validation across browsers (Chrome, Firefox, Safari). AI generates complete E2E test suites for critical user journeys, including visual regression detection and automatic screenshot/video capture on failures.

**Qase** - Test case management system with AI integration that converts natural language requirements into automated test cases. Maintains comprehensive test documentation and provides analytics on test coverage and execution results.

**E2E Testing** - End-to-end testing that validates complete user workflows from start to finish.

**Test Coverage** - Metric measuring percentage of code executed during automated testing.

**Coverage Thresholds** - Enforced quality gates that automatically fail builds if code coverage drops below specified levels:

- **Lines Coverage (80%)**: Every line of executable code must be executed by tests
- **Functions Coverage (80%)**: Every function/method must be called during testing
- **Branches Coverage (70%)**: Every if/else condition and logical branch must be tested
- Prevents regression bugs and ensures consistent code quality across the codebase.

**TypeScript Strict Mode** - Enhanced TypeScript configuration that enforces compile-time error detection, eliminating runtime type errors and improving code reliability. Includes strict null checks, no implicit any, and comprehensive type validation that catches bugs before deployment.

**Modern Bundler Optimization** - Build performance improvements through next-generation tools:

- **Vite**: 10x faster than traditional bundlers with instant hot module replacement
- **esbuild**: Ultra-fast TypeScript compilation (100x faster than tsc)
- **SWC**: Rust-based JavaScript/TypeScript compiler, 20x faster than Babel
- Results in development builds under 1 second and production builds 90% faster.

**Advanced State Management Auto-Testing** - AI-generated comprehensive tests for modern state management libraries:

- **Zustand**: Tests for store actions, state mutations, and selectors
- **TanStack Query**: API call testing, cache management, and error handling validation
- **Pinia**: Store composition testing, getters, and mutations verification
- Eliminates manual store testing and automatically catches state management bugs.

## Implementation Levels

**Level 1 (FREE)** - Basic code quality automation with ESLint, Prettier, and Git hooks.

**Level 2 (AI-Powered)** - Adds AI test generation with OpenAI integration, Qase test case management, Playwright E2E automation, and advanced framework support with coverage thresholds and modern bundler optimization.

**Level 3 (Enterprise)** - Full QA automation with E2E testing, security scanning, and compliance validation.

## Business Metrics

**ROI** - Return on Investment, measuring financial benefit versus implementation cost.

**Code Review Overhead** - Time spent on manual formatting, style, and basic quality checks during PR reviews.

**Development Velocity** - Speed of feature delivery measured in story points or features per sprint.

**Technical Debt** - Cost of maintaining poorly structured or inconsistent code over time.

---

## Quick Reference Links

- [Architecture Overview](architecture-simplified.md) - Framework structure and levels
- [Quick Start Guide](quick-start-simple.md) - Implementation steps
- [🗺️ Existing Database Setup](existing-database-setup.md) - **PostgreSQL integration with your current database**
- [🐘 PostgreSQL Database Automation](postgresql-automation.md) - **FCRA compliance testing on existing data**
- [Manager Implementation Guide](implementation-guide-managers.md) - Team rollout strategy
- [Git Hooks Automation](git-hooks-automation.md) - Technical automation details
- [Claude Code + Cline Guidelines](enhanced-cursor-guidelines.md) - Enterprise AI development platform configuration
- [Claude Code Sub-Agents Setup](claude-code-sub-agents-setup.md) - **Optional Claude Code sub-agents integration with cost optimization**
- [Agent Orchestration Guide](agent-orchestration-guide.md) - **Intelligent routing between Cline MCP and Claude Code sub-agents**
- [MCP Server Setup Guide](mcp-server-setup.md) - **Model Context Protocol server configuration for infrastructure operations**
- [Centralized Ruleset Management](centralized-ruleset-management.md) - Implementation manager guide for enterprise policy control
- [Claude Code + Cline Implementation Guide](claude-code-cline-implementation-guide.md) - Complete enterprise platform deployment
- [Testing & Validation](TESTING-README.md) - Quality assurance processes
- [👨‍💻 Developer Workflow Guide](developer-workflow-guide.md) - **Complete daily workflow with AI-SDLC tools**
- [🧪 QA Team Workflow Guide](qa-team-workflow-guide.md) - **QA automation and testing workflows**
- [👀 Code Reviewer Guide](code-reviewer-guide.md) - **AI-assisted code review process**

---

_Created by Damon DeCrescenzo, CTO - The Credit Pros_  
_Framework Version: v3.1.0 - Claude Code + Cline Enterprise Platform_  
_Last Updated: August 7, 2025_
