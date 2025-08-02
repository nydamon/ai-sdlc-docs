# 🛠️ Troubleshooting Guide

Common issues and solutions for the AI-SDLC framework implementation.

---

## 🎯 Quick Problem Solver

### Git Hooks Issues
```bash
# Problem: Commits bypass pre-commit hooks
# Solution: Auto-repair git hooks
./ai-sdlc repair

# Problem: Hooks fail with permission errors
# Solution: Auto-repair fixes permissions automatically
./ai-sdlc repair

# Problem: Specific hook failing
# Solution: Validate and repair hooks
./ai-sdlc validate
./ai-sdlc repair
```

### AI Tool Issues
```bash
# Problem: Cursor AI suggestions not appearing
# Solution: Check API keys and restart IDE
echo $CURSOR_API_KEY
# Restart Cursor IDE

# Problem: CodiumAI test generation fails
# Solution: Check installation and configuration
npx codium --version
# Verify package.json scripts

# Problem: AI-generated code quality issues
# Solution: Review trust levels in AI playbook
# Adjust review requirements for code types
```

### Semantic Release Issues
```bash
# Problem: Version bumping not working
# Solution: Validate and repair semantic release setup
./ai-sdlc validate
./ai-sdlc repair

# Problem: GitHub releases failing
# Solution: Check with validation and repair
./ai-sdlc validate
echo $GITHUB_TOKEN | cut -c1-10

# Problem: Changelog not generating
# Solution: Auto-repair configuration
./ai-sdlc repair
git log --oneline -5
```

---

## 🔧 Detailed Troubleshooting

### 1. Git Hooks Troubleshooting

#### Pre-Commit Hook Issues
**Symptom**: Pre-commit hook fails or doesn't run
**Common Causes**:
- Missing dependencies
- Incorrect file permissions
- Configuration errors

**Solutions**:
```bash
# 1. Run comprehensive validation
./ai-sdlc validate

# 2. Auto-repair all issues found
./ai-sdlc repair

# 3. Test hook functionality
./ai-sdlc doctor

# 4. Manual verification (if needed)
ls -la .husky/
.husky/pre-commit
```

#### Commit Message Hook Issues
**Symptom**: Invalid commit messages are accepted
**Common Causes**:
- Commitlint not properly configured
- Hook not installed correctly

**Solutions**:
```bash
# 1. Validate commitlint setup
./ai-sdlc validate

# 2. Auto-repair commit hooks
./ai-sdlc repair

# 3. Test commit message format
echo "fix: test message" | npx commitlint

# 4. Verify configuration (if needed)
cat commitlint.config.js
```

### 2. AI Tool Troubleshooting

#### Cursor IDE Issues
**Symptom**: AI suggestions not working or slow
**Common Causes**:
- Invalid or missing API keys
- Network connectivity issues
- IDE configuration problems

**Solutions**:
```bash
# 1. Verify API key
echo $CURSOR_API_KEY
export CURSOR_API_KEY="your-api-key-here"

# 2. Check network connectivity
curl -I https://api.cursor.sh

# 3. Clear IDE cache
# In Cursor: Cmd+Shift+P → "Developer: Reload Window"

# 4. Restart IDE
# Close and reopen Cursor
```

#### CodiumAI Issues
**Symptom**: Test generation fails or produces poor quality
**Common Causes**:
- Insufficient context provided
- Framework-specific configuration missing
- Rate limiting

**Solutions**:
```bash
# 1. Check CodiumAI installation
npx codium --version

# 2. Verify framework detection
npx codium --detect-framework

# 3. Provide more context
npx codium --context="path/to/related/files"

# 4. Check rate limits
# Review CodiumAI dashboard for usage limits
```

### 3. Semantic Release Troubleshooting

#### Version Bumping Issues
**Symptom**: Versions not incrementing correctly
**Common Causes**:
- Incorrect commit message format
- Branch configuration issues
- Plugin configuration problems

**Solutions**:
```bash
# 1. Validate semantic release setup
./ai-sdlc validate

# 2. Auto-repair configuration issues
./ai-sdlc repair

# 3. Test release process
npx semantic-release --dry-run --debug

# 4. Verify commit message format
git log --oneline -10 | head -5

# 5. Check configuration files (if needed)
cat .releaserc.json | jq '.branches'
```

#### GitHub Release Issues
**Symptom**: Releases not published to GitHub
**Common Causes**:
- Invalid GitHub token
- Insufficient permissions
- Repository configuration issues

**Solutions**:
```bash
# 1. Verify GitHub token
echo $GITHUB_TOKEN | cut -c1-10
# Should return first 10 characters

# 2. Test GitHub API access
curl -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/repos/$(git remote get-url origin | sed 's/.*://;s/\.git$//') | jq '.name'

# 3. Check repository permissions
# Ensure token has repo scope in GitHub settings

# 4. Validate release configuration
cat .releaserc.json | jq '.plugins'
```

---

## 🚨 Critical Issues & Emergency Procedures

### Emergency Bypass Procedures
```bash
# Bypass pre-commit hooks (use sparingly)
git commit --no-verify -m "emergency: critical hotfix"

# Bypass pre-push hooks
git push --no-verify

# Skip specific lint-staged tasks
# Temporarily modify package.json lint-staged configuration
```

### Rollback Procedures
```bash
# Rollback a failed release
git revert <release-commit-hash>
git push origin main

# Restore previous configuration
git checkout HEAD~1 -- .husky/
git checkout HEAD~1 -- package.json
```

---

## 📊 Diagnostic Commands

### Git Hooks Diagnostics
```bash
# Check hook installation
ls -la .git/hooks/

# Test pre-commit hook
GIT_INDEX_FILE=.git/index git diff --cached --name-only

# Verify commitlint
echo "feat: test" | npx commitlint
echo "invalid message" | npx commitlint
```

### AI Tool Diagnostics
```bash
# Check AI tool installations
which cursor
which codium
npx --version

# Test AI connectivity
curl -I https://api.openai.com/v1/models

# Verify environment variables
printenv | grep -E "(CURSOR|OPENAI|GITHUB)"
```

### Release Diagnostics
```bash
# Check semantic-release configuration
npx semantic-release --dry-run --no-ci

# Verify Git configuration
git config --get remote.origin.url
git branch --show-current

# Test GitHub authentication
gh auth status
```

---

## 🎯 Prevention Best Practices

### Regular Maintenance
```bash
# Weekly: Run health check
./ai-sdlc doctor

# Monthly: Comprehensive validation
./ai-sdlc validate

# Quarterly: Full system check
./ai-sdlc doctor
# Update dependencies as recommended
npm outdated
```

### Monitoring & Alerts
```bash
# Set up monitoring for:
# - Hook failure rates
# - AI tool usage patterns
# - Release success/failure rates
# - Security scan results
```

---

## 📞 Support Resources

### Documentation
- [Git Hooks Automation](git-hooks-automation.md)
- [AI-First Playbook](ai-first-playbook.md)
- [Semantic Release Setup](semantic-release-setup.md)

### External Support
- **Cursor Support**: https://cursor.sh/support
- **CodiumAI Support**: https://codium.ai/support
- **GitHub Support**: https://support.github.com

### Community Resources
- **Stack Overflow**: Tag questions with relevant tools
- **GitHub Discussions**: Framework-specific discussions
- **Slack/Discord**: Developer communities

---

**Last Updated**: Regular maintenance recommended
**Next Review**: Monthly configuration validation

*Need help with a specific issue? Check the [Success Metrics](success-metrics.md) to track incident patterns and resolution times.*
