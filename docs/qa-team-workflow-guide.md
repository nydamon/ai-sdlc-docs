# QA Team Workflow Guide - AI-SDLC v2.8.1

## 🎯 Complete QA Testing Workflow with AI-SDLC Automation

This guide provides step-by-step instructions for QA engineers to leverage AI-SDLC tools for comprehensive testing automation and quality assurance.

## 📋 QA Daily Workflow

### 1. Pull Request Testing

**Step 1: Validate PR has automated tests**

```bash
# Check PR test status
gh pr view <PR-number>
gh pr checks <PR-number>
```

**Step 2: Run comprehensive test validation**

```bash
# Full test suite with coverage
npm run test:coverage

# E2E tests (automatically run on PRs)
npm run test:e2e

# Security validation
./scripts-complex/security-scanner.js quick
```

**Line-by-line PR validation:**

1. Check GitHub Actions status (green checkmarks required)
2. Verify E2E tests ran automatically (only on PRs)
3. Confirm coverage meets thresholds (80/80/70)
4. Review test failure screenshots if any red X's
5. Approve only if all automated checks pass

### 2. Manual Testing Coordination

**Before manual testing, validate automation coverage:**

```bash
# Check which areas have test coverage
npm run test:coverage -- --reporter=html
open coverage/index.html
```

**Generate missing tests for uncovered areas:**

```bash
# AI-generate tests for specific functionality
./ai-sdlc generate-from-requirements "Test credit dispute submission with required documentation validation"

# Generate E2E tests for user workflows
./ai-sdlc generate-from-requirements "End-to-end credit report request with FCRA compliance checks"
```

### 3. Credit Repair Domain Testing

**FCRA/FACTA Compliance Validation:**

```bash
# Generate compliance-specific tests
./ai-sdlc generate-from-requirements "Validate FCRA Section 604 permissible purpose disclosure"
./ai-sdlc generate-from-requirements "Test secure PII data handling in credit reports"
./ai-sdlc generate-from-requirements "Validate credit score calculation with FICO 8 algorithm"
```

**Expected automated coverage:**

- Credit score capping at 850
- PII data encryption validation
- Consumer consent verification
- Permissible purpose compliance
- Dispute submission workflows

### 4. Test Environment Management

**Set up test environment:**

```bash
# Initialize AI test generation
./ai-sdlc test-init

# Validate environment setup
./ai-sdlc doctor

# Run environment-specific tests
npm run test:e2e -- --project=staging
```

**Database testing (existing database integration):**

```bash
# Test against existing PostgreSQL database
./scripts-complex/postgres-automation.sh test

# Validate database connections
./ai-sdlc validate
```

## 🔧 QA-Specific Tool Usage

### Automated Test Generation for QA

**Command-line test creation:**

```bash
# Generate tests from natural language requirements
./ai-sdlc generate-from-requirements "User should be able to update their credit monitoring preferences"

# Convert manual test cases to automated
./ai-sdlc convert-manual-to-auto <qase-test-case-id>

# Auto-heal existing broken tests
./ai-sdlc heal-and-generate
```

**Batch test generation:**

```bash
# Generate comprehensive test coverage
./ai-sdlc auto-complete-testing
```

### Visual Testing and Debugging

**E2E test debugging workflow:**

```bash
# Run E2E with visual debugging
npm run test:e2e-headed

# Check failure artifacts
ls test-results/
open test-results/screenshots/
open test-results/videos/
```

**Line-by-line E2E debugging:**

1. Run `npm run test:e2e-headed`
2. Watch browser execute tests in real-time
3. If test fails, check `test-results/` folder
4. Review screenshots for UI issues
5. Watch videos to understand failure sequence
6. Report bugs with visual evidence attached

### Test Coverage Analysis

**Coverage validation workflow:**

```bash
# Generate detailed coverage report
npm run test:coverage -- --reporter=lcov --reporter=html

# View interactive coverage report
open coverage/index.html
```

**Coverage quality gates (automatic enforcement):**

- Lines: 80% minimum (enforced)
- Functions: 80% minimum (enforced)
- Branches: 70% minimum (enforced)

**When coverage is insufficient:**

1. Identify uncovered areas in HTML report
2. Generate missing tests: `./ai-sdlc test-gen <uncovered-file>`
3. Verify new tests increase coverage
4. Repeat until thresholds met

### Performance Testing Integration

**Performance monitoring:**

