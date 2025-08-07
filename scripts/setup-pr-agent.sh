#!/bin/bash

# TCP Open-Source PR-Agent Setup Script
# Automated installation and configuration for credit repair compliance

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
REPO_URL="https://raw.githubusercontent.com/nydamon/ai-sdlc/main"
PR_AGENT_CONFIG=".pr_agent.toml"
WORKFLOW_FILE=".github/workflows/pr-agent.yml"

echo -e "${BLUE}🤖 TCP Open-Source PR-Agent Setup${NC}"
echo -e "${BLUE}====================================${NC}"
echo

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo -e "${RED}❌ Error: Not in a git repository${NC}"
    echo "Please run this script from the root of your git repository"
    exit 1
fi

# Check if OpenAI API key is available
echo -e "${YELLOW}🔑 Checking for OpenAI API key...${NC}"
if [ -z "$OPENAI_API_KEY" ]; then
    echo -e "${YELLOW}⚠️  OpenAI API key not found in environment${NC}"
    echo "You'll need to add OPENAI_API_KEY to your repository secrets"
    echo "Visit: https://platform.openai.com/api-keys"
    echo
else
    echo -e "${GREEN}✅ OpenAI API key found${NC}"
fi

# Create .github/workflows directory if it doesn't exist
echo -e "${BLUE}📁 Setting up directory structure...${NC}"
mkdir -p .github/workflows

# Download PR-Agent configuration
echo -e "${BLUE}⬇️  Downloading TCP-optimized PR-Agent configuration...${NC}"
if curl -sSL "$REPO_URL/$PR_AGENT_CONFIG" -o "$PR_AGENT_CONFIG"; then
    echo -e "${GREEN}✅ PR-Agent configuration downloaded${NC}"
else
    echo -e "${RED}❌ Failed to download PR-Agent configuration${NC}"
    exit 1
fi

# Download GitHub Actions workflow
echo -e "${BLUE}⬇️  Downloading optimized GitHub Actions workflow...${NC}"
if curl -sSL "$REPO_URL/.github/workflows/pr-agent-optimized.yml" -o "$WORKFLOW_FILE"; then
    echo -e "${GREEN}✅ GitHub Actions workflow downloaded${NC}"
else
    echo -e "${RED}❌ Failed to download GitHub Actions workflow${NC}"
    exit 1
fi

# Check if repository has GitHub secrets access
echo -e "${BLUE}🔐 Checking repository configuration...${NC}"
REPO_NAME=$(git remote get-url origin | sed 's/.*github.com[:/]\([^/]*\/[^/]*\)\.git/\1/' | sed 's/\.git$//')
if [ -n "$REPO_NAME" ]; then
    echo -e "${GREEN}✅ Repository: $REPO_NAME${NC}"
else
    echo -e "${YELLOW}⚠️  Could not detect GitHub repository name${NC}"
fi

# Create a test PR template for validation
echo -e "${BLUE}📝 Creating test PR template...${NC}"
cat > test_pr_template.md << 'EOF'
# TCP PR-Agent Test

## Changes
- Added PR-Agent configuration for TCP compliance
- Enabled automated code review with FCRA/FACTA focus
- Configured cost-optimized AI model routing

## Testing Checklist
- [ ] PR description auto-generated
- [ ] Code review comments appear
- [ ] TCP compliance labels applied
- [ ] Security analysis completed

## Commands to Test
```
/describe    # Regenerate description
/review      # Full code review
/security    # Security-focused analysis
/compliance  # FCRA/FACTA compliance check
/help        # Show all commands
```

This PR tests the TCP-optimized open-source PR-Agent configuration.
EOF

echo -e "${GREEN}✅ Test PR template created: test_pr_template.md${NC}"

# Display configuration summary
echo
echo -e "${BLUE}📋 Configuration Summary${NC}"
echo -e "${BLUE}========================${NC}"
echo -e "PR-Agent Config: ${GREEN}$PR_AGENT_CONFIG${NC}"
echo -e "GitHub Workflow: ${GREEN}$WORKFLOW_FILE${NC}"
echo -e "Model: ${GREEN}gpt-4o-mini (cost-optimized)${NC}"
echo -e "Fallback Models: ${GREEN}gpt-3.5-turbo, gpt-4${NC}"
echo -e "TCP Features: ${GREEN}FCRA/FACTA compliance, PII detection${NC}"
echo

