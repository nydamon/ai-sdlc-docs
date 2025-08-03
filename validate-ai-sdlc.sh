#!/bin/bash
# validate-ai-sdlc.sh - Comprehensive validation script

set -e

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Counters
TOTAL_CHECKS=0
PASSED_CHECKS=0
FAILED_CHECKS=0

# Logging
log_check() {
    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
    echo -e "${BLUE}🔍 Checking: $1${NC}"
}

log_pass() {
    PASSED_CHECKS=$((PASSED_CHECKS + 1))
    echo -e "${GREEN}  ✅ $1${NC}"
}

log_fail() {
    FAILED_CHECKS=$((FAILED_CHECKS + 1))
    echo -e "${RED}  ❌ $1${NC}"
}

log_warn() {
    echo -e "${YELLOW}  ⚠️  $1${NC}"
}

# Validation functions
validate_prerequisites() {
    echo -e "${BLUE}📋 Validating Prerequisites${NC}"
    
    log_check "Node.js version"
    if command -v node >/dev/null 2>&1; then
        local node_version=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
        if [[ $node_version -ge 18 ]]; then
            log_pass "Node.js v$(node --version | cut -d'v' -f2) (>=18 required)"
        else
            log_fail "Node.js v$(node --version | cut -d'v' -f2) (>=18 required)"
        fi
    else
        log_fail "Node.js not found"
    fi
    
    log_check "npm availability"
    if command -v npm >/dev/null 2>&1; then
        log_pass "npm v$(npm --version)"
    else
        log_fail "npm not found"
    fi
    
    log_check "Git availability"
    if command -v git >/dev/null 2>&1; then
        log_pass "Git v$(git --version | cut -d' ' -f3)"
    else
        log_fail "Git not found"
    fi
    
    # PHP check for Laravel projects
    if [[ -f "composer.json" ]]; then
        log_check "PHP version"
        if command -v php >/dev/null 2>&1; then
            local php_version=$(php --version | head -n1 | cut -d' ' -f2 | cut -d'.' -f1,2)
            if [[ $(echo "$php_version >= 8.3" | bc -l 2>/dev/null || echo "0") -eq 1 ]]; then
                log_pass "PHP v$php_version (>=8.3 required)"
            else
                log_fail "PHP v$php_version (>=8.3 required)"
            fi
        else
            log_fail "PHP not found"
        fi
        
        log_check "Composer availability"
        if command -v composer >/dev/null 2>&1; then
            log_pass "Composer v$(composer --version | cut -d' ' -f3)"
        else
            log_fail "Composer not found"
        fi
    fi
}

validate_project_structure() {
    echo -e "\n${BLUE}🏗️  Validating Project Structure${NC}"
    
    log_check "Git repository"
    if [[ -d ".git" ]]; then
        log_pass "Git repository initialized"
    else
        log_fail "Not a Git repository"
    fi
    
    log_check "Package.json"
    if [[ -f "package.json" ]]; then
        log_pass "package.json found"
    else
        log_fail "package.json not found"
    fi
    
    # Laravel structure
    if [[ -f "composer.json" ]]; then
        log_check "Laravel structure"
        if [[ -f "artisan" && -d "app" && -d "config" ]]; then
            log_pass "Laravel structure valid"
        else
            log_fail "Laravel structure incomplete"
        fi
    fi
    
    # Frontend structures
    if [[ -d "client-frontend" ]]; then
        log_check "TypeScript client frontend"
        if [[ -f "client-frontend/package.json" ]]; then
            log_pass "Client frontend structure found"
        else
            log_fail "Client frontend package.json missing"
        fi
    fi
    
    if [[ -d "admin-frontend" ]]; then
        log_check "JavaScript admin frontend"
        if [[ -f "admin-frontend/package.json" ]]; then
            log_pass "Admin frontend structure found"
        else
            log_fail "Admin frontend package.json missing"
        fi
    fi
}

validate_ide_configuration() {
    echo -e "\n${BLUE}🛠️  Validating IDE Configuration${NC}"
    
    log_check "VS Code settings"
    if [[ -f ".vscode/settings.json" ]]; then
        log_pass "VS Code settings configured"
    else
        log_warn "VS Code settings not found"
    fi
    
    log_check "VS Code extensions"
    if [[ -f ".vscode/extensions.json" ]]; then
        log_pass "VS Code extensions defined"
    else
        log_warn "VS Code extensions not defined"
    fi
    
    log_check "Cursor configuration"
    if [[ -f ".cursorrc.json" ]]; then
        log_pass "Cursor configuration found"
    else
        log_warn "Cursor configuration not found"
    fi
    
    log_check "EditorConfig"
    if [[ -f ".editorconfig" ]]; then
        log_pass "EditorConfig found"
    else
        log_warn "EditorConfig not found"
    fi
}

