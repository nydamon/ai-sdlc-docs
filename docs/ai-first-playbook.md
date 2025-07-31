# AI-First Development Playbook

## Overview
This playbook defines when, how, and why to use AI tools in our development workflow. It ensures consistent AI adoption while maintaining code quality and security standards.

## AI Tools in Our Stack

### Primary AI Tools
| Tool | Use Case | Trust Level | Human Review Required |
|------|----------|-------------|----------------------|
| **Cursor IDE** | Code generation, refactoring | High | For security components |
| **CodiumAI** | Test generation, code review | High | For critical paths |
| **GitHub Copilot** | Code completion, suggestions | Medium | For complex logic |
| **v0.dev** | Component scaffolding | Medium | Always |
| **ChatGPT/Claude** | Architecture planning, debugging | Low | Always |

### Specialized Tools
| Tool | Use Case | Integration |
|------|----------|-------------|
| **PostHog AI** | User behavior analysis | Client frontend only |
| **SonarQube AI** | Code quality insights | Automated in CI/CD |
| **Qase AI** | Test case generation | Test management |

## When to Use AI

### ✅ **High-Trust Scenarios (Minimal Review)**
```yaml
Code Generation:
  - CRUD operations and basic controllers
  - Standard React components (non-critical)
  - Utility functions and helpers
  - API endpoint boilerplate
  - Database migrations (simple)
  - Unit test generation
  - Documentation and comments

Refactoring:
  - Code formatting and style improvements
  - Simple performance optimizations
  - Type safety improvements
  - Dependency updates
```

### ⚠️ **Medium-Trust Scenarios (Peer Review Required)**
```yaml
Business Logic:
  - Complex algorithms
  - Data validation logic
  - API integrations
  - State management
  - Error handling patterns
  - Performance-critical code

Frontend Components:
  - User interaction handling
  - Form validations
  - Routing logic
  - Component lifecycle management
```

### 🚨 **Low-Trust Scenarios (Senior + Security Review)**
```yaml
Security-Critical:
  - Authentication and authorization
  - Payment processing
  - Data encryption/decryption
  - API security middleware
  - User permission systems
  - Session management

Infrastructure:
  - Database schema changes
  - Environment configurations
  - Deployment scripts
  - Security configurations
  - CI/CD pipeline modifications
```

## AI Usage Guidelines by Role

### Junior Developer
```yaml
Allowed AI Usage: 60% max per feature
Mandatory Review: All AI-generated code
AI Tools Access: Cursor, CodiumAI (supervised)
Restrictions:
  - No security-related code generation
  - No database schema modifications
  - No production configuration changes
Required Training: 8 hours AI best practices
```

### Mid-Level Developer  
```yaml
Allowed AI Usage: 75% max per feature
Mandatory Review: Security and business logic only
AI Tools Access: Full stack except admin tools
Restrictions:
  - No authentication system changes
  - No payment processing modifications
Can Review: Junior developer AI code
Required Training: 4 hours advanced AI usage
```

### Senior Developer
```yaml
Allowed AI Usage: 85% max per feature
Mandatory Review: Security-critical components only
AI Tools Access: Full access including admin tools
Responsibilities:
  - Review all AI-generated security code
  - Approve AI usage exceptions
  - Train junior developers
Can Override: AI governance rules (with justification)
```

### Tech Lead/Architect
```yaml
Allowed AI Usage: No limits
Mandatory Review: None (trusted judgment)
Responsibilities:
  - Set AI usage policies
  - Approve architectural AI decisions
  - Review AI governance metrics
  - Handle AI tool failures/incidents
```

## Technology-Specific AI Guidelines

### Laravel Backend AI Usage
```php
// ✅ High-Trust: Basic CRUD Controller
class PostController extends Controller
{
    // AI Prompt: "Generate a Laravel resource controller for Post model with validation"
    public function store(StorePostRequest $request)
    {
        $post = Post::create($request->validated());
        return new PostResource($post);
    }
}

// ⚠️ Medium-Trust: Business Logic (Needs Review)
class PaymentProcessor 
{
    // AI Prompt: "Generate payment processing logic with error handling"
    // ❗ Requires senior developer review
    public function processPayment(PaymentRequest $request) {
        // Complex business logic here
    }
}

// 🚨 Low-Trust: Authentication (Security Review Required)
class AuthController extends Controller
{
    // AI Prompt: "Generate secure authentication controller"
    // ❗ Requires security engineer review
    public function login(LoginRequest $request) {
        // Authentication logic - MUST be manually reviewed
    }
}
```