# Display next steps
echo -e "${BLUE}🎯 Next Steps${NC}"
echo -e "${BLUE}============${NC}"
echo -e "1. ${YELLOW}Add OPENAI_API_KEY to repository secrets:${NC}"
echo -e "   • Go to: Settings → Secrets and variables → Actions"
echo -e "   • Add secret: ${GREEN}OPENAI_API_KEY${NC} with your OpenAI API key"
echo
echo -e "2. ${YELLOW}Commit and push the configuration:${NC}"
echo -e "   ${GREEN}git add $PR_AGENT_CONFIG $WORKFLOW_FILE test_pr_template.md${NC}"
echo -e "   ${GREEN}git commit -m 'feat: add TCP-optimized PR-Agent configuration'${NC}"
echo -e "   ${GREEN}git push${NC}"
echo
echo -e "3. ${YELLOW}Create a test PR:${NC}"
echo -e "   • Create a new branch: ${GREEN}git checkout -b test-pr-agent${NC}"
echo -e "   • Make a small change and commit it"
echo -e "   • Create PR and watch AI analysis happen automatically"
echo
echo -e "4. ${YELLOW}Test manual commands in PR comments:${NC}"
echo -e "   • ${GREEN}/describe${NC} - Regenerate PR description"
echo -e "   • ${GREEN}/review${NC} - Comprehensive code review"
echo -e "   • ${GREEN}/security${NC} - Security-focused analysis"
echo -e "   • ${GREEN}/compliance${NC} - FCRA/FACTA compliance check"
echo

# Display cost information
echo -e "${BLUE}💰 Cost Information${NC}"
echo -e "${BLUE}=================${NC}"
echo -e "Estimated monthly cost: ${GREEN}~$150${NC} (vs $1,500 for Qodo Pro)"
echo -e "Annual savings: ${GREEN}$16,200${NC}"
echo -e "Cost per PR analysis: ${GREEN}~$0.25${NC}"
echo -e "Cost per security review: ${GREEN}~$0.50${NC}"
echo

# Display TCP-specific features
echo -e "${BLUE}🏦 TCP Credit Repair Features${NC}"
echo -e "${BLUE}============================${NC}"
echo -e "• ${GREEN}FCRA/FACTA compliance validation${NC}"
echo -e "• ${GREEN}PII pattern detection and alerts${NC}"
echo -e "• ${GREEN}Credit score validation (300-850 range)${NC}"
echo -e "• ${GREEN}Payment processing security checks${NC}"
echo -e "• ${GREEN}Audit trail requirement validation${NC}"
echo -e "• ${GREEN}Consumer consent tracking${NC}"
echo

# Success message
echo -e "${GREEN}🎉 TCP PR-Agent Setup Complete!${NC}"
echo -e "${GREEN}================================${NC}"
echo
echo -e "${YELLOW}Ready to transform your code review process with AI.${NC}"
echo -e "${YELLOW}Questions? Contact: CTO - Damon DeCrescenzo${NC}"

# Optional: Auto-commit if user confirms
echo
read -p "$(echo -e ${YELLOW}Do you want to commit these changes now? [y/N]:${NC} )" -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${BLUE}📝 Committing changes...${NC}"
    git add "$PR_AGENT_CONFIG" "$WORKFLOW_FILE" "test_pr_template.md"
    git commit -m "feat: add TCP-optimized open-source PR-Agent configuration

- Automated PR descriptions with credit repair compliance focus
- Cost-optimized AI model routing (gpt-4o-mini primary)
- FCRA/FACTA specific validation rules
- PII pattern detection and security analysis
- Custom TCP compliance labels and workflows
- Estimated $16,200/year savings vs Qodo Pro"
    
    echo -e "${GREEN}✅ Changes committed successfully!${NC}"
    echo -e "${YELLOW}Next: Push to remote and create a test PR${NC}"
else
    echo -e "${YELLOW}Remember to commit and push when ready!${NC}"
fi

echo
echo -e "${BLUE}Happy coding with AI! 🚀${NC}"