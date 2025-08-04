# Technology Stack & Build System

## Core Technologies

### Frontend Stack

- **React 19.1.1** - Primary UI framework
- **TypeScript 5.9.2** - Type safety for customer-facing applications
- **JavaScript (ES2020+)** - Admin applications and tooling
- **JSX** - React component syntax

### Backend Integration

- **Laravel** - Primary backend framework (PHP)
- **Express 4.18.2** - Node.js server for tooling
- **PostgreSQL** - Database automation and testing

### Testing Framework

- **Vitest 3.2.4** - Unit and integration testing
- **Playwright 1.54.2** - End-to-end testing
- **@testing-library/react 16.3.0** - React component testing
- **jsdom 26.1.0** - DOM simulation for testing

### Code Quality Tools

- **ESLint 9.32.0** - JavaScript/TypeScript linting
- **Prettier 3.6.2** - Code formatting
- **Husky 9.1.7** - Git hooks automation
- **lint-staged 16.1.2** - Pre-commit linting

### AI Integration

- **OpenAI API** - GPT-4 powered test generation
- **Codium AI** - Advanced test generation
- **Qase** - Test management platform
- **Qodo AI** - PR analysis and code review

## Build System & Commands

### Essential Commands

```bash
# Setup and validation
./auto-setup.sh              # Initial project setup
./ai-sdlc status             # Check system health
./ai-sdlc validate           # Run validation checks

# Development workflow
npm run dev                  # Start development server
npm run build                # Build for production
npm run lint                 # Run ESLint
npm run lint:fix             # Fix ESLint issues
npm run format               # Format code with Prettier

# Testing
npm run test                 # Run unit tests with Vitest
npm run test:ui              # Run tests with UI
npm run test:coverage        # Generate coverage report
npm run test:e2e             # Run Playwright E2E tests
npm run test:unit            # Run unit tests only

# AI-powered features
npm run ai:generate-tests    # AI test generation
npm run ai:generate-e2e      # AI E2E test generation
npm run ai:code-review       # AI code review

# Quality checks
npm run type-check           # TypeScript type checking
npm run prepare              # Husky git hooks setup
```

### Configuration Files

- **package.json** - Dependencies and scripts
- **eslint.config.js** - ESLint configuration (flat config)
- **vitest.config.js** - Vitest testing configuration
- **playwright.config.js** - E2E testing configuration
- **tsconfig.json** - TypeScript configuration
- **.prettierrc** - Prettier formatting rules
- **commitlint.config.js** - Conventional commit validation

### Environment Variables

Required for AI features (see `.env.example`):

- `OPENAI_API_KEY` - OpenAI API access
- `QASE_API_KEY` - Qase test management
- `GITHUB_TOKEN` - GitHub integration
- `CODIUM_API_KEY` - Codium AI features

## Development Standards

### Code Style

- **ES2020+** syntax with modern JavaScript features
- **Strict TypeScript** configuration with no unused variables
- **React JSX** transform (no React import needed)
- **Conventional commits** enforced via git hooks
- **Automatic formatting** on commit via Prettier

### Testing Standards

- **100% coverage target** with AI-generated tests
- **Unit tests** for all business logic
- **Integration tests** for API interactions
- **E2E tests** for critical user flows
- **Credit repair domain** specific test patterns
