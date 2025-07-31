# Configuration Management for AI-Powered Development

## 📦 Directory Structure

```
/config
  /eslint
  /prettier
  /cursor
  /ai-prompts
.editorconfig
.vscode/
.cursorrc.json
.env.example
```

## ⚙️ Layers of Configuration

1. **Global (shared via git submodule or npm package)**
2. **Environment-specific (`.env.dev`, `.env.prod`)**
3. **Local overrides (`.env.local`, `settings.json`)**

## 🔁 Distribution Model

- Git submodule: `git submodule add git@github.com:our-org/shared-config.git config`
- npm: `npm install @our-org/config`

## 🔐 Security

- Never commit `.env.local`, use `.env.example`
- Use Doppler or AWS Secrets Manager in CI/CD
- Audit changes to configuration weekly

## ⚠️ Validation Scripts

- Use `dotenv-cli` or `env-cmd` to validate `.env` structure.
- Drift detection via GitHub Actions comparing SHA signatures.

## 🧠 AI-Aware Configuration

- Prompt rules live in `ai-prompts/`
- Cursor config stored in `.cursorrc.json`
- PostHog logs AI usage for audit trail

## 🛡️ Policy

- Extensions are whitelisted per repo
- Editor settings are synced via `.vscode/settings.json`
- Config changes must go through PR review