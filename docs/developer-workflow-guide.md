# Developer Workflow Guide - AI-SDLC {{ extra.version.framework }}

## 🎯 Complete Developer Workflow with AI-SDLC Tools

This guide provides step-by-step instructions for developers to use the AI-SDLC framework effectively in daily development work.

## 📋 Daily Development Workflow

### 1. Starting a New Feature

**Step 1: Create and switch to feature branch**

```bash
git checkout -b feature/your-feature-name
```

**Step 2: Verify AI-SDLC is working**

```bash
./ai-sdlc status
```

_Expected output_: Green checkmarks for setup status

**Step 3: Generate initial tests (if working on new functionality)**

```bash
# For a specific file
./ai-sdlc test-gen src/components/YourComponent.js

# For all files in a directory
./ai-sdlc test-gen src/features/new-feature/
```

### 2. Development Phase - Smart Testing

**While coding, use smart test execution:**

```bash
# Test only files you've changed (60% faster)
npm run test:changed
```

**For real-time feedback during development:**

```bash
# Watch mode with live coverage
npm run test:watch-coverage
```

**Line-by-line usage:**

1. Open terminal in project root
2. Run `npm run test:watch-coverage`
3. Code normally - tests run automatically when you save
4. Watch coverage percentage in terminal
5. Green = above threshold (80/80/70), Red = below threshold

### 3. E2E Test Development

**When working on user-facing features:**

```bash
# Generate E2E tests for specific project
./ai-sdlc generate-from-requirements "User should be able to submit credit dispute with required documentation" --project=TCP

# For admin features, use admin project
./ai-sdlc generate-from-requirements "Admin should view dispute analytics dashboard" --project=PCU
```

**For debugging E2E tests:**

```bash
# Run with browser visible (for debugging)
npm run test:e2e-headed
```

**Line-by-line E2E workflow:**

1. Write your feature code first
2. Run `./ai-sdlc generate-from-requirements "description"`
3. Check `tests/e2e/` for generated test file
4. Run `npm run test:e2e-headed` to see test execute
5. If test fails, screenshots/videos saved to `test-results/`

### 4. Pre-Commit Workflow

**Before committing, ensure quality:**

```bash
# Run full quality check
npm run ci:test-fast
```

**This command runs:**

1. ESLint (code quality)
2. Prettier (formatting)
3. Smart test execution (only changed files)
4. Coverage threshold validation

**Commit with proper format:**

```bash
git add .
git commit -m "feat: add credit dispute validation with FCRA compliance"
```

**Branch naming conventions (enforced by git hooks):**

- `feature/description-here`
- `fix/bug-description`
- `hotfix/critical-issue`
- `chore/maintenance-task`
- `docs/documentation-update`
- `test/test-improvements`

### 5. Credit Repair Specific Development

**For FCRA/FACTA compliance features:**

```bash
# Generate compliance-aware tests
./ai-sdlc generate-from-requirements "Validate FCRA Section 604 permissible purpose disclosure"
```

**Credit score validation:**

```bash
# Test credit score calculations with edge cases
./ai-sdlc test-gen src/utils/creditScoreCalculator.js
```

**Expected AI-generated test patterns:**

- Credit score capping at 850
- FCRA compliance validation
- PII data encryption checks
- Consumer-friendly error messaging

## 🔧 Tool-Specific Instructions

### Using AI Test Generation

**Command syntax:**

```bash
./ai-sdlc test-gen <file-or-directory>
```

**Examples:**

```bash
# Single file
./ai-sdlc test-gen src/components/CreditReport.jsx

# Multiple files
./ai-sdlc test-gen src/services/

# All project files
./ai-sdlc test-gen all
```

**What gets generated:**

- Unit tests for functions
- Component tests for React/Vue components
- Integration tests for API endpoints
- Credit repair compliance tests

### Using Smart NPM Scripts

**`npm run test:changed`** - Only test modified files

- Use when: Active development, quick validation
- Saves time: 60% faster than full test suite
- Coverage: Only reports on changed files

**`npm run test:watch-coverage`** - Live coverage monitoring

- Use when: TDD development, coverage optimization
- Shows: Real-time coverage percentages
- Alerts: When coverage drops below thresholds

**`npm run test:e2e-headed`** - Visual E2E debugging

- Use when: E2E test development, failure investigation
- Shows: Browser window with test execution
- Captures: Screenshots and videos on failure

**`npm run ci:test-fast`** - Optimized CI pipeline

- Use when: Pre-commit validation, PR preparation
- Runs: Linting + smart testing + coverage
- Fast: Optimized for CI/CD performance

### Coverage Thresholds (Automatic Enforcement)

**Current thresholds:**

- Lines: 80%
- Functions: 80%
- Branches: 70%

**When tests fail due to coverage:**

1. Run `npm run test:watch-coverage`
2. Identify uncovered lines (shown in red)
3. Add tests for uncovered code
4. Watch coverage increase in real-time

**Coverage bypass (emergency only):**

```bash
# Skip coverage check (not recommended)
npm test -- --coverage=false
```

## 🚨 Troubleshooting Common Issues

### Test Generation Fails

**Problem:** `./ai-sdlc test-gen` returns error
**Solution:**

1. Check OpenAI API key: `echo $OPENAI_API_KEY`
2. Verify internet connection
3. Run `./ai-sdlc doctor` for diagnosis

### Git Hooks Blocking Commits

**Problem:** Commit rejected by pre-commit hooks
**Solutions:**

1. Branch naming: Ensure format like `feature/description`
2. Linting errors: Run `npm run lint:fix`
3. Test failures: Run `npm run test:changed`
4. Coverage below threshold: Add tests until above 80/80/70

### E2E Tests Failing

**Problem:** E2E tests fail consistently
**Solutions:**

1. Check screenshots in `test-results/`
2. Run `npm run test:e2e-headed` to see visually
3. Verify application is running on port 3000
4. Check auto-healing logs for selector updates

## 📊 Performance Metrics

**Expected improvements with AI-SDLC:**

- Test execution time: 60% faster with smart testing
- Development velocity: 40% faster feedback loops
- Bug detection: 92% automated detection rate
- Code coverage: 100% achievable with AI generation

## 🔗 Related Documentation

- [Quick Start Guide](quick-start-simple.md) - Initial setup
- [Troubleshooting](troubleshooting-simple.md) - Common issues
- [Scripts Reference](scripts-reference.md) - Complete command list
- [Glossary](glossary.md) - Tool definitions
