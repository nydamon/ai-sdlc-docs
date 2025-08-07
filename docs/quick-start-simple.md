# Quick Start Guide - AI-SDLC {{ extra.version.framework }}

## 🚀 New in {{ extra.version.framework }}: {{ extra.version.platform }} (TCP Optimized)

**MAJOR COST-EFFICIENT AI CODE REVIEW:**

- **{{ extra.version.savings }}/year savings** vs Qodo Pro ({{ extra.version.cost }}/month vs $1,500/month)
- **TCP Credit Repair Compliance**: FCRA/FACTA specific validation rules
- **PII Pattern Detection**: Automatic detection and encryption validation
- **Cost-Optimized Models**: GPT-4o-mini primary, smart fallback routing
- **Custom TCP Labels**: Credit repair domain-specific categorization
- **Open-Source Freedom**: Full customization and control

### Open-Source PR-Agent Setup (NEW)

**One-Command Setup:**

```bash
# Automated TCP-optimized setup
curl -sSL https://raw.githubusercontent.com/nydamon/ai-sdlc/main/scripts/setup-pr-agent.sh | bash

# Or manual setup
cp .ai-sdlc/.pr_agent.toml .
cp .ai-sdlc/.github/workflows/pr-agent-optimized.yml .github/workflows/pr-agent.yml
```

**Features Enabled:**

- Cost-optimized AI model routing (90% cost reduction)
- FCRA/FACTA compliance validation with custom rules
- PII detection for credit repair domain (SSN, credit scores, etc.)
- TCP-specific labels and automated PR descriptions
- Smart workflow that adapts to change types

## 🆕 Previous Version: Claude Code + Cline Enterprise Platform

**MAJOR TOOLING UPDATE:**

- **Claude Code**: Terminal-native AI with enterprise policy management
- **Cline Teams**: IDE-integrated AI with team coordination (200 seats)
- **Combined Benefits**: Complete development lifecycle coverage + centralized control

### Previous Version Features (Retained):

**Smart Testing & Enhanced QA:**

**Immediate Benefits:**

- ✅ **Smart test execution** - Only test changed files (60% faster CI)
- ✅ **Coverage quality gates** - 80% lines, 80% functions, 70% branches enforced
- ✅ **Enhanced E2E debugging** - Screenshots + videos on failure
- ✅ **Optimized GitHub Actions** - E2E only runs on PRs

**New NPM Scripts:**

```bash
npm run test:changed        # Test only files changed since last commit
npm run test:watch-coverage # Live coverage monitoring during development
npm run test:e2e-headed     # Run E2E tests with browser UI (debugging)
npm run ci:test-fast        # Optimized script for CI/CD pipelines
```

## 🎯 Repository-Specific Implementation

**For TheCreditPros Development Team:**

### Customer Frontend Portal

```bash
cd customer-frontend-portal
git clone https://github.com/nydamon/ai-sdlc.git .ai-sdlc
.ai-sdlc/auto-setup.sh
```

### Portal 2 Refactor

```bash
cd portal2-refactor
git clone https://github.com/nydamon/ai-sdlc.git .ai-sdlc
.ai-sdlc/auto-setup.sh
```

### Portal 2 Admin Refactor

```bash
cd portal2-admin-refactor
git clone https://github.com/nydamon/ai-sdlc.git .ai-sdlc
.ai-sdlc/auto-setup.sh
```

## Implementation Levels

**Choose your implementation level:**

- **🚀 Level 1 (Free)**: Basic automation only
- **🤖 Level 2 (Premium)**: AI-powered test generation + integrations
- **🏢 Level 3 (Enterprise)**: Full QA automation + compliance

---

## Level 1: Basic Setup (5 minutes)

### Step 1: Prerequisites (1 minute)

Make sure you have:

- Node.js 18+ installed
- A Git repository (`git init` if needed)
- SonarCloud account access (for TheCreditPros repositories)

```bash
node --version  # Should be 18+
git status      # Should show a Git repo
```

### Step 2: Run Modern Framework Setup (3 minutes)

```bash
# Auto-detects your tech stack and configures accordingly
./auto-setup.sh --detect-framework

# Or specify your stack explicitly
./auto-setup.sh --react --vite --typescript-strict
./auto-setup.sh --vue3 --composition-api
./auto-setup.sh --laravel --pest
```

The script will:

- **Auto-detect** your framework (React, Vue, Laravel, etc.)
- **Install modern tooling** (Vite, Vitest, TypeScript strict, etc.)
- **Configure framework-specific** ESLint, Prettier, testing setups
- **Optimize for your stack** with intelligent defaults
- **Set up git hooks** with framework-aware validation
- **Test everything works** with your specific configuration

### Step 3: Test Basic Setup (1 minute)

Test the new smart testing features:

```bash
# Test only changed files (new in v2.8.1)
npm run test:changed

# Watch coverage in real-time
npm run test:watch-coverage

# Run E2E with visual debugging
npm run test:e2e-headed
```

Make a test commit:

```bash
echo "console.log('test')" > test.js
git add test.js
git commit -m "test: verify setup works"
```

You should see:

- Code gets formatted automatically
- Linting runs and passes
- Commit message follows convention

**✅ Level 1 Complete!** You now have automated code quality.

---

## Level 2: AI-Powered Test Generation (15 minutes)

