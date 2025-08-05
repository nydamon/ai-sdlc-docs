# Quick Start Guide - Enhanced AI-SDLC

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

```bash
node --version  # Should be 18+
git status      # Should show a Git repo
```

### Step 2: Run Basic Setup (3 minutes)

```bash
./auto-setup.sh    # WORKING - Correct script name
```

The script will:

- Install ESLint, Prettier, Husky
- Set up git hooks
- Create basic configuration files
- Test everything works

### Step 3: Test Basic Setup (1 minute)

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
- `QASE_PROJECT_CODE` - Your Qase project code

**Optional premium:**

- `CODIUM_API_KEY` - Get from [Codium AI](https://www.codium.ai/pricing/) ($19-49/month)

### Step 2: Initialize AI Test Generation (3 minutes)

```bash
./ai-sdlc test-init    # Initialize test framework
```

This creates:

- Jest configuration for unit tests (VALIDATED)
- Playwright configuration for E2E tests (WORKING)
- Test directories and sample files
- API integration validation

### Step 3: Generate Tests for Your Codebase (5 minutes)

```bash
# Generate tests for all files (NEW METHOD - VALIDATED)
./ai-sdlc test-gen test-sample/demo.js

# Generate E2E tests (WORKING)
node scripts-complex/ai-e2e-generator.js test-sample/demo.js

# NEW: Qase AIDEN Integration
./ai-sdlc generate-from-requirements "Test demo functionality"

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

### Step 1: GitHub PR Automation (10 minutes)

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
    "test:unit": "jest",
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
