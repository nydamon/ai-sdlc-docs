# ⚡ Quick Start Guide (15 Minutes to First Success)

Get immediate value from the AI-SDLC framework with this streamlined setup guide.

---

## 🎯 Goal: Working AI-Enhanced Development Environment

By the end of this guide, you'll have:
- Automated code quality checks running on every commit
- AI-powered code suggestions in your IDE
- Automated testing for changed files
- Professional commit message standards

---

## Step 1: Git Hooks Setup (5 minutes)

### Install Dependencies
```bash
npm install --save-dev husky lint-staged
npx husky install
npm pkg set scripts.prepare="husky install"
```

### Basic Configuration
```json
// Add to package.json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.php": [
      "./vendor/bin/pint"
    ]
  }
}
```

### Create Pre-Commit Hook
```bash
npx husky add .husky/pre-commit "npx lint-staged"
```

✅ **Test it**: Make a small change and commit - you should see automated formatting!

---

## Step 2: AI Tool Configuration (5 minutes)

### Cursor IDE Setup
1. Install [Cursor IDE](https://cursor.sh)
2. Install recommended extensions:
   - AI Code Review
   - GitLens
   - Prettier
   - ESLint

### Basic AI Prompts
Create `.cursor/prompts/` directory with these starter prompts:

**code-review.cursor**
```
Review this code for:
1. Security vulnerabilities
2. Performance issues
3. Best practices
4. Test coverage suggestions

Focus on: {file_type} code in {framework} framework
```

**test-generation.cursor**
```
Generate comprehensive tests for this code:
- Unit tests for all public methods
- Edge case coverage
- Error scenario handling
- Mock external dependencies

Framework: {test_framework}
Target Coverage: 90%+
```

---

## Step 3: Validate Your Setup (5 minutes)

### Test Git Hooks
```bash
# Make a small code change
echo "console.log('test');" >> test.js

# Stage and commit
git add test.js
git commit -m "test: validate setup"

# Should see:
# 🔍 Running pre-commit checks...
# ✅ Pre-commit checks passed!
```

### Test AI Integration
1. Open a file in Cursor
2. Select some code
3. Use Cmd+K (Mac) or Ctrl+K to trigger AI suggestions
4. Try the "Explain Code" or "Refactor" options

### Verify Commit Standards
```bash
# Try an invalid commit message
git commit -m "fixed stuff"  # Should fail

# Try a valid commit message
git commit -m "fix(auth): resolve login timeout issue"  # Should pass
```

---

## 🎉 Success! What You've Accomplished

- **⏱️ Time Saved**: 2+ hours per week on code reviews
- **🛡️ Quality Boost**: Automated security and style checks
- **🤖 AI Assistance**: Intelligent code suggestions and refactoring
- **📈 Team Standards**: Consistent commit messages and practices

---

## 🚀 Next Steps (This Week)

### Priority 1: AI Usage Playbook (2 hours)
- Customize AI trust levels for your team
- Set up role-based AI access controls
- Train team on prompt engineering

### Priority 2: Enhanced Testing (4 hours)
- Set up AI-powered test generation
- Configure coverage reporting
- Integrate with CI/CD pipeline

### Priority 3: Semantic Release (6 hours)
- Automate version management
- Generate professional changelogs
- Enable one-command deployments

---

## 📊 Quick Health Check

- [x] Git hooks working ✅
- [x] AI tools installed ✅
- [x] Commit standards enforced ✅
- [ ] Team trained on AI usage ⏳
- [ ] Automated testing configured ⏳
- [ ] Semantic release setup ⏳

---

## 🆘 Troubleshooting

### Git Hooks Not Running
```bash
# Reinstall hooks
npx husky install
chmod +x .husky/pre-commit
```

### AI Tools Not Responding
- Check Cursor is updated to latest version
- Verify API keys in Cursor settings
- Restart Cursor IDE

### Commit Message Rejection
- Ensure message follows conventional commits format
- Use `git commit --no-verify` only for emergencies

---

**⏰ Time Investment**: 15 minutes setup, 40+ hours saved annually per developer

Need help? Check out [Git Hooks Automation](git-hooks-automation.md) for detailed configuration options.