validate_git_hooks() {
    echo -e "\n${BLUE}🪝 Validating Git Hooks${NC}"
    
    log_check "Husky installation"
    if [[ -d ".husky" ]]; then
        log_pass "Husky directory found"
    else
        log_fail "Husky not installed"
    fi
    
    log_check "Pre-commit hook"
    if [[ -f ".husky/pre-commit" ]]; then
        log_pass "Pre-commit hook configured"
    else
        log_fail "Pre-commit hook missing"
    fi
    
    log_check "Commit message hook"
    if [[ -f ".husky/commit-msg" ]]; then
        log_pass "Commit message hook configured"
    else
        log_fail "Commit message hook missing"
    fi
    
    log_check "Lint-staged configuration"
    if grep -q "lint-staged" package.json 2>/dev/null; then
        log_pass "Lint-staged configured"
    else
        log_fail "Lint-staged not configured"
    fi
    
    log_check "Commitlint configuration"
    if [[ -f "commitlint.config.js" ]] || [[ -f ".commitlintrc.json" ]]; then
        log_pass "Commitlint configured"
    else
        log_fail "Commitlint configuration missing"
    fi
}

validate_testing_framework() {
    echo -e "\n${BLUE}🧪 Validating Testing Framework${NC}"
    
    # Laravel tests
    if [[ -f "composer.json" ]]; then
        log_check "Pest PHP installation"
        if composer show pestphp/pest >/dev/null 2>&1; then
            log_pass "Pest PHP installed"
        else
            log_fail "Pest PHP not installed"
        fi
        
        log_check "Laravel test directory"
        if [[ -d "tests" ]]; then
            log_pass "Tests directory found"
        else
            log_fail "Tests directory missing"
        fi
        
        log_check "Pest configuration"
        if [[ -f "tests/Pest.php" ]] || [[ -f "pest.json" ]]; then
            log_pass "Pest configuration found"
        else
            log_warn "Pest configuration not found"
        fi
    fi
    
    # Frontend tests
    for frontend_dir in "client-frontend" "admin-frontend" "."; do
        if [[ -f "$frontend_dir/package.json" ]]; then
            cd "$frontend_dir" 2>/dev/null || continue
            
            log_check "Testing framework ($frontend_dir)"
            if grep -q '"vitest"' package.json; then
                log_pass "Vitest configured"
            elif grep -q '"jest"' package.json; then
                log_pass "Jest configured"
            else
                log_fail "No testing framework found"
            fi
            
            log_check "Testing library ($frontend_dir)"
            if grep -q '@testing-library/react' package.json; then
                log_pass "React Testing Library installed"
            else
                log_warn "React Testing Library not found"
            fi
            
            cd - >/dev/null 2>&1 || true
        fi
    done
    
    # Playwright
    log_check "Playwright installation"
    if command -v npx >/dev/null 2>&1 && npx playwright --version >/dev/null 2>&1; then
        log_pass "Playwright installed"
    else
        log_fail "Playwright not installed"
    fi
    
    log_check "Playwright configuration"
    if [[ -f "playwright.config.ts" ]] || [[ -f "playwright.config.js" ]]; then
        log_pass "Playwright configuration found"
    else
        log_warn "Playwright configuration not found"
    fi
}

validate_quality_tools() {
    echo -e "\n${BLUE}🎯 Validating Quality Tools${NC}"
    
    log_check "ESLint configuration"
    if [[ -f ".eslintrc.js" ]] || [[ -f ".eslintrc.json" ]] || [[ -f "eslint.config.js" ]]; then
        log_pass "ESLint configured"
    else
        log_fail "ESLint configuration missing"
    fi
    
    log_check "Prettier configuration"
    if [[ -f ".prettierrc" ]] || [[ -f ".prettierrc.json" ]] || [[ -f "prettier.config.js" ]]; then
        log_pass "Prettier configured"
    else
        log_fail "Prettier configuration missing"
    fi
    
    # Laravel specific quality tools
    if [[ -f "composer.json" ]]; then
        log_check "Laravel Pint"
        if composer show laravel/pint >/dev/null 2>&1 || [[ -f "pint.json" ]]; then
            log_pass "Laravel Pint configured"
        else
            log_warn "Laravel Pint not found"
        fi
        
        log_check "PHPStan/Larastan"
        if composer show nunomaduro/larastan >/dev/null 2>&1 || composer show phpstan/phpstan >/dev/null 2>&1; then
            log_pass "Static analysis tool installed"
        else
            log_warn "Static analysis tool not found"
        fi
    fi
}

