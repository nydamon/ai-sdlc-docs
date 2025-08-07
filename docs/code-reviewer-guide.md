# Code Reviewer Guide - AI-SDLC v2.8.1

## 🎯 Complete Code Review Workflow with AI-SDLC Tools

This guide provides step-by-step instructions for code reviewers to leverage AI-SDLC automation tools for efficient and thorough code reviews.

## 📋 Code Review Workflow

### 1. Pre-Review Automated Validation

**Step 1: Check automated quality gates**

```bash
# View PR status and checks
gh pr view <PR-number>
gh pr checks <PR-number>
```

**Required automated checks (must be green):**

- ✅ Linting (ESLint)
- ✅ Formatting (Prettier)
- ✅ Smart tests (only changed files)
- ✅ Coverage thresholds (80/80/70)
- ✅ E2E tests (on PRs only)
- ✅ Security scan (GitGuardian + security-scanner.js)
- ✅ Branch naming convention

**Step 2: Review test coverage changes**

```bash
# Check coverage diff in PR
gh pr diff --name-only | xargs npm run test:coverage --
```

### 2. AI-Assisted Code Review

**Use AI tools for initial analysis:**

```bash
# Get AI code review suggestions
./scripts-complex/qodo-pr-agent.js analyze <PR-number>

# Security-focused review
./scripts-complex/security-scanner.js quick
```

**AI review capabilities:**

- Code quality analysis
- Security vulnerability detection
- Test coverage gaps identification
- Credit repair compliance validation
- Performance impact assessment

### 3. Manual Review Focus Areas

**Since automation handles quality basics, focus on:**

#### Business Logic Review

- [ ] Credit calculation accuracy (scores capped at 850)
- [ ] FCRA/FACTA compliance implementation
- [ ] Consumer data protection patterns
- [ ] Error handling for credit repair workflows

#### Architecture Review

- [ ] Component design patterns
- [ ] API contract adherence
- [ ] Database query optimization
- [ ] State management patterns

#### Domain Expertise Review

- [ ] Credit repair industry requirements
- [ ] Regulatory compliance implementation
- [ ] Consumer protection measures
- [ ] Data security best practices

## 🔧 Review Tool Usage

### GitHub Integration

**Command-line PR review:**

```bash
# Checkout PR locally for testing
gh pr checkout <PR-number>

# Run full validation suite
npm run ci:test-fast

# Test E2E changes visually
npm run test:e2e-headed
```

### Test Quality Assessment

**Verify AI-generated tests are comprehensive:**

```bash
# Check what tests were generated
find tests/ -name "*.test.js" -newer $(git merge-base HEAD main)

# Validate test quality
npm run test:changed -- --reporter=verbose
```

**Test review checklist:**

- [ ] Tests cover happy path
- [ ] Tests cover error conditions
- [ ] Tests include credit repair edge cases
- [ ] E2E tests validate user workflows
- [ ] Compliance requirements tested

### Coverage Analysis

**Review coverage changes:**

```bash
# Generate coverage diff
npm run test:coverage -- --reporter=json > coverage-new.json
git checkout main
npm run test:coverage -- --reporter=json > coverage-main.json
diff coverage-main.json coverage-new.json
```

**Coverage review criteria:**

- [ ] Overall coverage maintained or improved
- [ ] No critical paths left uncovered
- [ ] New code has adequate test coverage
- [ ] Credit repair logic fully tested

## 📊 Automated Review Insights

### Security Review

**Automated security validation:**

```bash
# Comprehensive security scan
./scripts-complex/security-scanner.js scan

# Check GitGuardian status
echo "GitGuardian status in PR checks"
```

**Security review checklist (automated):**

- [ ] No secrets in code
- [ ] No PII exposure
- [ ] Proper encryption implementation
- [ ] Secure authentication patterns

### Performance Review

**Performance impact analysis:**

```bash
# Run performance monitoring
./ai-sdlc perf monitor

# Compare performance metrics
./ai-sdlc perf report
```

**Performance review areas:**

- [ ] Database query efficiency
- [ ] API response times
- [ ] Frontend rendering performance
- [ ] Credit report generation speed

## 🚨 Review Decision Framework

### Approval Criteria

**Automatic approval indicators:**

- ✅ All automated checks pass
- ✅ Coverage thresholds met (80/80/70)
- ✅ E2E tests pass with no failures
- ✅ Security scan clean
- ✅ AI code review suggests approval

**Manual verification required:**

- Business logic correctness
- Credit repair compliance
- User experience impact
- Integration considerations

### Rejection Criteria

**Immediate rejection (automated):**

- ❌ Any required check fails
- ❌ Coverage below thresholds
- ❌ Security vulnerabilities detected
- ❌ E2E test failures
- ❌ Branch naming violations

