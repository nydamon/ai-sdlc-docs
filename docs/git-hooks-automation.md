# Git Hooks Automation with Husky

## Overview
Automate code quality checks, AI formatting, and testing before code reaches the repository using Husky git hooks.

## Installation & Setup

### 1. Install Husky (Root Project)
```bash
# Install Husky and lint-staged
npm install --save-dev husky lint-staged

# Initialize Husky
npx husky install

# Add install script to package.json
npm pkg set scripts.prepare="husky install"
```

### 2. Project Structure Setup
```json
// package.json - Root level configuration
{
  "scripts": {
    "prepare": "husky install",
    "lint:all": "npm run lint:laravel && npm run lint:client && npm run lint:admin",
    "lint:laravel": "cd backend && ./vendor/bin/pint && ./vendor/bin/phpstan",
    "lint:client": "cd client-frontend && npm run lint && npm run type-check",
    "lint:admin": "cd admin-frontend && npm run lint",
    "test:all": "npm run test:laravel && npm run test:client && npm run test:admin",
    "test:laravel": "cd backend && ./vendor/bin/pest --parallel",
    "test:client": "cd client-frontend && npm run test:ci",
    "test:admin": "cd admin-frontend && npm run test:ci"
  },
  "lint-staged": {
    "backend/**/*.php": [
      "./backend/vendor/bin/pint",
      "git add"
    ],
    "client-frontend/**/*.{ts,tsx}": [
      "cd client-frontend && npm run lint:fix",
      "cd client-frontend && npm run format",
      "git add"
    ],
    "admin-frontend/**/*.{js,jsx}": [
      "cd admin-frontend && npm run lint:fix", 
      "cd admin-frontend && npm run format",
      "git add"
    ]
  }
}
```

## Git Hook Configurations

### Pre-Commit Hook
```bash
#!/usr/bin/env sh
# .husky/pre-commit

. "$(dirname -- "$0")/_/husky.sh"

echo "🔍 Running pre-commit checks..."

# Run lint-staged for automated fixes
npx lint-staged

# AI-powered code review
if command -v cursor >/dev/null 2>&1; then
    echo "🤖 Running AI code review..."
    # Trigger Cursor AI to review staged changes
    cursor --ai-review-staged 2>/dev/null || echo "AI review skipped"
fi

# GitGuardian secrets scan
if command -v ggshield >/dev/null 2>&1; then
    echo "🛡️ Scanning for secrets..."
    ggshield secret scan pre-commit
fi

# Run tests on affected areas
echo "🧪 Running focused tests..."

# Laravel tests (if PHP files changed)
if git diff --cached --name-only | grep -q "\.php$"; then
    echo "Testing Laravel backend..."
    cd backend && ./vendor/bin/pest --parallel --group=unit || exit 1
    cd ..
fi

# Client frontend tests (if TS files changed)
if git diff --cached --name-only | grep -q "client-frontend.*\.\(ts\|tsx\)$"; then
    echo "Testing TypeScript client..."
    cd client-frontend && npm run test:changed || exit 1
    cd ..
fi

# Admin frontend tests (if JS files changed)
if git diff --cached --name-only | grep -q "admin-frontend.*\.\(js\|jsx\)$"; then
    echo "Testing JavaScript admin..."
    cd admin-frontend && npm run test:changed || exit 1
    cd ..
fi

echo "✅ Pre-commit checks passed!"
```

### Commit Message Hook
```bash
#!/usr/bin/env sh
# .husky/commit-msg

. "$(dirname -- "$0")/_/husky.sh"

# Conventional commit enforcement
npx --no -- commitlint --edit $1

# AI-suggested commit message improvement
if command -v cursor >/dev/null 2>&1; then
    echo "🤖 AI commit message suggestions available in Cursor"
fi
```

### Pre-Push Hook
```bash
#!/usr/bin/env sh
# .husky/pre-push

. "$(dirname -- "$0")/_/husky.sh"

echo "🚀 Running pre-push validations..."

# Comprehensive test suite
echo "🧪 Running full test suite..."
npm run test:all || exit 1

# SonarQube analysis trigger
if [ -f "sonar-project.properties" ]; then
    echo "📊 Triggering SonarQube analysis..."
    # This would integrate with your SonarQube setup
    curl -X POST "$SONAR_WEBHOOK_URL" \
        -H "Authorization: Bearer $SONAR_TOKEN" \
        -d "project=current-branch" 2>/dev/null || echo "SonarQube trigger skipped"
fi

# Performance regression check
echo "⚡ Checking for performance regressions..."
if [ -d "client-frontend" ]; then
    cd client-frontend && npm run build && npm run lighthouse:ci || echo "Performance check skipped"
    cd ..
fi

echo "✅ Pre-push validations passed!"
```

## AI Integration Features

### Cursor AI Integration
```bash
#!/bin/bash
# scripts/ai-review.sh

echo "🤖 Running AI-powered code review..."

# Get staged files
STAGED_FILES=$(git diff --cached --name-only)

if [ -z "$STAGED_FILES" ]; then
    echo "No staged files for review"
    exit 0
fi

# AI review for each file type
for file in $STAGED_FILES; do
    case $file in
        *.php)
            echo "🔍 AI reviewing PHP file: $file"
            # Use AI prompt for Laravel code review
            cursor --ai-prompt "Review this Laravel code for security, performance, and best practices" "$file"
            ;;
        *.ts|*.tsx)
            echo "🔍 AI reviewing TypeScript file: $file"
            # Use AI prompt for TypeScript review
            cursor --ai-prompt "Review this TypeScript React code for type safety, performance, and accessibility" "$file"
            ;;
        *.js|*.jsx)
            echo "🔍 AI reviewing JavaScript file: $file"
            # Use AI prompt for JavaScript review
            cursor --ai-prompt "Review this JavaScript React code for best practices and potential issues" "$file"
            ;;
    esac
done
```

