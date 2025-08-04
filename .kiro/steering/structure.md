# Project Structure & Organization

## Root Directory Layout

```
ai-sdlc-framework/
├── .kiro/                    # Kiro IDE configuration and steering
├── docs/                     # MkDocs documentation
├── scripts/                  # Core automation scripts
├── scripts-complex/          # Advanced enterprise scripts
├── tests/                    # Test suites organized by type
├── __tests__/               # Jest/Vitest test files
├── validation-results-*/     # Automated validation outputs
└── test-sample/             # Sample test implementations
```

## Key Directories

### Documentation (`docs/`)

- **README.md** - Main project documentation
- **architecture-simplified.md** - System architecture overview
- **implementation-guide-managers.md** - Management rollout guide
- **scripts-reference.md** - Complete script documentation
- **stylesheets/extra.css** - Custom MkDocs styling

### Automation Scripts (`scripts/` & `scripts-complex/`)

- **ai-test-generator.js** - Core AI test generation
- **qodo-pr-agent.js** - PR analysis and code review
- **performance-monitor.js** - System performance tracking
- **security-scanner.js** - Security vulnerability scanning
- **webhook-manager.js** - Integration webhook management

### Testing Structure (`tests/` & `__tests__/`)

```
tests/
├── e2e/                     # Playwright end-to-end tests
│   ├── setup-workflow.spec.js
│   └── test-sample/
├── integration/             # Integration test suites
├── unit/                    # Unit test files
└── simple-cli.test.js       # CLI functionality tests

__tests__/
├── components/              # React component tests
├── hooks/                   # Custom hook tests
├── pages/                   # Page component tests
├── services/                # Service layer tests
└── utils/                   # Utility function tests
```

## Configuration Files

### Root Level Configuration

- **package.json** - Project dependencies and npm scripts
- **eslint.config.js** - ESLint flat configuration
- **vitest.config.js** - Vitest testing configuration
- **playwright.config.js** - E2E testing setup
- **tsconfig.json** - TypeScript compiler options
- **.prettierrc** - Code formatting rules
- **commitlint.config.js** - Conventional commit validation

### Environment & Setup

- **.env.example** - Environment variable template
- **.env** - Local environment variables (gitignored)
- **auto-setup.sh** - Main setup script
- **ai-sdlc** - CLI tool executable

### Git & Quality

- **.husky/** - Git hooks automation
- **.gitignore** - Git ignore patterns
- **.editorconfig** - Editor configuration
- **.releaserc.json** - Semantic release configuration

## Naming Conventions

### Files

- **kebab-case** for script files (`ai-test-generator.js`)
- **PascalCase** for React components (`ComponentName.jsx`)
- **camelCase** for utility functions and services
- **UPPERCASE** for constants and environment variables

### Directories

- **kebab-case** for most directories (`scripts-complex/`)
- **camelCase** for source code directories when applicable
- \***\*tests\*\*** pattern for test directories (Jest convention)

### Test Files

- **Component.test.js** - Unit tests
- **Component.integration.test.js** - Integration tests
- **workflow.e2e.spec.js** - End-to-end tests
- **setup.js** - Test setup and configuration

## Import Patterns

### Path Aliases

- **@/** - Maps to `/src` directory (configured in vitest.config.js)
- Relative imports for local modules
- Absolute imports for external dependencies

### Module Organization

- Group related functionality in dedicated directories
- Separate concerns (components, services, utils, tests)
- Keep configuration files at appropriate levels
- Use index.js files for clean imports when beneficial

## Documentation Standards

### MkDocs Structure

- **mkdocs.yml** - Main documentation configuration
- **mkdocs-complex.yml** - Enterprise documentation variant
- Material theme with custom CSS
- Mermaid diagrams for architecture visualization
- Code syntax highlighting for multiple languages

### README Patterns

- Executive summary with business impact
- Quick start guide (5-minute setup)
- Command reference with examples
- Troubleshooting section
- Implementation strategy for teams
