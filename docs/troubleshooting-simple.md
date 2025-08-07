# Troubleshooting Guide

## ⚡ Quick Fixes

**Framework not working?**

```bash
./ai-sdlc status    # Shows what's broken
```

**Tests not generating automatically?**

1. Check API keys in `.env` file
2. Make sure you're changing front-end files (`.tsx`, `.jsx`, `.ts`, `.js`)
3. Verify: `./ai-sdlc validate`

**Build failing?**

```bash
npm test           # Check what tests are failing
npm run lint:fix   # Fix linting errors
```

## 🚫 Common Setup Issues

**"Node.js is required"**

- Install Node.js 18+ from nodejs.org
- Check: `node --version`

**"Must be run in a Git repository"**

```bash
git init
./auto-setup.sh
```

**"Setup script fails"**

```bash
npm cache clean --force
rm -rf node_modules
./auto-setup.sh
```

## 🤖 Git Hooks Issues

**Code not formatting on commit?**

```bash
chmod +x .husky/pre-commit
./ai-sdlc validate
```

**Want to skip hooks once?**

```bash
git commit --no-verify -m "emergency commit"
```

## 🚑 Emergency Reset

**Nothing works? Start over:**

```bash
rm -rf .husky node_modules
./auto-setup.sh
```
# If missing, run setup again
./auto-setup.sh
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
./ai-sdlc status     # Shows current status
./ai-sdlc validate   # Detailed validation
```

## AI Testing Issues (Level 2+)

### Vitest Environment Error

**Error: "jsdom environment not found"**

```bash
# Install the missing jsdom package (should already be installed)
npm install --save-dev jsdom
## 🔑 API Key Issues

**"API key not found"**

1. Check your `.env` file exists
2. Verify your OpenAI key starts with `sk-`
3. Make sure GitHub token starts with `ghp_`

```bash
# Check API keys
cat .env | grep -E "OPENAI|GITHUB"
```

## ❓ Need More Help?

**Still having issues?**

1. Run: `./ai-sdlc validate`
2. Check the error messages
3. Try the emergency reset below

**Contact Support:**
- Technical: CTO (Damon DeCrescenzo)
- Setup help: See [Quick Start Guide](quick-start-simple.md)

---

**Remember: The framework is designed to "just work" - if something seems complicated, it's probably a simple fix!**