validate_cicd() {
    echo -e "\n${BLUE}🚀 Validating CI/CD Configuration${NC}"
    
    log_check "GitHub Actions directory"
    if [[ -d ".github/workflows" ]]; then
        log_pass "GitHub Actions directory found"
    else
        log_fail "GitHub Actions directory missing"
    fi
    
    log_check "Test workflow"
    if [[ -f ".github/workflows/test.yml" ]] || [[ -f ".github/workflows/tests.yml" ]] || [[ -f ".github/workflows/ci.yml" ]]; then
        log_pass "Test workflow configured"
    else
        log_fail "Test workflow missing"
    fi
    
    log_check "Semantic release"
    if grep -q 'semantic-release' package.json 2>/dev/null; then
        log_pass "Semantic release configured"
    else
        log_warn "Semantic release not configured"
    fi
    
    log_check "Release configuration"
    if [[ -f ".releaserc.json" ]] || [[ -f ".releaserc.js" ]] || [[ -f "release.config.js" ]]; then
        log_pass "Release configuration found"
    else
        log_warn "Release configuration not found"
    fi
}

validate_monitoring() {
    echo -e "\n${BLUE}📊 Validating Monitoring Setup${NC}"
    
    # Laravel monitoring
    if [[ -f "composer.json" ]]; then
        log_check "Laravel Pulse"
        if composer show laravel/pulse >/dev/null 2>&1; then
            log_pass "Laravel Pulse installed"
        else
            log_warn "Laravel Pulse not installed"
        fi
        
        log_check "Pulse configuration"
        if [[ -f "config/pulse.php" ]]; then
            log_pass "Pulse configuration found"
        else
            log_warn "Pulse configuration not found"
        fi
    fi
    
    # Frontend monitoring
    if [[ -d "client-frontend" ]] || [[ -f "package.json" ]]; then
        log_check "PostHog integration"
        if grep -q 'posthog-js' */package.json package.json 2>/dev/null; then
            log_pass "PostHog installed"
        else
            log_warn "PostHog not found (client frontend only)"
        fi
    fi
}

run_functional_tests() {
    echo -e "\n${BLUE}🧪 Running Functional Tests${NC}"
    
    # Test Laravel setup
    if [[ -f "composer.json" ]]; then
        log_check "Laravel dependencies"
        if composer validate --no-check-publish >/dev/null 2>&1; then
            log_pass "Composer dependencies valid"
        else
            log_fail "Composer dependencies invalid"
        fi
        
        log_check "Laravel test execution"
        if [[ -f "vendor/bin/pest" ]]; then
            if timeout 30 ./vendor/bin/pest --list-tests >/dev/null 2>&1; then
                log_pass "Pest tests can be listed"
            else
                log_warn "Pest test listing failed"
            fi
        fi
    fi
    
    # Test frontend setup
    for frontend_dir in "client-frontend" "admin-frontend" "."; do
        if [[ -f "$frontend_dir/package.json" && "$frontend_dir" != "." ]] || [[ "$frontend_dir" == "." && ! -d "client-frontend" && ! -d "admin-frontend" ]]; then
            cd "$frontend_dir" 2>/dev/null || continue
            
            log_check "Frontend dependencies ($frontend_dir)"
            if npm list >/dev/null 2>&1; then
                log_pass "npm dependencies valid"
            else
                log_warn "npm dependencies have issues"
            fi
            
            log_check "Linting functionality ($frontend_dir)"
            if npm run lint >/dev/null 2>&1; then
                log_pass "Linting works"
            else
                log_warn "Linting failed"
            fi
            
            cd - >/dev/null 2>&1 || true
        fi
    done
    
    # Test git hooks
    log_check "Git hooks functionality"
    if [[ -f ".husky/pre-commit" ]]; then
        # Create a temporary file to test hooks
        echo "// test file" > temp_test_file.js
        git add temp_test_file.js >/dev/null 2>&1
        
        if .husky/pre-commit >/dev/null 2>&1; then
            log_pass "Pre-commit hook works"
        else
            log_warn "Pre-commit hook failed"
        fi
        
        # Clean up
        git reset HEAD temp_test_file.js >/dev/null 2>&1 || true
        rm -f temp_test_file.js
    fi
}

