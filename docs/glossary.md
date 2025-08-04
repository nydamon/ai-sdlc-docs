# 📚 AI-SDLC Glossary

## Core Framework Terms

**AI-SDLC** - AI-powered Software Development Lifecycle framework that automates code quality, testing, and compliance processes.

**Progressive Architecture** - The 3-level implementation system (Free → AI-Powered → Enterprise) allowing gradual adoption.

## Development Tools

**Cursor IDE** - AI-powered code editor with intelligent autocomplete and code generation capabilities. See [Cursor IDE Guidelines](enhanced-cursor-guidelines.md).

**ESLint** - JavaScript/TypeScript linting tool that catches code quality issues and enforces consistent style.

**Prettier** - Code formatter that automatically applies consistent formatting rules across your codebase.

**PostgreSQL Integration** - AI-SDLC capability to work with existing PostgreSQL databases without creating new tables. See [Existing Database Setup](existing-database-setup.md).

**Husky** - Git hooks manager that runs automated checks before commits and pushes.

**lint-staged** - Tool that runs linters only on staged files for faster performance.

## AI Testing Platforms

**OpenAI GPT-4** - AI model used for intelligent test generation and code analysis in Level 2+ implementations.

**Qase** - Test management platform integrated for professional test case organization and reporting.

**Codium AI** - AI-powered testing platform that generates comprehensive test suites with edge case coverage.

**Qodo (formerly CodiumAI)** - AI code review agent that provides automated PR analysis and suggestions.

## Credit Repair Domain

**FCRA** - Fair Credit Reporting Act, federal law governing credit reporting and consumer rights.

**FACTA** - Fair and Accurate Credit Transactions Act, amendment to FCRA adding identity theft protections.

**PII** - Personally Identifiable Information, sensitive consumer data requiring special handling in credit systems.

**PCI-DSS** - Payment Card Industry Data Security Standard for secure payment processing.

## Git & Deployment

**Git Hooks** - Automated scripts that run at specific Git workflow points (pre-commit, commit-msg, etc.).

**Conventional Commits** - Standardized commit message format enabling automated changelog generation.

**GitHub Actions** - CI/CD platform for automated testing, building, and deployment workflows.

**MkDocs** - Static site generator used for this documentation site with Material Design theme.

## Testing & QA

**Jest** - JavaScript testing framework for unit and integration tests.

**Playwright** - End-to-end testing framework for web applications across multiple browsers.

**E2E Testing** - End-to-end testing that validates complete user workflows from start to finish.

**Test Coverage** - Metric measuring percentage of code executed during automated testing.

## Implementation Levels

**Level 1 (FREE)** - Basic code quality automation with ESLint, Prettier, and Git hooks.

**Level 2 (AI-Powered)** - Adds AI test generation with OpenAI integration and Qase management.

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
- [Cursor IDE Guidelines](enhanced-cursor-guidelines.md) - AI-powered development tips
- [Testing & Validation](TESTING-README.md) - Quality assurance processes

---

_Created by Damon DeCrescenzo, CTO - The Credit Pros_  
_Last Updated: August 4, 2025_
