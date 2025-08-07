# Configuration Management for Claude Code + Cline Development

## 📦 Directory Structure

```
/config
  /eslint
  /prettier
  /claude-code
  /cline
  /ai-prompts
.editorconfig
.vscode/
managed-settings.json
.clinerules/
.clineignore
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
- Claude Code policies in `managed-settings.json`
- Cline rules in `.clinerules/` directory
- Cline ignore patterns in `.clineignore`
- Usage analytics tracked via Claude Code + Cline platforms

## 🛡️ Policy

- Extensions are whitelisted per repo
- Editor settings are synced via `.vscode/settings.json`
- Config changes must go through PR review
