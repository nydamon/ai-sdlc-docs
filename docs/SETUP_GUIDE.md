# 🚀 AI-SDLC Setup Guide - Single Command Installation

**Framework Version:** {{ extra.version.framework }} - {{ extra.version.name }}

## ⚡ Quick Start (5 Minutes)

### **PRIMARY SETUP COMMAND (ONLY USE THIS)**

```bash
./auto-setup.sh
```

**That's it!** This single command handles everything automatically:

- Detects your project type (Laravel/React/Node.js)
- Installs all required tools
- Configures git hooks
- Sets up quality gates
- Creates working configurations

### **Verify Installation Worked**

```bash
./ai-sdlc status
```

✅ You should see: "All core components functional"

---

## 🎯 Setup Levels Explained

### **Level 1: Foundation (FREE - No API Keys)**

**What you get immediately:**

- ✅ Auto-formatting on every commit (Prettier + ESLint)
- ✅ Git hooks with security scanning
- ✅ Quality gates that prevent bad code
- ✅ Professional commit message enforcement
- ✅ Branch naming standards

**Command:** Already done with `./auto-setup.sh`

### **Level 2: AI-Powered ({{ extra.version.cost }}/month)**

**Additional capabilities:**

- 🤖 AI test generation with OpenAI GPT-4
- 🔍 Open-source PR-Agent code review
- 📊 Coverage enforcement (80/80/70 thresholds)
- 🏦 FCRA compliance validation

**Setup:** Add API keys to `.env` file (see API Setup below)

### **Level 3: Enterprise (Full Stack)**

**Maximum automation:**

- 🎭 End-to-end test automation
- 🔒 Advanced security scanning
- 📈 Performance monitoring
- 📋 Test management integration

**Setup:** Complete Level 2 + enterprise configurations

---

## 🔑 API Keys Setup (Level 2+)

### **Required for AI Features**

```bash
# Create .env file (automatically ignored by git)
cp .env.example .env

# Edit .env and add:
OPENAI_API_KEY=sk-proj-your-key-here     # Required for AI test generation
GITHUB_TOKEN=ghp_your-token-here         # Required for PR automation
```

### **Step-by-Step API Setup**

#### 1. OpenAI API Key (Required for AI features)

1. Go to https://platform.openai.com/api-keys
2. Create new API key with GPT-4 access
3. Add billing information (required for GPT-4)
4. Copy key to `.env` file

**Cost:** $20-50/month for typical usage

#### 2. GitHub Token (Required for PR automation)

1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate new token (classic) with these scopes:
   - `repo` (full repository access)
   - `write:packages` (if using GitHub Packages)
3. Copy token to `.env` file

**Cost:** FREE

### **Validation**

```bash
./ai-sdlc validate
```

✅ Should show: "All API keys configured correctly"

---

## 🏗️ Quality Gates Defined

### **Build-Failing Thresholds**

These will **stop your build** if not met:

- **Code Coverage:** 80% lines, 80% functions, 70% branches
- **ESLint:** Zero errors allowed (warnings OK)
- **TypeScript:** Zero type errors allowed
- **Security:** No high/critical vulnerabilities
- **Tests:** All tests must pass

### **When Quality Gates Fail**

```bash
# Check what failed
npm run test:coverage    # See coverage report
npm run lint            # See linting errors
npm run type-check      # See TypeScript errors

# Fix common issues
npm run lint:fix        # Auto-fix linting issues
npm run format          # Auto-format code
```

### **Emergency Override (Use sparingly)**

```bash
git commit --no-verify  # Skips pre-commit hooks
```

---

## 🛠️ Open-Source PR-Agent Setup

**We now use the open-source PR-Agent (no Qodo subscription needed)**

### **GitHub Actions Setup (Automatic)**

The setup script creates `.github/workflows/pr-agent.yml`:

```yaml
name: PR-Agent Review
on:
  pull_request:
    types: [opened, reopened, ready_for_review]
  issue_comment:
    types: [created]

jobs:
  pr_agent:
    runs-on: ubuntu-latest
    permissions:
      issues: write
      pull-requests: write
      contents: write
    steps:
      - uses: qodo-ai/pr-agent@main
        env:
          OPENAI_KEY: ${{ secrets.OPENAI_API_KEY }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### **Credit Repair Custom Rules**

The setup automatically creates `.pr_agent.toml` with TCP-specific rules:

```toml
[pr_reviewer]
enable_review = true
extra_instructions = """
Focus on credit repair domain compliance:
- Verify FCRA Section 604 permissible purpose validation
- Check PII data encryption and masking
- Validate credit score calculations (300-850 range)
- Ensure consumer-friendly error messaging
"""

[pr_description]
enable_pr_description = true
extra_instructions = "Include FCRA compliance impact in PR descriptions"
```

---

## ✅ Verification Checklist

After running `./auto-setup.sh`, verify these work:

- [ ] `./ai-sdlc status` shows all green ✅
- [ ] `git commit` triggers formatting and linting
- [ ] `npm test` runs and passes
- [ ] `npm run test:coverage` shows coverage report
- [ ] `.env` file created and gitignored

**If any step fails:** See [Troubleshooting Guide](troubleshooting-simple.md)

---

## 🚨 Common Issues & Solutions

### "Command not found: ./ai-sdlc"

**Solution:** Make sure you're in the project root directory

### "Permission denied: ./auto-setup.sh"

**Solution:** `chmod +x auto-setup.sh`

### "API key invalid"

**Solution:** Check API key format and billing setup

### "Tests failing after setup"

**Solution:** `npm run lint:fix && npm run format`

---

## 📞 Need Help?

- **Quick questions:** Check `./ai-sdlc help`
- **Setup issues:** Run `./ai-sdlc doctor`
- **API problems:** Run `./ai-sdlc validate`
- **Everything broken:** Start over with `./auto-setup.sh`

---

**Remember:** Start with `./auto-setup.sh` - it handles 90% of the complexity automatically.
