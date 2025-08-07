# Quick Start Guide

## ⚡ **Single Command Setup (5 Minutes)**

### **Step 1: Run Auto-Setup**

```bash
./auto-setup.sh
```

**That's it!** This command automatically:
- ✅ Detects your project type (Laravel/React/Node.js)
- ✅ Installs all required tools and dependencies
- ✅ Configures git hooks with automatic E2E test generation
- ✅ Sets up quality gates and code formatting
- ✅ Creates working configurations for your stack

### **Step 2: Verify Installation**

```bash
./ai-sdlc status
```

✅ You should see: "All core components functional"

## 🔄 **Automatic E2E Tests for Front-End Changes**

**Once setup is complete, tests generate automatically:**

```bash
# Developer workflow example
echo "console.log('updated')" >> src/components/Button.tsx
git add src/components/Button.tsx
git commit -m "feat: add loading state to button"
# → Playwright E2E tests automatically generated and run in CI/CD
```

## ⚙️ **Configure API Keys (Required for AI Features)**

**Step 3: Add Your API Keys**

```bash
cp .env.example .env
# Edit .env file with your keys:
```

**Required:**
- `OPENAI_API_KEY=sk-your-key-here` ($20-50/month)
- `GITHUB_TOKEN=ghp-your-token-here` (free)

**Optional:**
- `QASE_API_KEY=your-qase-key` (existing account)
- `DATABASE_URL=postgresql://...` (for database features)

**Step 4: Test AI Generation**

```bash
./ai-sdlc test-gen test-sample/demo.js
# Should generate comprehensive test suite automatically
```

## 🧪 **What You Get: Complete AI Automation**

**Automatic Features:**
- ✅ **E2E tests generate automatically** when you modify front-end files
- ✅ **100% test coverage** - AI writes comprehensive test suites
- ✅ **Smart test execution** - Only test changed files (60% faster CI)
- ✅ **Quality gates** - Build fails if coverage drops below 80%
- ✅ **FCRA/FACTA compliance** - Credit repair patterns built into AI
- ✅ **Self-healing tests** - Automatically adapt when UI changes

**Useful Commands:**

```bash
npm test                    # Run all tests
npm run test:coverage       # Check coverage report
npm run test:e2e            # Run E2E tests
./ai-sdlc status           # Check framework health
```

## 🎯 Repository-Specific Implementation

**For TheCreditPros Development Team:**

**For each repository:**

```bash
# Replace 'your-repo' with actual repository name
cd your-repo
git clone https://github.com/nydamon/ai-sdlc.git .ai-sdlc
.ai-sdlc/auto-setup.sh
```

**Recommended order:**
1. customer-frontend-portal (highest impact)
2. portal2-refactor 
3. portal2-admin-refactor

## 📋 **Prerequisites**

Make sure you have:
- Node.js 18+ installed (`node --version`)
- Git repository (`git init` if needed)
- OpenAI API key ready ($20-50/month)
- GitHub token (free from GitHub settings)

## 🚀 **That's It! Start Developing**

The framework now runs automatically:

```bash
# Normal development - everything happens automatically
echo "const newFeature = true;" >> src/components/Feature.tsx
git add .
git commit -m "feat: add new feature"
# → Code gets formatted, linted, and E2E tests generated automatically
```
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
# Test only changed files (smart testing in v3.0.0)
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

## 🔍 **Troubleshooting**

**Setup issues?**
```bash
./ai-sdlc validate    # Shows what's wrong
```

**Tests not generating?**
- Check API keys in .env file
- Verify: `./ai-sdlc status`

**Git hooks not working?**
```bash
chmod +x .husky/pre-commit
```

**Need help?** See [Troubleshooting Guide](troubleshooting-simple.md)

---

## 💼 **For Teams**

**Adding team members:**
- Each person runs `./auto-setup.sh` in their local copy
- Everyone gets identical automation setup
- No configuration drift between developers

**Team consistency:**
- Same code formatting rules
- Same test generation patterns
- Same commit message standards

---

## 📊 **Expected Results**

**Week 1:**
- 80% reduction in code review time
- Automatic test generation working
- Zero manual formatting needed

**Month 1:**
- 100% test coverage achieved
- 80% reduction in manual QA time
- $70,200+ annual ROI validated

**Ongoing:**
- Zero manual E2E test writing
- Automatic compliance validation
- Self-maintaining test suites

**🎉 You're Done! The framework is now running automatically on every commit.**

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

---

## 📚 **Next Steps**

- **Developers**: Start developing - tests generate automatically
- **Managers**: See [Implementation Guide](implementation-guide-managers.md) for rollout strategy  
- **Issues**: Check [Troubleshooting Guide](troubleshooting-simple.md)

**Questions?** The framework is designed to be completely transparent. You should notice:
- Code gets formatted automatically on commit
- E2E tests appear when you change front-end files
- Build fails if test coverage drops
- Everything just works!
