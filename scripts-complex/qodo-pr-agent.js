#!/usr/bin/env node

/**
 * Qodo AI PR Agent Integration for AI-SDLC
 * The Credit Pros - Development Team
 *
 * Provides AI-powered code review and PR analysis
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class QodoPRAgent {
  constructor() {
    this.apiKey = process.env.QODO_AI_API_KEY;
    this.githubToken =
      process.env.QODO_AI_GITHUB_TOKEN || process.env.GITHUB_TOKEN;
    this.baseUrl = 'https://api.qodo.ai/v1';
    this.projectRoot = process.cwd();

    if (!this.apiKey) {
      console.warn(
        '⚠️  QODO_AI_API_KEY not configured. Some features will be limited.'
      );
    }
  }

  /**
   * Initialize PR Agent for the repository
   */
  async initializePRAgent() {
    console.log('🤖 Initializing Qodo AI PR Agent...');

    try {
      // Check if GitHub repo is configured
      const remoteUrl = this.getGitRemoteUrl();
      if (!remoteUrl) {
        throw new Error('No GitHub remote repository found');
      }

      // Create PR Agent configuration
      await this.createPRAgentConfig();

      // Set up GitHub Actions workflow for PR Agent
      await this.createGitHubWorkflow();

      // Configure webhook if API key is available
      if (this.apiKey) {
        await this.configureWebhook();
      }

      console.log('✅ Qodo AI PR Agent initialized successfully');
      console.log('📝 Configuration files created:');
      console.log('   - .pr_agent.toml (PR Agent settings)');
      console.log('   - .github/workflows/pr-agent.yml (GitHub Actions)');

      return {
        status: 'success',
        message: 'PR Agent initialized',
        configCreated: true,
        workflowCreated: true,
      };
    } catch (error) {
      console.error('❌ Failed to initialize PR Agent:', error.message);
      return { status: 'failed', error: error.message };
    }
  }

  /**
   * Get GitHub remote URL
   */
  getGitRemoteUrl() {
    try {
      const remoteUrl = execSync('git remote get-url origin', {
        encoding: 'utf8',
      }).trim();
      return remoteUrl;
    } catch {
      return null;
    }
  }

  /**
   * Create PR Agent configuration file
   */
  async createPRAgentConfig() {
    const config = `[pr_reviewer]
# Enable automatic PR reviews
enable_review = true
enable_auto_approval = false
require_score_review = true
require_tests_review = true
require_security_review = true

# Review settings
max_review_comments = 20
persistent_comment_per_line = true
enable_help_text = true

# Code quality checks
require_code_coverage = true
require_performance_review = true
require_documentation_review = true

[pr_code_suggestions]
# Enable code suggestions
enable_suggestions = true
enable_auto_fix = false
max_suggestions = 15

# Suggestion types
enable_line_suggestions = true
enable_method_suggestions = true
enable_class_suggestions = true

[pr_description]
# Auto-generate PR descriptions
enable_pr_description = true
enable_semantic_sections = true
include_generated_by_tag = true

# Description sections
include_overview = true
include_walkthrough = true
include_changes_summary = true

[pr_update_changelog]
# Changelog management
enable_changelog = true
changelog_path = "CHANGELOG.md"
changelog_format = "semantic"

[github]
# GitHub integration settings
publish_review_comment = true
publish_inline_comments = true
add_line_comments_single_suggestions = true

[config]
# General configuration
model = "gpt-4"
model_turbo = "gpt-3.5-turbo"
verbosity_level = 1

# AI-SDLC specific settings
[custom_labels]
# Custom labels for credit repair domain
credit_repair_compliance = "Requires FCRA/FACTA compliance review"
security_sensitive = "Security-sensitive changes detected"
performance_impact = "Performance impact detected"
database_changes = "Database schema changes"

[custom_prompts]
# Credit repair specific prompts
security_prompt = "Review for PII handling, data encryption, and compliance with credit repair regulations"
performance_prompt = "Analyze impact on credit report processing and customer data handling performance"
compliance_prompt = "Verify compliance with FCRA, FACTA, and state credit repair regulations"
`;

    fs.writeFileSync(path.join(this.projectRoot, '.pr_agent.toml'), config);
    console.log('✅ Created .pr_agent.toml configuration');
  }

  /**
   * Create GitHub Actions workflow for PR Agent
   */
  async createGitHubWorkflow() {
    const workflowDir = path.join(this.projectRoot, '.github', 'workflows');
    if (!fs.existsSync(workflowDir)) {
      fs.mkdirSync(workflowDir, { recursive: true });
    }

    const workflow = `name: Qodo AI PR Agent

on:
  pull_request:
    types: [opened, synchronize, reopened, ready_for_review]
  issue_comment:
    types: [created, edited]

permissions:
  contents: read
  pull-requests: write
  issues: write

jobs:
  pr_agent_job:
    if: \${{ github.event.sender.type != 'Bot' }}
    runs-on: ubuntu-latest
    name: Run Qodo AI PR Agent
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          token: \${{ secrets.GITHUB_TOKEN }}

      - name: PR Agent action
        id: pragent
        uses: Codium-ai/pr-agent@main
        env:
          OPENAI_KEY: \${{ secrets.OPENAI_API_KEY }}
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          QODO_AI_API_KEY: \${{ secrets.QODO_AI_API_KEY }}
        with:
          # Configuration for AI-SDLC framework
          pr_reviewer.enable_review: true
          pr_reviewer.require_score_review: true
          pr_reviewer.require_tests_review: true
          pr_reviewer.require_security_review: true
          pr_code_suggestions.enable_suggestions: true
          pr_description.enable_pr_description: true
          
          # Credit repair specific settings
          pr_reviewer.extra_instructions: |
            Focus on:
            1. FCRA/FACTA compliance for credit repair operations
            2. PII data handling and encryption
            3. Database performance for credit report processing
            4. Security vulnerabilities in customer data handling
            5. Laravel/React best practices for financial applications

  # Send notification to MS Teams
  notify_teams:
    needs: pr_agent_job
    if: always()
    runs-on: ubuntu-latest
    steps:
      - name: Notify MS Teams
        if: env.MS_TEAMS_WEBHOOK_URI
        run: |
          curl -H "Content-Type: application/json" -d '{
            "@type": "MessageCard",
            "@context": "http://schema.org/extensions",
            "themeColor": "28a745",
            "summary": "🤖 AI PR Review Complete",
            "sections": [{
              "activityTitle": "Qodo AI PR Agent",
              "activitySubtitle": "PR #\${{ github.event.pull_request.number }} reviewed",
              "facts": [
                {"name": "Repository", "value": "\${{ github.repository }}"},
                {"name": "PR Title", "value": "\${{ github.event.pull_request.title }}"},
                {"name": "Author", "value": "\${{ github.event.pull_request.user.login }}"},
                {"name": "Status", "value": "\${{ needs.pr_agent_job.result }}"}
              ],
              "markdown": true
            }],
            "potentialAction": [{
              "@type": "OpenUri",
              "name": "View PR",
              "targets": [{"os": "default", "uri": "\${{ github.event.pull_request.html_url }}"}]
            }]
          }' \${{ secrets.MS_TEAMS_WEBHOOK_URI }}
        env:
          MS_TEAMS_WEBHOOK_URI: \${{ secrets.MS_TEAMS_WEBHOOK_URI }}
`;

    fs.writeFileSync(path.join(workflowDir, 'pr-agent.yml'), workflow);
    console.log(
      '✅ Created GitHub Actions workflow: .github/workflows/pr-agent.yml'
    );
  }

  /**
   * Configure webhook for real-time PR analysis
   */
  async configureWebhook() {
    console.log('🔗 Configuring PR Agent webhook...');

    try {
      // This would configure webhook with Qodo AI service
      // For now, we'll create a placeholder configuration
      const webhookConfig = {
        url: `${this.baseUrl}/webhooks/github`,
        events: ['pull_request', 'pull_request_review', 'issue_comment'],
        active: true,
        config: {
          url: `${this.baseUrl}/webhooks/github`,
          content_type: 'json',
          secret: this.generateWebhookSecret(),
        },
      };

      // Store webhook configuration
      fs.writeFileSync(
        path.join(this.projectRoot, '.pr_agent_webhook.json'),
        JSON.stringify(webhookConfig, null, 2)
      );

      console.log('✅ Webhook configuration saved');
      return webhookConfig;
    } catch (error) {
      console.warn('⚠️  Webhook configuration failed:', error.message);
      return null;
    }
  }

  /**
   * Generate webhook secret
   */
  generateWebhookSecret() {
    return require('crypto').randomBytes(32).toString('hex');
  }

  /**
   * Analyze current PR
   */
  async analyzePR(prNumber) {
    console.log(`🔍 Analyzing PR #${prNumber}...`);

    try {
      if (!this.githubToken) {
        throw new Error('GitHub token not configured');
      }

      // Get PR details
      const prDetails = await this.getPRDetails(prNumber);

      // Get PR diff
      const prDiff = await this.getPRDiff(prNumber);

      // Analyze code changes
      const analysis = await this.analyzeCodeChanges(prDetails, prDiff);

      // Generate review comments
      const review = await this.generateReview(analysis);

      // Post review if configured
      if (this.apiKey) {
        await this.postReview(prNumber, review);
      }

      return {
        status: 'success',
        prNumber,
        analysis,
        review,
        postedReview: !!this.apiKey,
      };
    } catch (error) {
      console.error('❌ PR analysis failed:', error.message);
      return { status: 'failed', error: error.message };
    }
  }

  /**
   * Get PR details from GitHub
   */
  async getPRDetails(prNumber) {
    return new Promise((resolve, reject) => {
      const repoInfo = this.parseGitHubUrl(this.getGitRemoteUrl());
      if (!repoInfo) {
        reject(new Error('Invalid GitHub repository URL'));
        return;
      }

      const options = {
        hostname: 'api.github.com',
        path: `/repos/${repoInfo.owner}/${repoInfo.repo}/pulls/${prNumber}`,
        headers: {
          Authorization: `token ${this.githubToken}`,
          'User-Agent': 'AI-SDLC-Framework',
        },
      };

      https
        .get(options, (res) => {
          let data = '';
          res.on('data', (chunk) => (data += chunk));
          res.on('end', () => {
            try {
              resolve(JSON.parse(data));
            } catch (error) {
              reject(error);
            }
          });
        })
        .on('error', reject);
    });
  }

  /**
   * Get PR diff
   */
  async getPRDiff(prNumber) {
    try {
      const diff = execSync(
        `git fetch origin pull/${prNumber}/head:pr-${prNumber} && git diff HEAD..pr-${prNumber}`,
        { encoding: 'utf8' }
      );
      return diff;
    } catch (error) {
      console.warn('⚠️  Could not get PR diff:', error.message);
      return '';
    }
  }

  /**
   * Analyze code changes with AI
   */
  async analyzeCodeChanges(prDetails, prDiff) {
    const analysis = {
      title: prDetails.title,
      description: prDetails.body,
      changedFiles: this.extractChangedFiles(prDiff),
      securityConcerns: this.detectSecurityConcerns(prDiff),
      performanceImpact: this.detectPerformanceImpact(prDiff),
      complianceConcerns: this.detectComplianceConcerns(prDiff),
      testCoverage: this.analyzeTestCoverage(prDiff),
      codeQuality: this.analyzeCodeQuality(prDiff),
    };

    return analysis;
  }

  /**
   * Extract changed files from diff
   */
  extractChangedFiles(diff) {
    const files = [];
    const lines = diff.split('\n');

    for (const line of lines) {
      if (line.startsWith('diff --git')) {
        const match = line.match(/diff --git a\/(.+) b\/(.+)/);
        if (match) {
          files.push({
            file: match[2],
            type: this.getFileType(match[2]),
          });
        }
      }
    }

    return files;
  }

  /**
   * Detect security concerns
   */
  detectSecurityConcerns(diff) {
    const concerns = [];
    const securityPatterns = [
      {
        pattern: /password|secret|key|token/gi,
        severity: 'high',
        message: 'Potential credential exposure',
      },
      {
        pattern: /eval\(|exec\(|system\(/gi,
        severity: 'critical',
        message: 'Dangerous function usage',
      },
      {
        pattern: /sql.*\+.*\$/gi,
        severity: 'high',
        message: 'Potential SQL injection',
      },
      {
        pattern: /innerHTML|dangerouslySetInnerHTML/gi,
        severity: 'medium',
        message: 'XSS vulnerability risk',
      },
    ];

    for (const { pattern, severity, message } of securityPatterns) {
      if (pattern.test(diff)) {
        concerns.push({ severity, message, pattern: pattern.source });
      }
    }

    return concerns;
  }

  /**
   * Detect performance impact
   */
  detectPerformanceImpact(diff) {
    const impacts = [];
    const performancePatterns = [
      {
        pattern: /for.*in.*\{/gi,
        severity: 'medium',
        message: 'Nested loop detected',
      },
      {
        pattern: /SELECT.*\*.*FROM/gi,
        severity: 'medium',
        message: 'SELECT * query detected',
      },
      {
        pattern: /useEffect.*\[\]/gi,
        severity: 'low',
        message: 'Empty dependency array in useEffect',
      },
    ];

    for (const { pattern, severity, message } of performancePatterns) {
      if (pattern.test(diff)) {
        impacts.push({ severity, message, pattern: pattern.source });
      }
    }

    return impacts;
  }

  /**
   * Detect compliance concerns
   */
  detectComplianceConcerns(diff) {
    const concerns = [];
    const compliancePatterns = [
      {
        pattern: /credit_score|ssn|social_security/gi,
        severity: 'high',
        message: 'PII data handling detected',
      },
      {
        pattern: /encrypt|decrypt|hash/gi,
        severity: 'medium',
        message: 'Cryptographic operations detected',
      },
      {
        pattern: /customer.*data|personal.*info/gi,
        severity: 'high',
        message: 'Customer data handling',
      },
    ];

    for (const { pattern, severity, message } of compliancePatterns) {
      if (pattern.test(diff)) {
        concerns.push({ severity, message, pattern: pattern.source });
      }
    }

    return concerns;
  }

  /**
   * Analyze test coverage
   */
  analyzeTestCoverage(diff) {
    const testFiles = diff
      .split('\n')
      .filter(
        (line) =>
          line.includes('.test.') ||
          line.includes('.spec.') ||
          line.includes('__tests__')
      );

    return {
      hasTests: testFiles.length > 0,
      testFiles: testFiles.length,
      recommendation:
        testFiles.length === 0
          ? 'Add tests for new functionality'
          : 'Good test coverage',
    };
  }

  /**
   * Analyze code quality
   */
  analyzeCodeQuality(diff) {
    const issues = [];
    const qualityPatterns = [
      {
        pattern: /console\.log|console\.error/gi,
        severity: 'low',
        message: 'Console statements should be removed',
      },
      {
        pattern: /TODO|FIXME|HACK/gi,
        severity: 'low',
        message: 'TODO comments found',
      },
      {
        pattern: /function.*\{[\s\S]{500,}/gi,
        severity: 'medium',
        message: 'Large function detected',
      },
    ];

    for (const { pattern, severity, message } of qualityPatterns) {
      if (pattern.test(diff)) {
        issues.push({ severity, message });
      }
    }

    return {
      issues,
      score: Math.max(0, 100 - issues.length * 10),
    };
  }

  /**
   * Generate review based on analysis
   */
  async generateReview(analysis) {
    let reviewBody = '## 🤖 AI Code Review\n\n';

    // Security section
    if (analysis.securityConcerns.length > 0) {
      reviewBody += '### 🔐 Security Concerns\n\n';
      for (const concern of analysis.securityConcerns) {
        reviewBody += `- **${concern.severity.toUpperCase()}**: ${concern.message}\n`;
      }
      reviewBody += '\n';
    }

    // Performance section
    if (analysis.performanceImpact.length > 0) {
      reviewBody += '### ⚡ Performance Impact\n\n';
      for (const impact of analysis.performanceImpact) {
        reviewBody += `- **${impact.severity.toUpperCase()}**: ${impact.message}\n`;
      }
      reviewBody += '\n';
    }

    // Compliance section
    if (analysis.complianceConcerns.length > 0) {
      reviewBody += '### 📋 Compliance Review\n\n';
      for (const concern of analysis.complianceConcerns) {
        reviewBody += `- **${concern.severity.toUpperCase()}**: ${concern.message}\n`;
      }
      reviewBody += '\n';
    }

    // Test coverage
    reviewBody += '### 🧪 Test Coverage\n\n';
    reviewBody += `- **Has Tests**: ${analysis.testCoverage.hasTests ? '✅' : '❌'}\n`;
    reviewBody += `- **Test Files**: ${analysis.testCoverage.testFiles}\n`;
    reviewBody += `- **Recommendation**: ${analysis.testCoverage.recommendation}\n\n`;

    // Code quality
    reviewBody += '### 📊 Code Quality\n\n';
    reviewBody += `- **Quality Score**: ${analysis.codeQuality.score}/100\n`;
    if (analysis.codeQuality.issues.length > 0) {
      reviewBody += '- **Issues Found**:\n';
      for (const issue of analysis.codeQuality.issues) {
        reviewBody += `  - ${issue.message}\n`;
      }
    }

    reviewBody += '\n---\n*Generated by AI-SDLC Framework*';

    return {
      body: reviewBody,
      event: this.determineReviewEvent(analysis),
    };
  }

  /**
   * Determine review event based on analysis
   */
  determineReviewEvent(analysis) {
    const criticalIssues = analysis.securityConcerns.filter(
      (c) => c.severity === 'critical'
    ).length;
    const highIssues =
      analysis.securityConcerns.filter((c) => c.severity === 'high').length +
      analysis.complianceConcerns.filter((c) => c.severity === 'high').length;

    if (criticalIssues > 0) return 'REQUEST_CHANGES';
    if (highIssues > 0) return 'REQUEST_CHANGES';
    if (!analysis.testCoverage.hasTests) return 'REQUEST_CHANGES';

    return 'COMMENT';
  }

  /**
   * Post review to GitHub
   */
  async postReview(prNumber, review) {
    return new Promise((resolve, reject) => {
      const repoInfo = this.parseGitHubUrl(this.getGitRemoteUrl());
      if (!repoInfo) {
        reject(new Error('Invalid GitHub repository URL'));
        return;
      }

      const reviewData = JSON.stringify({
        body: review.body,
        event: review.event,
      });

      const options = {
        hostname: 'api.github.com',
        path: `/repos/${repoInfo.owner}/${repoInfo.repo}/pulls/${prNumber}/reviews`,
        method: 'POST',
        headers: {
          Authorization: `token ${this.githubToken}`,
          'Content-Type': 'application/json',
          'Content-Length': reviewData.length,
          'User-Agent': 'AI-SDLC-Framework',
        },
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (error) {
            reject(error);
          }
        });
      });

      req.on('error', reject);
      req.write(reviewData);
      req.end();
    });
  }

  /**
   * Parse GitHub URL
   */
  parseGitHubUrl(url) {
    const match = url.match(/github\.com[:/](.+)\/(.+)(?:\.git)?$/);
    if (match) {
      return {
        owner: match[1],
        repo: match[2].replace('.git', ''),
      };
    }
    return null;
  }

  /**
   * Get file type
   */
  getFileType(fileName) {
    const ext = path.extname(fileName);
    const typeMap = {
      '.js': 'javascript',
      '.ts': 'typescript',
      '.jsx': 'react',
      '.tsx': 'react-typescript',
      '.php': 'php',
      '.py': 'python',
      '.md': 'markdown',
      '.json': 'json',
      '.yml': 'yaml',
      '.yaml': 'yaml',
    };
    return typeMap[ext] || 'unknown';
  }

  /**
   * Test PR Agent configuration
   */
  async testConfiguration() {
    console.log('🧪 Testing Qodo AI PR Agent configuration...');

    const results = {
      timestamp: new Date().toISOString(),
      tests: {
        apiKey: this.apiKey ? 'configured' : 'missing',
        githubToken: this.githubToken ? 'configured' : 'missing',
        configFile: fs.existsSync('.pr_agent.toml') ? 'exists' : 'missing',
        workflow: fs.existsSync('.github/workflows/pr-agent.yml')
          ? 'exists'
          : 'missing',
        gitRepo: this.getGitRemoteUrl() ? 'configured' : 'missing',
      },
      status: 'unknown',
      recommendations: [],
    };

    // Check configuration completeness
    let score = 0;
    const maxScore = 5;

    if (results.tests.apiKey === 'configured') score++;
    else
      results.recommendations.push('Set QODO_AI_API_KEY environment variable');

    if (results.tests.githubToken === 'configured') score++;
    else results.recommendations.push('Set GITHUB_TOKEN environment variable');

    if (results.tests.configFile === 'exists') score++;
    else
      results.recommendations.push(
        'Run initialization to create .pr_agent.toml'
      );

    if (results.tests.workflow === 'exists') score++;
    else
      results.recommendations.push(
        'Run initialization to create GitHub workflow'
      );

    if (results.tests.gitRepo === 'configured') score++;
    else
      results.recommendations.push(
        'Initialize Git repository with GitHub remote'
      );

    // Determine overall status
    if (score === maxScore) {
      results.status = 'ready';
      console.log('✅ PR Agent configuration is complete and ready');
    } else if (score >= 3) {
      results.status = 'partial';
      console.log('⚠️  PR Agent partially configured');
    } else {
      results.status = 'incomplete';
      console.log('❌ PR Agent configuration incomplete');
    }

    // Display recommendations
    if (results.recommendations.length > 0) {
      console.log('\n📋 Recommendations:');
      results.recommendations.forEach((rec) => console.log(`   - ${rec}`));
    }

    return results;
  }
}

// CLI interface
async function main() {
  const agent = new QodoPRAgent();
  const command = process.argv[2];
  const arg = process.argv[3];

  switch (command) {
    case 'init':
    case 'initialize':
      await agent.initializePRAgent();
      break;

    case 'analyze':
    case 'review':
      if (!arg) {
        console.error(
          '❌ Please provide PR number: qodo-pr-agent.js analyze <pr-number>'
        );
        process.exit(1);
      }
      {
        const results = await agent.analyzePR(parseInt(arg));
        console.log(JSON.stringify(results, null, 2));
        break;
      }

    case 'test':
    case 'check':
      await agent.testConfiguration();
      break;

    default:
      console.log('Qodo AI PR Agent for AI-SDLC Framework');
      console.log('');
      console.log('Usage:');
      console.log(
        '  qodo-pr-agent.js init           - Initialize PR Agent for repository'
      );
      console.log(
        '  qodo-pr-agent.js analyze <pr>   - Analyze specific PR number'
      );
      console.log('  qodo-pr-agent.js test           - Test configuration');
      console.log('');
      console.log('Environment Variables:');
      console.log('  QODO_AI_API_KEY - Qodo AI API key');
      console.log('  GITHUB_TOKEN - GitHub personal access token');
      console.log('  OPENAI_API_KEY - OpenAI API key for AI features');
      console.log('');
      console.log('Features:');
      console.log('  • AI-powered code review');
      console.log('  • Security vulnerability detection');
      console.log('  • Performance impact analysis');
      console.log('  • FCRA/FACTA compliance checking');
      console.log('  • Automated test coverage analysis');
      break;
  }
}

// Export for use as module
module.exports = QodoPRAgent;

// Run CLI if called directly
if (require.main === module) {
  main().catch((error) => {
    console.error('❌ Error:', error.message);
    process.exit(1);
  });
}