### Step 1: Configure API Keys (5 minutes)

Copy and configure environment file:

```bash
cp .env.example .env
# Edit .env with your API keys
```

**Required API keys:**

- `OPENAI_API_KEY` - Get from [OpenAI](https://platform.openai.com/api-keys) ($20-50/month)
- `QASE_API_KEY` - Get from your [Qase account](https://app.qase.io/user/api/token) (existing)

**Dual Qase Project Configuration:**

- `QASE_CLIENT_PROJECT_CODE=TCP` - Client Frontend (Customer Portal)
- `QASE_ADMIN_PROJECT_CODE=PCU` - Admin Frontend (Internal Dashboard)
- `QASE_TARGET_PROJECT=TCP` - Default project for test generation (usually client)

- `SONAR_TOKEN` - Get from [SonarCloud My Account → Security](https://sonarcloud.io/account/security) (free)

**New Platform Requirements:**

- **Claude Code**: Install from https://docs.anthropic.com/en/docs/claude-code ($240/user/year)
- **Cline Teams**: Setup organization at https://cline.bot/teams ($300/user/year)

**Optional premium:**

- `CODIUM_API_KEY` - Get from [Codium AI](https://www.codium.ai/pricing/) ($19-49/month)
- `GITHUB_TOKEN` - Get from [GitHub Settings → Developer settings](https://github.com/settings/tokens) (free, for AI Code Fix validation)

### Step 2: Initialize AI Test Generation (3 minutes)

```bash
./ai-sdlc test-init    # Initialize test framework
```

This creates:

- Vitest configuration for unit tests (VALIDATED)
- Playwright configuration for E2E tests (WORKING)
- Test directories and sample files
- API integration validation

### Step 3: Generate Tests for Your Codebase (5 minutes)

```bash
# Modern framework-aware test generation
./ai-sdlc test-gen test-sample/demo.tsx --framework=react-vite
./ai-sdlc test-gen src/components/ --typescript-strict --vitest
./ai-sdlc test-gen stores/userStore.ts --state-management=zustand

# Generate E2E tests with modern tooling
./ai-sdlc test-gen-e2e --playwright --typescript src/pages/
node scripts-complex/ai-e2e-generator.js --modern-patterns

# NEW: Qase AIDEN with framework detection
./ai-sdlc generate-from-requirements "Test demo functionality" --auto-detect

# Direct script access for advanced users
node scripts-complex/ai-test-generator.js

# Legacy method (still works)
./ai-sdlc test-gen all
./ai-sdlc test-gen src/components/LoginForm.tsx
```

### Step 4: Verify AI-Generated Tests (2 minutes)

```bash
# Run the generated tests
npm test

# Check test coverage
npm run test:coverage

# View generated tests
ls -la __tests__/
```

**✅ Level 2 Complete!** You now have AI-powered test generation with Qase integration.

---

## Level 3: Enterprise QA Automation (30 minutes)

### Step 1: SonarCloud Validation (10 minutes)

**Validate existing SonarCloud configurations:**

```bash
# Set your SonarCloud token
export SONAR_TOKEN=your_sonarcloud_token

# Validate all TheCreditPros repositories
./ai-sdlc sonar-validate
```

**Generate standardized templates:**

```bash
# Generate configuration templates
./ai-sdlc sonar-templates

# Templates created in ./sonarcloud-templates/:
# - sonar-project.properties
# - sonarcloud-workflow.yml
# - package-scripts-template.json
```

### Step 2: GitHub PR Automation (10 minutes)

Add GitHub token to `.env`:

```bash
# Add to .env file
GITHUB_TOKEN=ghp_your-token-here
```

Initialize PR automation:

```bash
./ai-sdlc pr-init
```

### Step 2: Configure Playwright E2E Tests (15 minutes)

```bash
# Install Playwright (if not already installed)
npm install -D @playwright/test
npx playwright install

# Generate E2E tests for critical flows (VALIDATED METHODS)
./ai-sdlc generate-from-requirements "Test workflow instances modal functionality"
node scripts-complex/ai-e2e-generator.js

# Legacy method (still works)
./ai-sdlc test-gen-e2e src/pages/
```

### Step 3: Set Up Continuous Testing (5 minutes)

Add to your `package.json`:

```json
{
  "scripts": {
    "test:unit": "vitest run",
    "test:e2e": "playwright test",
    "test:full": "npm run test:unit && npm run test:e2e",
    "test:ci": "npm run test:full -- --reporter=json"
  }
}
```

**✅ Level 3 Complete!** Full enterprise QA automation is now active.

## Daily Usage

Just develop normally. The tools run automatically when you:

- `git commit` - Runs formatting and linting
- `git push` - Everything's already checked

## Commands

```bash
ai-sdlc status     # Check if setup is working
ai-sdlc validate   # Run validation checks manually
npm run lint       # Check code quality manually
npm run format     # Format code manually
```

## Next Steps

- Start developing - everything's automated
- Add team members by having them run `./auto-setup.sh`
- Check `ai-sdlc status` if you have issues

## Troubleshooting

**Git hooks not running?**

```bash
ai-sdlc validate   # Shows what's wrong
```

**Want to skip hooks once?**

```bash
git commit --no-verify -m "message"
```

**Remove everything?**

```bash
rm -rf .husky
npm uninstall husky lint-staged eslint prettier
```
