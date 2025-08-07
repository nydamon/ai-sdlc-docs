# Simple Scripts Download

## 🎯 **What You Need to Know**

**One command installs everything**: `./auto-setup.sh`

That's it. Everything else happens automatically.

## 📥 **Essential Downloads**

### **For Managers**
- [`auto-setup.sh`](auto-setup.sh) - Install everything in 5 minutes
- [`quick-health-check.sh`](quick-health-check.sh) - Verify everything works in 30 seconds
- [`rollback.sh`](rollback.sh) - Remove everything if needed

### **For Developers**  
- [`auto-setup.sh`](auto-setup.sh) - Run this once in your project
- [`ai-sdlc`](ai-sdlc) - Daily commands (status, help, test generation)
- [`team-onboard.sh`](team-onboard.sh) - New team member setup

### **For Advanced Users**
- [All Scripts](scripts-download.md) - Complete library of 39 automation tools

## ⚡ **Quick Start**

**Step 1**: Download and run
```bash
curl -O https://nydamon.github.io/ai-sdlc-docs/auto-setup.sh
chmod +x auto-setup.sh
./auto-setup.sh
```

**Step 2**: Verify it worked
```bash
./quick-health-check.sh
```

**Step 3**: Start developing
```bash
# Everything happens automatically when you commit
git add .
git commit -m "feat: my new feature"
```

## 🔍 **What Gets Installed**

**Basic (No API keys needed)**:
- ✅ Code formatting (Prettier)
- ✅ Code quality (ESLint) 
- ✅ Git hooks
- ✅ Security scanning

**AI Features (With API keys)**:
- ✅ Automatic test generation
- ✅ 100% test coverage
- ✅ E2E test automation
- ✅ AI code review

## 🆘 **Help**

**Not working?**
```bash
./quick-health-check.sh    # Shows what's wrong
./ai-sdlc validate         # Detailed diagnostics
```

**Want to remove everything?**
```bash
./rollback.sh --confirm    # Complete removal
```

**Need advanced features?**
- See [Complete Scripts Library](scripts-download.md)

## 🎉 **That's It!**

No complex setup. No configuration files to edit. No dependencies to manage.

Just run `./auto-setup.sh` and start developing.