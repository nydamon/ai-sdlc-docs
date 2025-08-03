# Troubleshooting Guide

## Common Issues

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

### Jest Environment Error

**Error: "jest-environment-jsdom cannot be found"**

```bash
# Install the missing Jest environment
npm install --save-dev jest-environment-jsdom
# Update jest.config.js to use 'node' environment
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

**Reset everything:**

```bash
# Remove current setup
rm -rf .husky .eslintrc* .prettierrc commitlint.config.js

# Run setup again
./auto-setup.sh
```

## Getting Help

1. **Check status**: `ai-sdlc status`
2. **Run validation**: `ai-sdlc validate`
3. **Check logs**: Look at error messages in terminal
4. **Reset and retry**: Remove `.husky` folder and run `./setup.sh` again

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