```bash
# Run performance analysis
./ai-sdlc perf monitor

# Generate performance report
./ai-sdlc perf report
```

**Performance validation checklist:**

- [ ] Page load times under 3 seconds
- [ ] API response times under 500ms
- [ ] Credit report generation under 2 seconds
- [ ] Database queries optimized (check logs)

## 📊 QA Metrics and Reporting

### Test Automation Metrics

**Daily metrics to track:**

```bash
# Test execution summary
npm run test:coverage -- --reporter=json > test-metrics.json

# E2E test results
playwright show-report
```

**Key metrics:**

- Test coverage percentage (target: 80/80/70)
- E2E test pass rate (target: 98%+)
- Test execution time (should be 60% faster with smart testing)
- Bug detection rate (target: 92%+)

### Automated Reporting

**Generate QA reports:**

```bash
# Comprehensive test report
./scripts-complex/dev-utils.js generate-test-report

# Send report to MS Teams (if configured)
./scripts-complex/webhook-manager.js send-test-report test-results.json
```

## 🚨 QA Issue Resolution Workflow

### Test Failures

**When automated tests fail:**

1. **Check GitHub Actions logs:**

   ```bash
   gh run list
   gh run view <run-id>
   ```

2. **Analyze failure type:**
   - Unit test failure: Code logic issue
   - E2E test failure: UI/UX issue
   - Coverage failure: Insufficient test coverage

3. **Gather evidence:**

   ```bash
   # For E2E failures
   ls test-results/screenshots/
   ls test-results/videos/
   ```

4. **Create bug report with:**
   - Screenshot/video evidence
   - Console logs
   - Steps to reproduce
   - Expected vs actual behavior

### Auto-Healing Test Maintenance

**When UI changes break E2E tests:**

```bash
# Trigger auto-healing
./ai-sdlc heal-and-generate

# Check healing results
grep -r "auto-healing" tests/e2e/
```

**Auto-healing features:**

- Smart selector fallback
- Dynamic element detection
- Automatic test maintenance
- Self-healing statistics reporting

## 🔄 Integration with Development Workflow

### PR Review Process

**QA validation checklist for PRs:**

- [ ] All GitHub Actions checks pass
- [ ] E2E tests executed (automatic on PRs)
- [ ] Coverage meets thresholds (80/80/70)
- [ ] No security vulnerabilities detected
- [ ] Credit repair compliance tests pass

**PR approval workflow:**

1. Check automated test status
2. Review test coverage report
3. Validate E2E test results
4. Confirm security scan passed
5. Approve if all automated checks pass

### Release Testing

**Pre-release validation:**

```bash
# Full test suite
npm run test:coverage

# E2E regression testing
npm run test:e2e

# Security audit
./scripts-complex/security-scanner.js scan

# Performance validation
./ai-sdlc perf monitor
```

## 📈 Credit Repair Specific QA

### Compliance Testing

**FCRA compliance validation:**

- Permissible purpose verification
- Consumer consent documentation
- Accurate credit reporting
- Dispute process compliance

**FACTA compliance validation:**

- Identity verification processes
- Secure document handling
- Fraud alert management
- Credit monitoring capabilities

### Data Security Testing

**PII protection validation:**

```bash
# Generate security-focused tests
./ai-sdlc generate-from-requirements "Validate PII data encryption in credit reports"
./ai-sdlc generate-from-requirements "Test secure customer authentication flow"
```

## 🔗 QA Team Resources

### Documentation Links

- [Developer Workflow Guide](developer-workflow-guide.md) - Understanding dev process
- [Code Reviewer Guide](code-reviewer-guide.md) - Review process integration
- [Troubleshooting Guide](troubleshooting-simple.md) - Common issue resolution
- [Scripts Reference](scripts-reference.md) - Complete command documentation
- [Testing Documentation](TESTING-README.md) - Comprehensive testing guide

### Emergency Contacts

**When automation fails:**

1. Check [Troubleshooting Guide](troubleshooting-simple.md)
2. Run `./ai-sdlc doctor` for diagnostics
3. Contact development team with error logs
4. Document issues for framework improvement

## 🎯 QA Success Metrics

**Target outcomes with AI-SDLC:**

- 80% reduction in manual QA time
- 92% automated bug detection rate
- 98%+ E2E test reliability
- 60% faster test execution
- 100% FCRA/FACTA compliance coverage
