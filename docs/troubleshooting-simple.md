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
./setup.sh
```

**Error: "npm install fails"**

```bash
# Clear npm cache and try again
npm cache clean --force
rm -rf node_modules package-lock.json
./setup.sh
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
./setup.sh
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
ai-sdlc status     # Shows current status
ai-sdlc validate   # Detailed validation
```

**Reset everything:**

```bash
# Remove current setup
rm -rf .husky .eslintrc* .prettierrc commitlint.config.js

# Run setup again
./setup.sh
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
