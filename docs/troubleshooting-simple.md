# Troubleshooting Guide

## Common Issues

### 🔌 MCP Server Issues (NEW)

**Error: "MCP servers not working with Claude Code"**

```bash
# Validate MCP configuration
npm run mcp:validate

# Check validation report
cat MCP-VALIDATION-REPORT.md

# Re-add to Claude Code
claude mcp add --config ./.mcp.json
```

**Error: "Environment variables missing"**

```bash
# Add required variables to .env file:
echo "GITHUB_TOKEN=ghp_your_token_here" >> .env
echo "OPENAI_API_KEY=sk-your_key_here" >> .env
echo "DATABASE_URL=postgresql://localhost:5432/database" >> .env
```

**Error: "MCP package not found in registry"**

This is expected for some packages. The system automatically falls back to custom implementations.

```bash
# Check MCP setup status
npm run mcp:status

# Re-run setup if needed
npm run mcp:setup
```

**Error: "Playwright browsers not installed"**

```bash
# Install Playwright browsers manually
npx playwright install

# Or re-run MCP setup
npm run mcp:setup
```

### Setup Script Fails

**Error: "Node.js is required"**

```bash
# Install Node.js from nodejs.org
node --version  # Should show 18+
```

**Error: "Must be run in a Git repository"**

```bash
git init
./auto-setup.sh    # WORKING - Correct script name
```

**Error: "npm install fails"**

```bash
# Clear npm cache and try again
npm cache clean --force
rm -rf node_modules package-lock.json
./auto-setup.sh
```

### Git Hooks Not Working

**Commits aren't being formatted**

```bash
# Check if hooks exist and are executable
ls -la .husky/
chmod +x .husky/pre-commit
```

**Error: "husky command not found"**

```bash
# Reinstall husky
npm install --save-dev husky
npx husky init
```

### Linting Issues

**Error: "ESLint configuration missing"**

```bash
# Check if config exists
ls -la .eslintrc*
# If missing, run setup again
./auto-setup.sh
```

**Too many linting errors**

```bash
# Fix automatically
npm run lint:fix
# Or format code
npm run format
```

### Status Checks Fail

**Check what's wrong:**

```bash
./ai-sdlc status     # Shows current status
./ai-sdlc validate   # Detailed validation
```

## AI Testing Issues (Level 2+)

### Vitest Environment Error

**Error: "jsdom environment not found"**

```bash
# Install the missing jsdom package (should already be installed)
npm install --save-dev jsdom
# Verify vitest.config.js has environment: 'jsdom' configured
```

### API Key Issues

**Error: "OpenAI API key not found"**

```bash
# Check .env file exists and has correct keys
ls -la .env
# Verify API key format (starts with sk-)
cat .env | grep OPENAI_API_KEY
```

### Credit Calculation Test Failures

**Tests fail with credit score > 850**

```bash
# This is expected - AI found a real bug!
# Credit scores should be capped at 850
# Update your credit calculation function:
# return Math.min(calculatedScore, 850);
```

### PHP Pint Errors During Commit

**Error: "PHP Pint failed on template files"**

```bash
# Update lint-staged in package.json to exclude template files
# This fix is already included in the latest version
```

## 🔍 SonarCloud Validation Issues (NEW)

### SonarCloud Token Not Found

**Error: "SONAR_TOKEN not found in environment"**

```bash
# Get token from SonarCloud My Account → Security
export SONAR_TOKEN=your_sonarcloud_api_token

# Or add to .env file permanently
echo "SONAR_TOKEN=your_token_here" >> .env
```

### Repository Not Found in SonarCloud

**Error: "Project not found in SonarCloud"**

**Solution**: Repository needs to be configured in SonarCloud first:

1. Log into [SonarCloud.io](https://sonarcloud.io)
2. Import your TheCreditPros repository
3. Copy the generated project key
4. Run validation again

### Quality Gate Failures

**Warning: "Quality gate not passing"**

**Common fixes**:

```bash
# 1. Increase test coverage
npm run test:coverage

# 2. Fix code duplication
./ai-sdlc sonar-templates  # Use standardized configs

# 3. Apply security rule fixes
# Review SonarCloud project → Issues tab
# Apply suggested fixes or use AI Code Fix
```

### AI Code Fix Not Working

**Issue: "AI Code Fix shows as disabled"**

**Solution**: Enable in GitHub repository settings:

1. Go to repository Settings → Code security and analysis
2. Enable "Code scanning" if disabled
3. Ensure SonarCloud GitHub Actions workflow is present:
   ```bash
   # Copy workflow template
   ./ai-sdlc sonar-templates
   cp sonarcloud-templates/sonarcloud-workflow.yml .github/workflows/
   ```

### Low Compliance Score

**Issue: "Repository compliance below 80%"**

**Systematic approach**:

1. **Run validation with details**:

   ```bash
   ./ai-sdlc sonar-validate
   # Review generated report: sonarcloud-validation-report.json
   ```

2. **Apply recommended fixes**:
   - **Quality Gate**: Configure "Sonar way" in SonarCloud project settings
   - **Coverage**: Add tests to reach minimum threshold
   - **Security**: Enable JavaScript/TypeScript security rules
   - **Duplication**: Refactor repeated code blocks

3. **Use configuration templates**:
   ```bash
   ./ai-sdlc sonar-templates
   # Apply templates to each repository
   ```

### Repository-Specific Issues

**customer-frontend-portal**:

- **Expected Threshold**: 85% coverage (customer-facing)
- **Common Issues**: React component testing gaps
- **Fix**: `./ai-sdlc test-gen src/components/`

**portal2-refactor**:

- **Expected Threshold**: 80% coverage (backend)
- **Common Issues**: Database integration testing
- **Fix**: Add integration tests for API endpoints

**portal2-admin-refactor**:

- **Expected Threshold**: 75% coverage (internal)
- **Common Issues**: Admin workflow testing
- **Fix**: Add admin permission tests

### GitHub Actions Workflow Issues

**Error: "SonarCloud GitHub Action fails"**

**Checklist**:

1. **Verify secrets are set**:
   - Repository Settings → Secrets → `SONAR_TOKEN`
   - `GITHUB_TOKEN` should be automatic

2. **Check workflow file**:

   ```yaml
   # .github/workflows/sonarcloud.yml should include:
   - name: SonarCloud Scan
     uses: SonarSource/sonarcloud-github-action@master
     env:
       GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
       SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
   ```

3. **Verify sonar-project.properties**:
   ```properties
   sonar.organization=thecreditpros
   sonar.projectKey=thecreditpros_REPOSITORY_NAME
   ```

### API Rate Limits

**Warning: "SonarCloud API rate limit exceeded"**

**Solution**:

- SonarCloud has generous free tier limits
- Wait 1 hour and retry validation
- For frequent validation, consider upgrading SonarCloud plan

**Reset everything:**

```bash
# Remove current setup
rm -rf .husky .eslintrc* .prettierrc commitlint.config.js

# Run setup again
./auto-setup.sh
```

## NEW: Qase AIDEN Integration Issues

### AIDEN Commands Not Working

**Error: "QASE_API_TOKEN not found"**

This is normal! AIDEN works in demo mode without API tokens.

```bash
# Test AIDEN in demo mode (works without tokens)
./ai-sdlc generate-from-requirements "Test basic functionality"

# For full AIDEN integration, set environment variable
export QASE_API_TOKEN="your-qase-token"
```

**Error: "Qase AIDEN integration script not found"**

```bash
# Check if scripts exist
ls -la scripts-complex/qase-aiden-integration.js
ls -la scripts-complex/playwright-auto-healing.js

# If missing, ensure you're in the AI-SDLC root directory
pwd  # Should show ai_sdlc directory
```

### Auto-Healing Tests Issues

**Tests failing after UI changes**

Auto-healing should adapt automatically, but if not:

```bash
# Regenerate tests with updated selectors
./ai-sdlc heal-and-generate

# Check auto-healing statistics
node scripts-complex/playwright-auto-healing.js demo
```

## Getting Help

1. **Check status**: `ai-sdlc status`
2. **Run validation**: `ai-sdlc validate`
3. **Check logs**: Look at error messages in terminal
4. **Reset and retry**: Remove `.husky` folder and run `./auto-setup.sh` again

## Manual Fixes

**Manually create git hooks:**

```bash
npx husky init
echo "npx lint-staged" > .husky/pre-commit
chmod +x .husky/pre-commit
```

**Manually test linting:**

```bash
npx eslint . --ext .js,.jsx,.ts,.tsx
npx prettier --check .
```

**Skip hooks temporarily:**

```bash
git commit --no-verify -m "skip hooks"
```