### TypeScript Client Frontend AI Usage
```typescript
// ✅ High-Trust: Basic Component
// AI Prompt: "Generate a TypeScript React component with PostHog tracking"
interface FeatureCardProps {
  title: string;
  description: string;
  onActivate: () => void;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  onActivate 
}) => {
  const handleClick = () => {
    posthog.capture('feature_activated', { feature: title });
    onActivate();
  };

  return (
    <div onClick={handleClick} data-feature={title}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

// ⚠️ Medium-Trust: Complex Hook (Needs Review)
// AI Prompt: "Generate a custom hook for API data fetching with error handling"
export const useApiData = (endpoint: string) => {
  // Complex state management logic
  // ❗ Requires peer review for error handling
};

// 🚨 Low-Trust: Payment Component (Security Review)
// AI Prompt: "Generate secure payment form component"
export const PaymentForm: React.FC = () => {
  // Payment handling logic
  // ❗ Requires security review before deployment
};
```

### JavaScript Admin Frontend AI Usage
```javascript
// ✅ High-Trust: Admin Component
// AI Prompt: "Generate admin dashboard component with PropTypes"
const AdminDashboard = ({ metrics, users, onRefresh }) => {
  return (
    <div className="admin-dashboard">
      <MetricsPanel metrics={metrics} />
      <UsersList users={users} />
      <button onClick={onRefresh}>Refresh</button>
    </div>
  );
};

AdminDashboard.propTypes = {
  metrics: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  onRefresh: PropTypes.func.isRequired
};

// ⚠️ Medium-Trust: Data Processing (Needs Review)
// AI Prompt: "Generate admin data processing utilities"
const processAdminData = (rawData) => {
  // Data transformation logic
  // ❗ Requires review for data integrity
};
```

## Prompt Templates Library

### Code Generation Prompts
```markdown
### Laravel Controller Prompt
Generate a Laravel resource controller with the following requirements:
- Use Form Request validation
- Include proper error handling
- Add OpenAPI documentation
- Follow Laravel best practices
- Generate corresponding Pest tests

Model: {model_name}
Relationships: {relationships}
Business Rules: {business_rules}

### React Component Prompt
Create a React TypeScript component with:
- Proper TypeScript interfaces
- Accessibility attributes (ARIA)
- Error boundaries
- PostHog event tracking (client only)
- Comprehensive tests
- Storybook documentation

Component: {component_name}
Props: {props_interface}
Behavior: {component_behavior}

### Test Generation Prompt
Generate comprehensive tests for this code:
- Cover all public methods/functions
- Include edge cases and error scenarios
- Mock external dependencies
- Test user interactions
- Ensure accessibility compliance

Framework: {test_framework}
Coverage Target: 90%+
```

### Code Review Prompts
```markdown
### Security Review Prompt
Perform a security audit of this code:
- Check for authentication/authorization issues
- Identify potential injection vulnerabilities
- Review data validation and sanitization
- Check for exposed sensitive information
- Validate encryption usage
- Review API security

Code Type: {backend|frontend|full-stack}
Security Level: {low|medium|high|critical}

### Performance Review Prompt
Analyze this code for performance issues:
- Identify potential bottlenecks
- Review database query optimization
- Check for unnecessary computations
- Analyze bundle size impact (frontend)
- Review caching opportunities
- Suggest optimizations

Target: {web|mobile|api}
Performance Budget: {constraints}
```

## AI Quality Gates

### Pre-Commit AI Checks
```yaml
Automated Checks:
  - AI-generated code formatting
  - Basic security pattern detection
  - Test generation for new functions
  - Documentation generation
  - Import organization

Manual Checks Required:
  - Security-critical code review
  - Business logic validation
  - API contract changes
  - Database schema modifications
```

### CI/CD AI Integration
```yaml
Pipeline Stages:
  1. AI Code Quality Scan (SonarQube + AI)
  2. AI-Generated Test Execution
  3. AI Security Review (GitGuardian + Custom)
  4. AI Performance Analysis
  5. AI Documentation Validation

Failure Triggers:
  - Security vulnerabilities detected
  - Test coverage below 85%
  - Performance regression > 10%
  - Documentation completeness < 90%
```

