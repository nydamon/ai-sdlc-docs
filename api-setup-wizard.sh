#!/bin/bash

# API Key Setup Wizard for AI-SDLC Framework

echo "🔑 API Key Setup Wizard"
echo "======================="
echo

# Check if .env exists
if [[ ! -f ".env" ]]; then
    if [[ -f ".env.example" ]]; then
        cp .env.example .env
        echo "✅ Created .env from template"
    else
        # Create basic .env template
        cat > .env << 'ENVEOF'
# AI-SDLC Framework API Configuration

# OpenAI API for test generation (Required for AI features)
OPENAI_API_KEY=

# Qase API for test management (Optional)
QASE_API_KEY=
QASE_PROJECT_CODE=TCP

# GitHub token for PR automation (Optional)
GITHUB_TOKEN=

# SonarQube token for code analysis (Optional)
SONAR_TOKEN=
SONAR_PROJECT_KEY=

# Additional integrations
CODIUM_API_KEY=
ENVEOF
        echo "✅ Created basic .env template"
    fi
fi

# Interactive API key setup
echo "Would you like to configure API keys now? (y/n)"
read -r configure_apis

if [[ "$configure_apis" == "y" ]]; then
    echo
    echo "🤖 OpenAI API Key (for AI test generation)"
    echo "Get yours at: https://platform.openai.com/api-keys"
    read -p "Enter OpenAI API key (or press Enter to skip): " openai_key
    if [[ -n "$openai_key" ]]; then
        sed -i.bak "s/OPENAI_API_KEY=.*/OPENAI_API_KEY=$openai_key/" .env
        echo "✅ OpenAI API key configured"
    fi
    
    echo
    echo "🧪 Qase API Key (for test management)"
    echo "Get yours at: https://app.qase.io/user/api/token"
    read -p "Enter Qase API key (or press Enter to skip): " qase_key
    if [[ -n "$qase_key" ]]; then
        sed -i.bak "s/QASE_API_KEY=.*/QASE_API_KEY=$qase_key/" .env
        echo "✅ Qase API key configured"
    fi
    
    echo
    echo "🔍 SonarQube Token (for code analysis)"
    echo "Get yours from your SonarQube instance: User > My Account > Security > Tokens"
    read -p "Enter SonarQube token (or press Enter to skip): " sonar_token
    if [[ -n "$sonar_token" ]]; then
        sed -i.bak "s/SONAR_TOKEN=.*/SONAR_TOKEN=$sonar_token/" .env
        echo "✅ SonarQube token configured"
    fi
fi

echo
echo "🎉 API setup complete!"
echo "✅ Configuration saved to .env file"
echo "ℹ️  You can always edit .env manually to update API keys"
echo
echo "Next steps:"
echo "  ./ai-sdlc validate    # Test your setup"
echo "  npm run ai:validate   # Run implementation tracker"
