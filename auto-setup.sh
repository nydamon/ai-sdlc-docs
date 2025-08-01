#!/bin/bash

# Enhanced AI-Powered SDLC Setup Script
# Supports Laravel + TypeScript React projects

set -e

### COLORS
GREEN="\033[0;32m"
RED="\033[0;31m"
YELLOW="\033[1;33m"
NC="\033[0m"

echo_color() {
  echo -e "${1}${2}${NC}"
}

echo_color $GREEN "🚀 Setting up AI-SDLC stack..."

### PREREQUISITES CHECK
check_prerequisites() {
  echo_color $YELLOW "🔍 Checking prerequisites..."
  command -v node >/dev/null 2>&1 || { echo_color $RED "❌ Node.js is required."; exit 1; }
  command -v npm >/dev/null 2>&1 || { echo_color $RED "❌ npm is required."; exit 1; }
  command -v jq >/dev/null 2>&1 || { echo_color $RED "❌ jq is required for JSON manipulation."; exit 1; }

  # Check for project-specific tools only if directories exist
  if [[ -d "backend" ]] || [[ -f "artisan" ]]; then
    command -v composer >/dev/null 2>&1 || { echo_color $RED "❌ Composer is required for Laravel backend."; exit 1; }
  fi
}

### INSTALL SHARED PACKAGES & HOOKS
install_common_dependencies() {
  echo_color $YELLOW "📦 Installing shared developer dependencies..."
  npm install --save-dev eslint prettier husky lint-staged commitlint @commitlint/config-conventional
  npx husky install
  npx husky add .husky/pre-commit "npx lint-staged"
}

### DETECT AND SETUP PROJECT TYPE
detect_and_setup_project() {
  # Laravel Backend Detection
  if [[ -f "artisan" ]] || [[ -d "backend" ]]; then
    echo_color $GREEN "📦 Laravel project detected"
    if [[ -f "artisan" ]]; then
      composer require --dev pestphp/pest laravel/pulse laravel/pennant --with-all-dependencies
    elif [[ -d "backend" ]]; then
      cd backend
      composer require --dev pestphp/pest laravel/pulse laravel/pennant --with-all-dependencies
      cd ..
    fi
    echo_color $GREEN "✔️ Installed Pest, Pulse, and Pennant for backend quality and monitoring."
  fi

  # TypeScript Client Frontend Detection
  if [[ -f "client-frontend/package.json" ]] || [[ -f "frontend/package.json" ]]; then
    echo_color $GREEN "📦 TypeScript client detected"
    if [[ -f "client-frontend/package.json" ]]; then
      cd client-frontend
    elif [[ -f "frontend/package.json" ]]; then
      cd frontend
    fi
    npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom
    cd ..
    echo_color $GREEN "✔️ Installed Vitest and React testing libraries."
  fi

  # JavaScript Admin Frontend Detection
  if [[ -f "admin-frontend/package.json" ]] || [[ -f "admin/package.json" ]]; then
    echo_color $GREEN "📦 JavaScript admin detected"
    if [[ -f "admin-frontend/package.json" ]]; then
      cd admin-frontend
    elif [[ -f "admin/package.json" ]]; then
      cd admin
    fi
    npm install --save-dev jest @testing-library/react @testing-library/jest-dom
    cd ..
    echo_color $GREEN "✔️ Installed Jest and React testing libraries."
  fi

  # React App Detection (root level)
  if [[ -f "package.json" ]] && ! [[ -f "client-frontend/package.json" ]] && ! [[ -f "admin-frontend/package.json" ]]; then
    echo_color $GREEN "📦 React project detected"
    npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom
    echo_color $GREEN "✔️ Installed Vitest and React testing libraries."
  fi
}

### INSTALL GLOBAL TOOLS
install_global_tools() {
  echo_color $YELLOW "🌍 Installing global development tools..."

  # Playwright for E2E testing
  npm install -g @playwright/test
  npx playwright install --with-deps chromium firefox webkit

  # Semantic Release for automated deployments
  npm install -g semantic-release @semantic-release/git @semantic-release/github

  # AI Tools (if not already installed)
  if ! command -v codium >/dev/null 2>&1; then
    echo_color $YELLOW "⚠️  CodiumAI CLI not found. Please install manually from https://codium.ai"
  fi

  echo_color $GREEN "✔️ Global tools installed."
}

### VALIDATE & REPORT
validate_configuration() {
  echo_color $YELLOW "✅ Validating setup..."
  local issues=0

  # Check essential files
  [[ -f .eslintrc.js ]] || [[ -f .eslintrc.json ]] || { echo_color $RED "⚠️ ESLint config missing"; ((issues++)); }
  [[ -f .prettierrc ]] || { echo_color $RED "⚠️ Prettier config missing"; ((issues++)); }

  # Check project-specific configs
  if [[ -f "client-frontend/package.json" ]]; then
    cd client-frontend
    [[ -f "vitest.config.js" ]] || [[ -f "vitest.config.ts" ]] || { echo_color $RED "⚠️ Vitest config missing"; ((issues++)); }
    cd ..
  fi

  if [[ -f "artisan" ]] || [[ -d "backend" ]]; then
    if [[ -f "artisan" ]]; then
      [[ -d "tests" ]] || [[ -d "tests/Pest.php" ]] || { echo_color $RED "⚠️ Laravel tests folder missing"; ((issues++)); }
    elif [[ -d "backend" ]]; then
      [[ -d "backend/tests" ]] || { echo_color $RED "⚠️ Laravel tests folder missing"; ((issues++)); }
    fi
  fi

  if [[ $issues -eq 0 ]]; then
    echo_color $GREEN "🎉 Setup complete with no issues!"
  else
    echo_color $YELLOW "⚠️ Setup complete with $issues warnings. See documentation for full details."
  fi

  echo_color $GREEN "🧪 Run 'npm run validate' to test your setup."
}

### CREATE VALIDATION SCRIPT
create_validation_script() {
  cat > validate-setup.js << 'EOF'
#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🔍 Validating AI-SDLC Setup...\n');

const checks = [
  {
    name: 'Git Hooks',
    command: 'ls .git/hooks/pre-commit',
    success: 'Pre-commit hooks installed'
  },
  {
    name: 'ESLint',
    command: 'npx eslint --version',
    success: 'ESLint available'
  },
  {
    name: 'Prettier',
    command: 'npx prettier --version',
    success: 'Prettier available'
  },
  {
    name: 'Husky',
    command: 'npx husky --version',
    success: 'Husky available'
  }
];

let passed = 0;
let total = checks.length;

checks.forEach(check => {
  try {
    execSync(check.command, { stdio: 'ignore' });
    console.log(`✅ ${check.success}`);
    passed++;
  } catch (error) {
    console.log(`❌ ${check.name} not properly configured`);
  }
});

console.log(`\n📊 Validation Results: ${passed}/${total} checks passed`);

if (passed === total) {
  console.log('🎉 All systems ready for AI-powered development!');
} else {
  console.log('⚠️  Some components need attention. Check documentation.');
}
EOF

  # Add validation script to package.json if it exists
  if [[ -f "package.json" ]]; then
    node -e "
      const fs = require('fs');
      const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      pkg.scripts = pkg.scripts || {};
      pkg.scripts.validate = 'node validate-setup.js';
      fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
    "
  fi
}

main() {
  check_prerequisites
  install_common_dependencies
  detect_and_setup_project
  install_global_tools
  create_validation_script
  validate_configuration
}

main
