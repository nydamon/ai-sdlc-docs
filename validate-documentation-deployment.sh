#!/bin/bash

# Documentation Deployment Validation Script
# Run before any documentation site deployment

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo_success() { echo -e "${GREEN}✅ $1${NC}"; }
echo_error() { echo -e "${RED}❌ $1${NC}"; }
echo_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }

echo "🔍 Validating AI-SDLC documentation deployment readiness..."
echo

ERRORS=0

# Check core scripts exist in docs
echo "📁 Checking script accessibility..."

if [[ -f "docs/auto-setup.sh" ]]; then
    echo_success "auto-setup.sh exists in docs/"
else
    echo_error "auto-setup.sh missing from docs/ directory"
    ((ERRORS++))
fi

if [[ -f "docs/ai-sdlc" ]]; then
    echo_success "ai-sdlc CLI exists in docs/"
else
    echo_error "ai-sdlc CLI missing from docs/ directory"
    ((ERRORS++))
fi

if [[ -d "docs/scripts-complex" ]]; then
    echo_success "scripts-complex/ directory exists in docs/"
    SCRIPT_COUNT=$(find docs/scripts-complex -name "*.js" -o -name "*.sh" | wc -l)
    echo_success "Found $SCRIPT_COUNT automation scripts"
else
    echo_error "scripts-complex/ directory missing from docs/"
    ((ERRORS++))
fi

# Check script executability
echo
echo "🔐 Checking script permissions..."

if [[ -x "docs/auto-setup.sh" ]]; then
    echo_success "auto-setup.sh is executable"
else
    echo_error "auto-setup.sh is not executable (run: chmod +x docs/auto-setup.sh)"
    ((ERRORS++))
fi

if [[ -x "docs/ai-sdlc" ]]; then
    echo_success "ai-sdlc CLI is executable"
else
    echo_error "ai-sdlc CLI is not executable (run: chmod +x docs/ai-sdlc)"
    ((ERRORS++))
fi

# Check documentation files
echo
echo "📄 Checking documentation completeness..."

if [[ -f "docs/scripts-download.md" ]]; then
    echo_success "Scripts download page exists"
else
    echo_error "scripts-download.md missing - implementation managers need script access"
    ((ERRORS++))
fi

if [[ -f "docs/README.md" ]]; then
    echo_success "Main documentation page exists"
else
    echo_error "README.md missing from docs/"
    ((ERRORS++))
fi

# Check MkDocs configuration
echo
echo "⚙️  Checking MkDocs configuration..."

if [[ -f "mkdocs.yml" ]]; then
    echo_success "mkdocs.yml configuration exists"
    
    if grep -q "Download Scripts" mkdocs.yml; then
        echo_success "Scripts download section in navigation"
    else
        echo_error "Scripts download section missing from navigation"
        ((ERRORS++))
    fi
    
    if grep -q "auto-setup.sh" mkdocs.yml; then
        echo_success "auto-setup.sh referenced in navigation"
    else
        echo_warning "auto-setup.sh not directly linked in navigation"
    fi
    
    if grep -q "Version:" mkdocs.yml; then
        VERSION_LINE=$(grep "Version:" mkdocs.yml)
        echo_success "Version information found: $VERSION_LINE"
    else
        echo_error "Version information missing from footer - add 'Version: vX.X.X | Updated: Date'"
        ((ERRORS++))
    fi
else
    echo_error "mkdocs.yml configuration missing"
    ((ERRORS++))
fi

# Check repository synchronization
echo
echo "🔄 Checking repository synchronization..."

if [[ -f "auto-setup.sh" ]] && [[ -f "docs/auto-setup.sh" ]]; then
    if diff -q auto-setup.sh docs/auto-setup.sh > /dev/null; then
        echo_success "auto-setup.sh synchronized between repositories"
    else
        echo_error "auto-setup.sh differs between main and docs repositories"
        ((ERRORS++))
    fi
fi

if [[ -f "ai-sdlc" ]] && [[ -f "docs/ai-sdlc" ]]; then
    if diff -q ai-sdlc docs/ai-sdlc > /dev/null; then
        echo_success "ai-sdlc CLI synchronized between repositories"
    else
        echo_error "ai-sdlc CLI differs between main and docs repositories"
        ((ERRORS++))
    fi
fi

# Final validation
echo
echo "📊 Validation Summary:"

if [[ $ERRORS -eq 0 ]]; then
    echo_success "All validation checks passed! ✨"
    echo_success "Documentation deployment is ready."
    echo
    echo "🚀 Next steps:"
    echo "   1. Deploy documentation site"
    echo "   2. Test script download links"
    echo "   3. Verify implementation manager access"
    exit 0
else
    echo_error "$ERRORS validation errors found"
    echo_error "Fix errors before deploying documentation"
    echo
    echo "🔧 Common fixes:"
    echo "   cp auto-setup.sh ai-sdlc docs/"
    echo "   cp -r scripts-complex docs/"
    echo "   chmod +x docs/auto-setup.sh docs/ai-sdlc"
    echo "   # Update mkdocs.yml navigation"
    exit 1
fi