### Automated Test Generation
```bash
#!/bin/bash
# scripts/ai-test-generation.sh

echo "🧪 Generating tests with AI..."

# Find files without corresponding tests
find_untested_files() {
    local src_dir=$1
    local test_dir=$2
    local extension=$3
    
    find "$src_dir" -name "*.$extension" | while read -r file; do
        # Convert source file path to test file path
        test_file=$(echo "$file" | sed "s|$src_dir|$test_dir|" | sed "s|\.$extension|.test.$extension|")
        
        if [ ! -f "$test_file" ]; then
            echo "$file"
        fi
    done
}

# Generate tests for Laravel
if [ -d "backend" ]; then
    echo "Generating Pest PHP tests..."
    find_untested_files "backend/app" "backend/tests" "php" | while read -r file; do
        cursor --ai-prompt "Generate comprehensive Pest PHP tests for this Laravel code" "$file"
    done
fi

# Generate tests for TypeScript client
if [ -d "client-frontend/src" ]; then
    echo "Generating Vitest tests..."
    find_untested_files "client-frontend/src" "client-frontend/src" "ts" | while read -r file; do
        cursor --ai-prompt "Generate Vitest tests for this TypeScript React component with PostHog tracking" "$file"
    done
fi

# Generate tests for JavaScript admin
if [ -d "admin-frontend/src" ]; then
    echo "Generating Jest tests..."
    find_untested_files "admin-frontend/src" "admin-frontend/src" "js" | while read -r file; do
        cursor --ai-prompt "Generate Jest tests for this JavaScript React component" "$file"
    done
fi
```

## Configuration Files

### CommitLint Configuration
```javascript
// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature
        'fix',      // Bug fix
        'docs',     // Documentation
        'style',    // Code style changes
        'refactor', // Code refactoring
        'test',     // Adding tests
        'chore',    // Maintenance
        'perf',     // Performance improvements
        'ci',       // CI/CD changes
        'build',    // Build system changes
        'revert'    // Revert previous commit
      ]
    ],
    'scope-enum': [
      2,
      'always',
      [
        'backend',
        'client',
        'admin', 
        'config',
        'deps',
        'ai',
        'security'
      ]
    ],
    'subject-max-length': [2, 'always', 72],
    'body-max-line-length': [2, 'always', 100]
  }
};
```

### Enhanced Package.json Scripts
```json
{
  "scripts": {
    "commit": "git-cz",
    "commit:ai": "cursor --ai-commit",
    "lint:fix:all": "npm run lint:fix:laravel && npm run lint:fix:client && npm run lint:fix:admin",
    "lint:fix:laravel": "cd backend && ./vendor/bin/pint",
    "lint:fix:client": "cd client-frontend && npm run lint:fix && npm run format",
    "lint:fix:admin": "cd admin-frontend && npm run lint:fix && npm run format",
    "ai:review": "./scripts/ai-review.sh",
    "ai:tests": "./scripts/ai-test-generation.sh",
    "ai:commit-msg": "cursor --ai-prompt 'Generate a conventional commit message for these changes'",
    "validate:all": "npm run lint:all && npm run test:all",
    "hooks:install": "husky install && npm run hooks:setup",
    "hooks:setup": "npx husky add .husky/pre-commit 'npm run pre-commit' && npx husky add .husky/commit-msg 'npx commitlint --edit $1' && npx husky add .husky/pre-push 'npm run pre-push'"
  }
}
```

## Setup Instructions

### 1. Quick Setup
```bash
# Run this in your project root
npm install --save-dev husky lint-staged @commitlint/cli @commitlint/config-conventional

# Setup hooks
npm run hooks:install

# Test the setup
git add . && git commit -m "test: validate git hooks setup"
```

### 2. Team Onboarding
```bash
# Add to your README.md
echo "## Git Hooks Setup
Run \`npm install\` to automatically install git hooks.
All commits must follow conventional commit format.
AI code review and testing run automatically on commit." >> README.md
```

### 3. CI/CD Integration
```yaml
# .github/workflows/validate-hooks.yml
name: Validate Git Hooks
on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run validate:all
      - name: Validate commit message
        if: github.event_name == 'push'
        run: npx commitlint --from=HEAD~1 --to=HEAD
```

## Benefits

✅ **Immediate Quality Gates**: No bad code reaches the repository  
✅ **AI-Powered Reviews**: Automatic code review suggestions  
✅ **Automated Formatting**: Consistent code style without thinking  
✅ **Focused Testing**: Only test what changed, saving time  
✅ **Conventional Commits**: Clean, searchable commit history  
✅ **Security Scanning**: Automatic secrets detection  
✅ **Zero Configuration**: Works automatically after setup  

## Troubleshooting

### Skip Hooks (Emergency)
```bash
# Skip pre-commit (use sparingly)
git commit --no-verify -m "emergency: critical hotfix"

# Skip pre-push
git push --no-verify
```

### Debug Hook Issues
```bash
# Test individual hooks
.husky/pre-commit
.husky/commit-msg "feat: test commit message"
.husky/pre-push
```

---

**Implementation Time**: 2-3 hours  
**Team Training**: 30 minutes  
**Maintenance**: Near zero (self-managing)  

This gives you **instant automation wins** with your existing tooling while setting the foundation for more advanced AI integrations.