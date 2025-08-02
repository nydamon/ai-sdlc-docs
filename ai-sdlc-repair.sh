#!/bin/bash
# ai-sdlc-repair.sh - Auto-repair script for configuration drift detection and fixes

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Logging functions
log_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
log_success() { echo -e "${GREEN}✅ $1${NC}"; }
log_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
log_error() { echo -e "${RED}❌ $1${NC}"; }
log_fix() { echo -e "${GREEN}🔧 $1${NC}"; }

# Counters
TOTAL_FIXES=0
APPLIED_FIXES=0

# Banner
show_banner() {
    echo -e "${BLUE}"
    echo "╔════════════════════════════════════════════════════════════════╗"
    echo "║                  AI-SDLC Auto-Repair Tool                     ║"
    echo "║            Configuration Drift Detection & Fixes              ║"
    echo "╚════════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
}

# Apply fix and track
apply_fix() {
    local description="$1"
    local fix_command="$2"
    
    TOTAL_FIXES=$((TOTAL_FIXES + 1))
    log_info "Applying fix: $description"
    
    if eval "$fix_command" >/dev/null 2>&1; then
        APPLIED_FIXES=$((APPLIED_FIXES + 1))
        log_fix "$description - FIXED"
        return 0
    else
        log_error "$description - FAILED"
        return 1
    fi
}

# Repair Git hooks
repair_git_hooks() {
    log_info "Checking Git hooks configuration..."
    
    if [[ ! -d ".husky" ]]; then
        apply_fix "Initialize Husky" "npx husky init"
    fi
    
    if [[ ! -f ".husky/pre-commit" ]]; then
        apply_fix "Create pre-commit hook" "echo 'npx lint-staged' > .husky/pre-commit && chmod +x .husky/pre-commit"
    fi
    
    if [[ ! -f ".husky/commit-msg" ]]; then
        apply_fix "Create commit-msg hook" "echo 'npx commitlint --edit \$1' > .husky/commit-msg && chmod +x .husky/commit-msg"
    fi
    
    # Fix package.json scripts if missing
    if [[ -f "package.json" ]] && ! grep -q "\"prepare\"" package.json; then
        apply_fix "Add Husky prepare script" "npm pkg set scripts.prepare='husky install'"
    fi
}

# Repair ESLint configuration
repair_eslint() {
    log_info "Checking ESLint configuration..."
    
    if [[ ! -f ".eslintrc.js" ]] && [[ ! -f ".eslintrc.json" ]] && [[ ! -f "eslint.config.js" ]]; then
        apply_fix "Create ESLint configuration" "cat > .eslintrc.js << 'EOF'
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {},
};
EOF"
    fi
    
    # Check if ESLint is installed
    if ! npm list eslint >/dev/null 2>&1; then
        apply_fix "Install ESLint" "npm install --save-dev eslint"
    fi
}

# Repair Prettier configuration
repair_prettier() {
    log_info "Checking Prettier configuration..."
    
    if [[ ! -f ".prettierrc" ]] && [[ ! -f ".prettierrc.json" ]] && [[ ! -f "prettier.config.js" ]]; then
        apply_fix "Create Prettier configuration" "cat > .prettierrc << 'EOF'
{
  \"semi\": true,
  \"trailingComma\": \"es5\",
  \"singleQuote\": true,
  \"printWidth\": 80,
  \"tabWidth\": 2
}
EOF"
    fi
    
    # Check if Prettier is installed
    if ! npm list prettier >/dev/null 2>&1; then
        apply_fix "Install Prettier" "npm install --save-dev prettier"
    fi
}

# Repair lint-staged configuration
repair_lint_staged() {
    log_info "Checking lint-staged configuration..."
    
    if [[ -f "package.json" ]] && ! grep -q "lint-staged" package.json; then
        apply_fix "Add lint-staged configuration" "
        if command -v jq >/dev/null 2>&1; then
            jq '.\"lint-staged\" = {
                \"*.{js,jsx,ts,tsx}\": [\"eslint --fix\", \"prettier --write\"],
                \"*.php\": [\"./vendor/bin/pint\"],
                \"*.{json,md,yml,yaml}\": [\"prettier --write\"]
            }' package.json > package.tmp && mv package.tmp package.json
        else
            node -e \"
            const fs = require('fs');
            const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
            pkg['lint-staged'] = {
                '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
                '*.php': ['./vendor/bin/pint'],
                '*.{json,md,yml,yaml}': ['prettier --write']
            };
            fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
            \"
        fi"
    fi
    
    # Check if lint-staged is installed
    if ! npm list lint-staged >/dev/null 2>&1; then
        apply_fix "Install lint-staged" "npm install --save-dev lint-staged"
    fi
}

