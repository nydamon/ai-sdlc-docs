# Environment Configuration Guide

**Framework Version:** {{ extra.version.framework }} - {{ extra.version.name }}

## 🎯 Environment Files Explained

### **Basic Structure**

```bash
.env                 # Main environment file (NEVER COMMIT)
.env.example         # Template file (safe to commit)
.env.local           # Local development overrides (NEVER COMMIT)
.env.production      # Production settings (NEVER COMMIT)
```

### **Git Ignore Status**

✅ **Automatically ignored:** `.env`, `.env.local`, `.env.production`  
✅ **Safe to commit:** `.env.example`

---

## 🔑 Required Environment Variables

### **Level 1: No API Keys (Works Offline)**

No environment variables needed! The framework works completely offline for basic features.

### **Level 2: AI-Powered Features**

```bash
# Copy .env.example to .env and add:

# OpenAI API (Required for AI test generation)
OPENAI_API_KEY=sk-proj-your-key-here
# Get from: https://platform.openai.com/api-keys
# Cost: $20-50/month for typical usage

# GitHub Token (Required for PR automation)
GITHUB_TOKEN=ghp_your-token-here
# Get from: GitHub Settings > Developer settings > Personal access tokens
# Cost: FREE
# Scopes needed: repo, write:packages
```

### **Level 3: Enterprise Features**

```bash
# All Level 2 variables plus:

# SonarCloud (Optional - for advanced code quality)
SONAR_TOKEN=your-sonar-token
SONAR_PROJECT_KEY=your-project-key
# Get from: https://sonarcloud.io/account/security

# GitGuardian (Optional - for enhanced security)
GITGUARDIAN_API_KEY=your-gitguardian-key
# Get from: https://dashboard.gitguardian.com/
```

---

## 🔧 Configuration Validation

### **Check Your Setup**

```bash
# Verify all configurations
./ai-sdlc validate

# Check specific API keys
./ai-sdlc validate --api-keys

# Test OpenAI connection
npm run ai:test-openai

# Test GitHub integration
npm run ai:test-github
```

### **Expected Output**

```bash
✅ Environment file (.env) found
✅ OpenAI API key configured
✅ GitHub token configured
✅ All required variables present
🎉 Configuration valid - ready for AI features
```

---

## 🚨 Configuration Precedence (Important!)

When variables exist in multiple files, this is the priority order:

1. **Environment variables** (highest priority)
2. **`.env.local`** (local development)
3. **`.env`** (main config file)
4. **`.env.example`** (template only, lowest priority)

### **Example Scenario**

```bash
# .env file
OPENAI_API_KEY=sk-old-key

# .env.local file
OPENAI_API_KEY=sk-new-key

# Result: Uses sk-new-key (local override wins)
```

---

## 📋 Variable Descriptions

### **Core API Keys**

| Variable              | Purpose                           | Required For | Cost          |
| --------------------- | --------------------------------- | ------------ | ------------- |
| `OPENAI_API_KEY`      | AI test generation, code analysis | Level 2+     | $20-50/month  |
| `GITHUB_TOKEN`        | PR automation, repository access  | Level 2+     | FREE          |
| `SONAR_TOKEN`         | Code quality analysis             | Level 3      | $10/dev/month |
| `GITGUARDIAN_API_KEY` | Security scanning                 | Level 3      | $25/month     |

### **Configuration Options**

| Variable              | Purpose                   | Default       | Options                                 |
| --------------------- | ------------------------- | ------------- | --------------------------------------- |
| `NODE_ENV`            | Environment mode          | `development` | `development`, `production`, `test`     |
| `AI_MODEL_PREFERENCE` | OpenAI model selection    | `gpt-4o-mini` | `gpt-4o-mini`, `gpt-4`, `gpt-3.5-turbo` |
| `COVERAGE_THRESHOLD`  | Test coverage requirement | `80`          | Any percentage 1-100                    |
| `LOG_LEVEL`           | Logging verbosity         | `info`        | `debug`, `info`, `warn`, `error`        |

---

## 🔒 Security Best Practices

### **API Key Security**

```bash
# ✅ GOOD: Use environment variables
OPENAI_API_KEY=${OPENAI_API_KEY}

# ❌ BAD: Hardcode in files
const apiKey = "sk-proj-actual-key-here"

# ✅ GOOD: Check key exists
if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY required');
}
```

### **File Permissions**

```bash
# Secure your environment files
chmod 600 .env .env.local .env.production

# Verify git ignore
grep -q "\.env" .gitignore || echo ".env" >> .gitignore
```

### **Key Rotation Schedule**

- **Development keys:** Rotate monthly
- **Production keys:** Rotate quarterly
- **Compromised keys:** Rotate immediately

---

## 🛠️ Troubleshooting

### **"API key invalid" Errors**

1. **Check key format:**

   ```bash
   # OpenAI keys start with sk-proj- (new format) or sk- (legacy)
   echo $OPENAI_API_KEY | head -c 20

   # GitHub tokens start with ghp_
   echo $GITHUB_TOKEN | head -c 10
   ```

2. **Verify key permissions:**
   - OpenAI: Needs GPT-4 access + billing setup
   - GitHub: Needs `repo` scope minimum

3. **Test API connection:**
   ```bash
   curl -H "Authorization: Bearer $OPENAI_API_KEY" \
     https://api.openai.com/v1/models | jq '.data[0].id'
   ```

### **"Environment file not found"**

```bash
# Copy template
cp .env.example .env

# Verify file exists
ls -la .env*

# Check permissions
chmod 600 .env
```

### **"Mixed environment variables"**

```bash
# Debug variable sources
./ai-sdlc debug --env

# Clear local overrides
rm .env.local

# Reset to template
cp .env.example .env
```

---

## 🎯 Environment-Specific Examples

### **Development (.env)**

```bash
NODE_ENV=development
AI_MODEL_PREFERENCE=gpt-4o-mini
COVERAGE_THRESHOLD=70
LOG_LEVEL=debug
OPENAI_API_KEY=sk-proj-dev-key
GITHUB_TOKEN=ghp_dev_token
```

### **Production (.env.production)**

```bash
NODE_ENV=production
AI_MODEL_PREFERENCE=gpt-4
COVERAGE_THRESHOLD=80
LOG_LEVEL=warn
OPENAI_API_KEY=sk-proj-prod-key
GITHUB_TOKEN=ghp_prod_token
# Additional security variables...
```

### **Testing (.env.test)**

```bash
NODE_ENV=test
AI_MODEL_PREFERENCE=mock
COVERAGE_THRESHOLD=90
LOG_LEVEL=error
# Use mock/test API keys only
```

This guide ensures your team has clear, unambiguous instructions for environment setup at every level.