generate_validation_report() {
    echo -e "\n${BLUE}📋 Generating Validation Report${NC}"
    
    local success_rate=$((PASSED_CHECKS * 100 / TOTAL_CHECKS))
    
    cat > AI_SDLC_VALIDATION_REPORT.md << EOF
# AI-SDLC Framework Validation Report

**Generated:** $(date)
**Validation Score:** $success_rate% ($PASSED_CHECKS/$TOTAL_CHECKS checks passed)

## 📊 Summary

- ✅ **Passed:** $PASSED_CHECKS checks
- ❌ **Failed:** $FAILED_CHECKS checks
- ⚠️  **Warnings:** $((TOTAL_CHECKS - PASSED_CHECKS - FAILED_CHECKS)) checks

## 🎯 Readiness Assessment

$(if [[ $success_rate -ge 90 ]]; then
    echo "🟢 **EXCELLENT** - Your AI-SDLC setup is production-ready!"
elif [[ $success_rate -ge 75 ]]; then
    echo "🟡 **GOOD** - Minor issues need attention before full deployment"
elif [[ $success_rate -ge 50 ]]; then
    echo "🟠 **NEEDS WORK** - Several critical components need configuration"
else
    echo "🔴 **NOT READY** - Major setup required before deployment"
fi)

## 🚀 Next Steps

$(if [[ $FAILED_CHECKS -gt 0 ]]; then
    echo "### Critical Issues to Address:"
    echo "1. Review failed checks above"
    echo "2. Run setup script for missing components"
    echo "3. Re-run validation after fixes"
    echo ""
fi)

### Recommended Actions:
1. **Address any failed checks** shown in red above
2. **Review warnings** for optional improvements
3. **Test the complete workflow:**
   - Make a test commit to verify git hooks
   - Run all test suites to ensure they work
   - Deploy to staging to test CI/CD pipeline
4. **Team training:**
   - Share validation results with team
   - Conduct walkthrough of new tools
   - Schedule follow-up validation in 1 week

## 🛠️ Quick Fixes

### If ESLint/Prettier failed:
\`\`\`bash
npm install --save-dev eslint prettier
\`\`\`

### If git hooks failed:
\`\`\`bash
npm install --save-dev husky
npx husky install
\`\`\`

### If tests failed:
\`\`\`bash
# For Laravel
composer require --dev pestphp/pest

# For frontend
npm install --save-dev vitest @testing-library/react
\`\`\`

---
*Run \`./validate-ai-sdlc.sh\` again after making fixes.*
EOF

    echo "✅ Validation report saved to: AI_SDLC_VALIDATION_REPORT.md"
}

# Main execution
main() {
    echo -e "${BLUE}"
    echo "╔════════════════════════════════════════════════════════════════╗"
    echo "║                AI-SDLC Framework Validation                    ║"
    echo "╚════════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
    
    validate_prerequisites
    validate_project_structure
    validate_ide_configuration
    validate_git_hooks
    validate_testing_framework
    validate_quality_tools
    validate_cicd
    validate_monitoring
    run_functional_tests
    
    echo -e "\n${BLUE}📊 Validation Summary${NC}"
    echo "Total checks: $TOTAL_CHECKS"
    echo -e "Passed: ${GREEN}$PASSED_CHECKS${NC}"
    echo -e "Failed: ${RED}$FAILED_CHECKS${NC}"
    echo -e "Success rate: $((PASSED_CHECKS * 100 / TOTAL_CHECKS))%"
    
    generate_validation_report
    
    if [[ $FAILED_CHECKS -eq 0 ]]; then
        echo -e "\n${GREEN}🎉 All validations passed! Your AI-SDLC setup is ready.${NC}"
    else
        echo -e "\n${YELLOW}⚠️  Some validations failed. Please review and fix issues above.${NC}"
    fi
    
    # Send MS Teams notification if webhook is configured
    if [[ -n "${MS_TEAMS_WEBHOOK_URI:-}" ]] && [[ -f "scripts/webhook-manager.js" ]]; then
        echo -e "\n${BLUE}📢 Sending validation results to MS Teams...${NC}"
        if node scripts/webhook-manager.js validation > /dev/null 2>&1; then
            echo -e "${GREEN}✅ MS Teams notification sent successfully${NC}"
        else
            echo -e "${YELLOW}⚠️  Failed to send MS Teams notification${NC}"
        fi
    fi
}

main "$@"