# Repair commitlint configuration
repair_commitlint() {
    log_info "Checking commitlint configuration..."
    
    if [[ ! -f "commitlint.config.js" ]] && [[ ! -f ".commitlintrc.json" ]]; then
        apply_fix "Create commitlint configuration" "cat > commitlint.config.js << 'EOF'
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test'
      ]
    ]
  }
};
EOF"
    fi
    
    # Check if commitlint is installed
    if ! npm list @commitlint/cli >/dev/null 2>&1; then
        apply_fix "Install commitlint" "npm install --save-dev @commitlint/cli @commitlint/config-conventional"
    fi
}

# Repair VS Code configuration
repair_vscode() {
    log_info "Checking VS Code configuration..."
    
    if [[ ! -d ".vscode" ]]; then
        apply_fix "Create .vscode directory" "mkdir -p .vscode"
    fi
    
    if [[ ! -f ".vscode/settings.json" ]]; then
        apply_fix "Create VS Code settings" "cat > .vscode/settings.json << 'EOF'
{
  \"editor.formatOnSave\": true,
  \"editor.codeActionsOnSave\": {
    \"source.fixAll.eslint\": \"explicit\",
    \"source.organizeImports\": \"explicit\"
  },
  \"editor.defaultFormatter\": \"esbenp.prettier-vscode\",
  \"files.autoSave\": \"onFocusChange\",
  \"typescript.preferences.importModuleSpecifier\": \"relative\"
}
EOF"
    fi
    
    if [[ ! -f ".vscode/extensions.json" ]]; then
        apply_fix "Create VS Code extensions recommendations" "cat > .vscode/extensions.json << 'EOF'
{
  \"recommendations\": [
    \"esbenp.prettier-vscode\",
    \"dbaeumer.vscode-eslint\",
    \"bradlc.vscode-tailwindcss\",
    \"ms-playwright.playwright\",
    \"vitest.explorer\"
  ]
}
EOF"
    fi
}

# Repair EditorConfig
repair_editorconfig() {
    log_info "Checking EditorConfig..."
    
    if [[ ! -f ".editorconfig" ]]; then
        apply_fix "Create EditorConfig" "cat > .editorconfig << 'EOF'
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
indent_style = space
indent_size = 2

[*.md]
trim_trailing_whitespace = false

[*.{yml,yaml}]
indent_size = 2
EOF"
    fi
}

# Repair CI/CD configuration
repair_cicd() {
    log_info "Checking CI/CD configuration..."
    
    if [[ ! -d ".github/workflows" ]]; then
        apply_fix "Create GitHub workflows directory" "mkdir -p .github/workflows"
    fi
    
    if [[ ! -f ".github/workflows/test.yml" ]] && [[ ! -f ".github/workflows/tests.yml" ]] && [[ ! -f ".github/workflows/ci.yml" ]]; then
        apply_fix "Create basic test workflow" "cat > .github/workflows/test.yml << 'EOF'
name: Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linting
      run: npm run lint
    
    - name: Run tests
      run: npm test
EOF"
    fi
}

