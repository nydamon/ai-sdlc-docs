FROM node:18-alpine

# Install system dependencies
RUN apk add --no-cache \
    git \
    bash \
    curl \
    python3 \
    py3-pip \
    docker-cli \
    && rm -rf /var/cache/apk/*

# Install global tools
RUN npm install -g \
    @playwright/test \
    vitest \
    eslint \
    prettier \
    semantic-release

# Install Python tools for security scanning
RUN pip3 install \
    bandit \
    safety \
    gitpython

# Create workspace
WORKDIR /workspace

# Copy AI-SDLC tools
COPY package*.json ./
COPY ai-sdlc* ./
COPY validate-ai-sdlc.sh ./
COPY eslint.config.js ./
COPY .prettierrc ./
COPY commitlint.config.js ./
COPY vitest.config.js ./
COPY playwright.config.js ./

# Make scripts executable
RUN chmod +x ai-sdlc* validate-ai-sdlc.sh

# Install Node dependencies
RUN npm ci --only=production

# Create AI-SDLC dashboard server
COPY docker/dashboard-server.js ./dashboard-server.js

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3001/health || exit 1

# Default command
CMD ["node", "dashboard-server.js"]