**Manual rejection reasons:**

- Incorrect business logic
- Missing compliance requirements
- Poor user experience
- Architectural concerns

## 🔍 Deep Dive Review Process

### 1. Code Quality Assessment

**Automated quality covered:**

- Linting (ESLint)
- Formatting (Prettier)
- TypeScript compliance
- Import/export validation

**Manual quality focus:**

- Variable naming clarity
- Function complexity
- Code organization
- Comment quality for complex logic

### 2. Test Strategy Review

**Validate test approach:**

```bash
# Review test files for PR
git diff --name-only main...HEAD | grep -E "\.(test|spec)\."

# Check test patterns
grep -r "describe\|it\|test" tests/ | grep -f <(git diff --name-only)
```

**Test strategy checklist:**

- [ ] Unit tests for business logic
- [ ] Integration tests for API endpoints
- [ ] E2E tests for user workflows
- [ ] Edge case coverage
- [ ] Error condition testing

### 3. Credit Repair Domain Review

**Domain-specific validation:**

- [ ] Credit score calculations accurate
- [ ] FCRA Section 604 compliance
- [ ] Consumer consent handling
- [ ] PII data protection
- [ ] Dispute workflow correctness

**AI-generated compliance tests:**

```bash
# Check for compliance test generation
grep -r "FCRA\|FACTA\|credit.*compliance" tests/
```

## 📈 Review Metrics and Reporting

### Review Efficiency Metrics

**Track review performance:**

- Time to first review (target: < 2 hours)
- Automated vs manual issues found
- Review accuracy (bugs caught vs missed)
- Approval/rejection rates

### Quality Metrics

**Code quality indicators:**

- Test coverage percentage
- Code complexity scores
- Security vulnerability count
- Performance impact measurement

## 🔄 Review Workflow Integration

### PR Comment Templates

**For approval with minor suggestions:**

```markdown
✅ **Approved with suggestions**

Automated checks: All passed ✅
Coverage: X% (above threshold) ✅
Security: Clean ✅
E2E tests: Passed ✅

**Minor suggestions:**

- Consider refactoring X for better readability
- Add documentation for complex credit calculation

**AI Review Summary:** [Include AI suggestions if relevant]
```

**For changes requested:**

```markdown
🔄 **Changes requested**

**Required changes:**

- [ ] Fix failing E2E test for credit dispute flow
- [ ] Increase coverage for error handling (currently X%, need 80%)
- [ ] Address security concern in PII handling

**Automated check status:**

- Tests: ❌ (requirement)
- Coverage: ❌ (below threshold)
- Security: ✅

Please address required changes and re-request review.
```

### Post-Review Actions

**After approval:**

```bash
# Optional: Monitor deployment success
gh pr merge <PR-number>
# Check CI/CD pipeline status
```

**After rejection:**

- Clear feedback provided
- Specific action items listed
- Resources/documentation linked
- Available for follow-up questions

## 🎯 Credit Repair Specific Review

### Compliance Code Review

**FCRA compliance checklist:**

- [ ] Permissible purpose validation
- [ ] Consumer notification requirements
- [ ] Accurate reporting standards
- [ ] Dispute resolution processes

**FACTA compliance checklist:**

- [ ] Identity verification processes
- [ ] Fraud alert implementation
- [ ] Credit monitoring features
- [ ] Secure disposal requirements

### Data Security Review

**PII protection validation:**

- [ ] Encryption at rest and in transit
- [ ] Access control implementation
- [ ] Audit logging for sensitive operations
- [ ] Data retention policy compliance

## 🔗 Reviewer Resources

### Documentation Links

- [Developer Workflow Guide](developer-workflow-guide.md) - Understanding development process
- [QA Team Workflow Guide](qa-team-workflow-guide.md) - QA integration
- [Scripts Reference](scripts-reference.md) - Tool command reference
- [Glossary](glossary.md) - Technical terminology
- [Troubleshooting Guide](troubleshooting-simple.md) - Common issues

### Emergency Procedures

**When automation fails:**

1. Check GitHub Actions logs
2. Run local validation: `./ai-sdlc doctor`
3. Escalate to development team if needed
4. Document automation issues for improvement

## 📊 Review Success Indicators

**Effective review outcomes:**

- 95%+ automated check pass rate
- < 2 hour average review time
- 90%+ first-time approval rate (when automated checks pass)
- Zero security issues in production
- 98%+ credit repair compliance validation

**Review efficiency with AI-SDLC:**

- 70% reduction in manual review time
- 95% automated issue detection
- 90% faster feedback loop
- 85% fewer follow-up reviews needed