# Repair package.json scripts
repair_package_scripts() {
    log_info "Checking package.json scripts..."
    
    if [[ -f "package.json" ]]; then
        # Add common scripts if missing
        local missing_scripts=()
        
        if ! grep -q "\"lint\"" package.json; then
            missing_scripts+=("lint")
        fi
        
        if ! grep -q "\"format\"" package.json; then
            missing_scripts+=("format")
        fi
        
        if ! grep -q "\"test\"" package.json; then
            missing_scripts+=("test")
        fi
        
        if [[ ${#missing_scripts[@]} -gt 0 ]]; then
            apply_fix "Add missing package.json scripts" "
            node -e \"
            const fs = require('fs');
            const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
            pkg.scripts = pkg.scripts || {};
            
            if (!pkg.scripts.lint) pkg.scripts.lint = 'eslint . --ext js,jsx,ts,tsx';
            if (!pkg.scripts.format) pkg.scripts.format = 'prettier --write .';
            if (!pkg.scripts.test) pkg.scripts.test = 'echo \\\"Add your test command here\\\"';
            
            fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
            \"
            "
        fi
    fi
}

# Repair Laravel-specific configurations
repair_laravel() {
    if [[ -f "composer.json" ]] && grep -q "laravel/framework" composer.json; then
        log_info "Checking Laravel-specific configurations..."
        
        # Check for Pest installation
        if ! composer show pestphp/pest >/dev/null 2>&1; then
            apply_fix "Install Pest PHP testing framework" "composer require --dev pestphp/pest pestphp/pest-plugin-laravel"
        fi
        
        # Check for Laravel Pint
        if ! composer show laravel/pint >/dev/null 2>&1; then
            apply_fix "Install Laravel Pint code formatter" "composer require --dev laravel/pint"
        fi
        
        # Check for Larastan
        if ! composer show nunomaduro/larastan >/dev/null 2>&1; then
            apply_fix "Install Larastan static analysis" "composer require --dev nunomaduro/larastan"
        fi
        
        # Add composer scripts if missing
        if [[ -f "composer.json" ]] && ! grep -q "\"test\"" composer.json; then
            apply_fix "Add Laravel composer scripts" "
            if command -v jq >/dev/null 2>&1; then
                jq '.scripts += {
                    \"test\": \"./vendor/bin/pest\",
                    \"test:coverage\": \"./vendor/bin/pest --coverage\",
                    \"lint\": \"./vendor/bin/pint\",
                    \"analyze\": \"./vendor/bin/phpstan analyse\",
                    \"quality\": \"composer lint && composer analyze && composer test\"
                }' composer.json > composer.tmp && mv composer.tmp composer.json
            fi
            "
        fi
    fi
}

# Repair TypeScript configurations
repair_typescript() {
    # Check for TypeScript projects
    if [[ -f "package.json" ]] && grep -q '"typescript"' package.json; then
        log_info "Checking TypeScript configurations..."
        
        # Check for tsconfig.json
        if [[ ! -f "tsconfig.json" ]]; then
            apply_fix "Create basic TypeScript configuration" "cat > tsconfig.json << 'EOF'
{
  \"compilerOptions\": {
    \"target\": \"ES2020\",
    \"lib\": [\"ES2020\", \"DOM\", \"DOM.Iterable\"],
    \"module\": \"ESNext\",
    \"skipLibCheck\": true,
    \"moduleResolution\": \"bundler\",
    \"allowImportingTsExtensions\": true,
    \"resolveJsonModule\": true,
    \"isolatedModules\": true,
    \"noEmit\": true,
    \"jsx\": \"react-jsx\",
    \"strict\": true,
    \"noUnusedLocals\": true,
    \"noUnusedParameters\": true,
    \"noFallthroughCasesInSwitch\": true
  },
  \"include\": [\"src\"],
  \"references\": [{ \"path\": \"./tsconfig.node.json\" }]
}
EOF"
        fi
        
        # Check for Vitest if it's a testing setup
        if ! npm list vitest >/dev/null 2>&1 && grep -q '"react"' package.json; then
            apply_fix "Install Vitest testing framework" "npm install --save-dev vitest @testing-library/react @testing-library/jest-dom"
        fi
    fi
}

# Fix file permissions
repair_permissions() {
    log_info "Checking file permissions..."
    
    # Make hook files executable
    if [[ -f ".husky/pre-commit" ]] && [[ ! -x ".husky/pre-commit" ]]; then
        apply_fix "Fix pre-commit hook permissions" "chmod +x .husky/pre-commit"
    fi
    
    if [[ -f ".husky/commit-msg" ]] && [[ ! -x ".husky/commit-msg" ]]; then
        apply_fix "Fix commit-msg hook permissions" "chmod +x .husky/commit-msg"
    fi
    
    # Make setup scripts executable
    if [[ -f "ai-sdlc-setup.sh" ]] && [[ ! -x "ai-sdlc-setup.sh" ]]; then
        apply_fix "Fix setup script permissions" "chmod +x ai-sdlc-setup.sh"
    fi
    
    if [[ -f "validate-ai-sdlc.sh" ]] && [[ ! -x "validate-ai-sdlc.sh" ]]; then
        apply_fix "Fix validation script permissions" "chmod +x validate-ai-sdlc.sh"
    fi
}

# Generate repair report
generate_repair_report() {
    local success_rate=0
    if [[ $TOTAL_FIXES -gt 0 ]]; then
        success_rate=$((APPLIED_FIXES * 100 / TOTAL_FIXES))
    fi
    
    cat > AI_SDLC_REPAIR_REPORT.md << EOF
# AI-SDLC Auto-Repair Report

**Generated:** $(date)
**Repair Success Rate:** $success_rate% ($APPLIED_FIXES/$TOTAL_FIXES fixes applied)

## 🔧 Repair Summary

- **Total Issues Detected:** $TOTAL_FIXES
- **Successfully Fixed:** $APPLIED_FIXES
- **Failed Fixes:** $((TOTAL_FIXES - APPLIED_FIXES))

## 🎯 Repair Status

$(if [[ $success_rate -eq 100 ]]; then
    echo "🟢 **PERFECT** - All detected issues have been automatically repaired!"
elif [[ $success_rate -ge 80 ]]; then
    echo "🟡 **GOOD** - Most issues fixed, minor manual intervention may be needed"
elif [[ $success_rate -ge 50 ]]; then
    echo "🟠 **PARTIAL** - Some issues remain, please review failed fixes"
else
    echo "🔴 **NEEDS ATTENTION** - Multiple repair failures, manual intervention required"
fi)

## 🚀 Next Steps

1. **Review any failed fixes** and apply them manually
2. **Run validation script** to verify repairs: \`./validate-ai-sdlc.sh\`
3. **Test the setup** by making a commit to verify git hooks
4. **Consider running the full setup script** if many issues persist

## 🛠️ Manual Fix Commands

If any automatic repairs failed, try these manual commands:

### Install missing dependencies:
\`\`\`bash
npm install --save-dev husky lint-staged eslint prettier @commitlint/cli @commitlint/config-conventional
\`\`\`

### Reinitialize git hooks:
\`\`\`bash
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
npx husky add .husky/commit-msg "npx commitlint --edit \$1"
\`\`\`

### For Laravel projects:
\`\`\`bash
composer require --dev pestphp/pest laravel/pint nunomaduro/larastan
\`\`\`

---
*Run \`./ai-sdlc-repair.sh\` again after manual fixes to re-check.*
EOF

    log_success "Repair report generated: AI_SDLC_REPAIR_REPORT.md"
}

# Main execution
main() {
    show_banner
    
    log_info "Starting configuration drift detection and repair..."
    
    # Ensure we're in a project directory
    if [[ ! -f "package.json" ]] && [[ ! -f "composer.json" ]]; then
        log_error "No package.json or composer.json found. Are you in a project directory?"
        exit 1
    fi
    
    # Run all repair checks
    repair_git_hooks
    repair_eslint
    repair_prettier
    repair_lint_staged
    repair_commitlint
    repair_vscode
    repair_editorconfig
    repair_cicd
    repair_package_scripts
    repair_laravel
    repair_typescript
    repair_permissions
    
    # Generate report
    generate_repair_report
    
    echo -e "\n${BLUE}📊 Repair Summary${NC}"
    echo "Total fixes attempted: $TOTAL_FIXES"
    echo -e "Successfully applied: ${GREEN}$APPLIED_FIXES${NC}"
    echo -e "Failed fixes: ${RED}$((TOTAL_FIXES - APPLIED_FIXES))${NC}"
    
    if [[ $APPLIED_FIXES -eq $TOTAL_FIXES ]]; then
        echo -e "\n${GREEN}🎉 All configuration issues have been automatically repaired!${NC}"
        echo -e "${GREEN}✨ Your AI-SDLC setup should now be fully functional.${NC}"
    elif [[ $APPLIED_FIXES -gt 0 ]]; then
        echo -e "\n${YELLOW}⚠️  Some fixes were applied, but manual intervention may be needed.${NC}"
        echo -e "${BLUE}📋 Check AI_SDLC_REPAIR_REPORT.md for details.${NC}"
    else
        echo -e "\n${RED}❌ No fixes could be applied automatically.${NC}"
        echo -e "${YELLOW}Please review the requirements and try running the setup script instead.${NC}"
    fi
    
    echo -e "\n${BLUE}🔍 Next: Run './validate-ai-sdlc.sh' to verify repairs${NC}"
}

main "$@"