## AI Governance Metrics

### Usage Tracking
```typescript
interface AIUsageMetrics {
  developer: string;
  tool: string;
  codeGenerated: number; // lines
  timesSaved: number; // minutes
  reviewTime: number; // minutes
  issuesFound: number;
  securityFlags: number;
}

// Weekly AI Governance Report
const generateAIReport = () => ({
  totalAICode: calculateAICodePercentage(),
  qualityMetrics: getAICodeQualityScores(),
  securityIncidents: getAISecurityIssues(),
  developerProductivity: getProductivityGains(),
  recommendations: generateRecommendations()
});
```

### Quality Thresholds
```yaml
Code Quality Gates:
  AI Code Coverage: < 80% per feature
  Human Review Rate: > 95% for security code
  Bug Rate: AI code bug rate < 2x manual code
  Performance: No regression > 5%

Alert Triggers:
  Security Pattern Detected: Immediate review
  High AI Usage: > 90% in single feature
  Quality Degradation: Bug rate increase
  Policy Violation: Unauthorized AI tool usage
```

## AI Tool Failure Procedures

### Fallback Strategies
```yaml
Cursor/CodiumAI Unavailable:
  1. Switch to GitHub Copilot
  2. Use manual development (time estimates x2)
  3. Prioritize critical features only
  4. Document technical debt created

PostHog AI Down:
  1. Use manual analytics review
  2. Switch to basic event tracking
  3. Schedule enhanced analysis post-recovery

Complete AI Tool Failure:
  1. Activate manual development procedures
  2. Extend sprint timelines by 40%
  3. Focus on bug fixes and critical features
  4. Document lessons learned
```

### Emergency Contacts
```yaml
AI Tool Issues:
  - CodiumAI: Support ticket + Slack escalation
  - Cursor: GitHub issue + Twitter DM
  - PostHog: In-app support + email

Internal Escalation:
  - Tech Lead: Immediate notification
  - DevOps: Infrastructure-related AI issues  
  - Security: AI security concerns
  - Management: Productivity impact > 25%
```

## Training & Certification

### Onboarding Checklist
```yaml
Week 1 - AI Tool Familiarization:
  - [ ] Cursor IDE setup and basic usage
  - [ ] CodiumAI integration training
  - [ ] Prompt engineering basics
  - [ ] Security awareness training

Week 2 - Framework-Specific Training:
  - [ ] Laravel AI best practices
  - [ ] React AI development patterns
  - [ ] Testing with AI assistance
  - [ ] Code review standards

Week 3 - Advanced Usage:
  - [ ] Custom prompt creation
  - [ ] AI debugging techniques
  - [ ] Performance optimization with AI
  - [ ] Security review processes

Assessment:
  - [ ] Complete AI development task
  - [ ] Pass security quiz (90%+)
  - [ ] Demonstrate code review skills
  - [ ] Show prompt engineering competency
```

### Ongoing Education
```yaml
Monthly Requirements:
  - AI tool updates and new features
  - Security best practices review
  - New prompt template training
  - AI governance policy updates

Quarterly Reviews:
  - Individual AI usage analysis
  - Team productivity assessment
  - Tool effectiveness evaluation
  - Policy adjustment recommendations
```

## Success Metrics

### Developer Productivity
- **Target**: 50% reduction in development time for routine tasks
- **Measurement**: Story point velocity with/without AI
- **Review**: Weekly team retrospectives

### Code Quality
- **Target**: Maintain 85%+ test coverage with AI-generated tests
- **Measurement**: SonarQube quality gates + manual review
- **Review**: Monthly quality reports

### Security Posture
- **Target**: Zero security incidents from AI-generated code
- **Measurement**: GitGuardian scans + security reviews
- **Review**: Quarterly security assessments

### AI Adoption
- **Target**: 80% of development tasks use AI assistance
- **Measurement**: Git commit analysis + developer surveys  
- **Review**: Monthly adoption tracking

---

**This playbook should be reviewed and updated monthly based on team feedback and AI tool evolution.**

**Next Steps:**
1. **Week 1**: Team training on AI guidelines
2. **Week 2**: Implement usage tracking
3. **Week 3**: Deploy quality gates
4. **Week 4**: First governance review