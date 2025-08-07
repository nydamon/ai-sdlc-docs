# Advanced Cline Prompt Templates - 2025 Best Practices

## Plan & Act Mode Prompts

### Project Onboarding Template

Use this when starting work on a new project or major feature:

```markdown
# Project Onboarding - Plan Mode

I need to understand this project before making changes:

## Analysis Required:

1. **Codebase Structure**: Map out the key directories, files, and architecture patterns
2. **Technology Stack**: Identify frameworks, libraries, and tools in use
3. **Business Domain**: Understand the credit repair industry requirements
4. **Compliance Requirements**: Review FCRA, FACTA, and CROA implementation needs
5. **Testing Strategy**: Assess current test coverage and testing frameworks
6. **Performance Considerations**: Identify potential bottlenecks and optimization opportunities

## Deliverables:

- Comprehensive project analysis report
- Risk assessment for proposed changes
- Implementation roadmap with milestones
- Resource and dependency requirements

## Context:

Project: The Credit Pros AI-SDLC Framework
Domain: Credit repair and financial services
Regulatory Environment: FCRA/FACTA compliance required
Technology Focus: React, TypeScript, Laravel, AI integration

Please analyze the project thoroughly before proposing any implementation strategy.
```

### Feature Factory Template

For systematic feature development with AI assistance:

```markdown
# Feature Development - Plan & Act Mode

Feature Request: [FEATURE_NAME]

## Plan Mode Analysis:

1. **Requirements Gathering**:
   - [ ] Parse user requirements and acceptance criteria
   - [ ] Identify compliance implications (FCRA/FACTA)
   - [ ] Map to existing codebase patterns
   - [ ] Assess security and PII protection needs

2. **Technical Design**:
   - [ ] Component architecture design
   - [ ] API endpoint specifications
   - [ ] Database schema changes
   - [ ] Integration points identification

3. **Implementation Strategy**:
   - [ ] Break down into atomic tasks
   - [ ] Identify dependencies and blockers
   - [ ] Estimate development effort
   - [ ] Plan testing approach (unit, integration, E2E)

4. **Risk Assessment**:
   - [ ] Compliance risks
   - [ ] Performance impact
   - [ ] Security considerations
   - [ ] Breaking changes

## Act Mode Execution:

Only proceed to implementation after plan approval:

- [ ] Create/modify components following TCP patterns
- [ ] Implement API endpoints with proper validation
- [ ] Add comprehensive test coverage (80%+ required)
- [ ] Update documentation
- [ ] Perform security review
- [ ] Verify compliance requirements

## Success Criteria:

- All tests pass with required coverage
- No ESLint errors or TypeScript warnings
- Security review completed
- Compliance validation passed
- Performance benchmarks met
```

### Code Review Master Template

For thorough code review with AI assistance:

```markdown
# Comprehensive Code Review - AI Assisted

## Review Focus Areas:

### 1. Code Quality Analysis

- [ ] **TypeScript/JavaScript Standards**:
  - Strict type checking enabled
  - Proper error handling implementation
  - Consistent naming conventions
  - Import organization (external, internal, relative)

- [ ] **React Best Practices**:
  - Component memoization where appropriate
  - Proper hook usage and dependencies
  - Accessibility standards (WCAG 2.1 AA)
  - Performance optimizations

- [ ] **Laravel/PHP Standards**:
  - Service layer pattern implementation
  - Request validation classes
  - Resource classes for API responses
  - Proper middleware usage

### 2. Security Review

- [ ] **PII Protection**:
  - No PII in logs or error messages
  - Proper data encryption implementation
  - Secure API endpoints with authentication
  - Input validation and sanitization

- [ ] **Authentication & Authorization**:
  - JWT token validation
  - Role-based access control
  - API security headers
  - CSRF protection

### 3. Compliance Validation

- [ ] **FCRA Requirements**:
  - Permissible purpose validation
  - Audit trail implementation
  - Dispute resolution compliance
  - Consumer notification requirements

- [ ] **FACTA Requirements**:
  - Red flags detection
  - Data truncation rules
  - Identity theft prevention
  - Secure data disposal

### 4. Performance Assessment

- [ ] **Code Performance**:
  - Database query optimization
  - Memory usage patterns
  - Bundle size optimization
  - Network request efficiency

- [ ] **Testing Coverage**:
  - Unit tests (80% coverage minimum)
  - Integration tests for API endpoints
  - E2E tests for critical workflows
  - Security tests for vulnerabilities

## Review Checklist:

- [ ] All tests pass and coverage requirements met
- [ ] No security vulnerabilities identified
- [ ] Compliance requirements satisfied
- [ ] Performance benchmarks achieved
- [ ] Code follows established patterns
- [ ] Documentation updated appropriately

## Action Items:

Generate specific, actionable feedback for each violation or improvement opportunity.
```

### Bug Detective Template

For systematic bug investigation and resolution:

```markdown
# Bug Investigation & Resolution

Bug Report: [BUG_DESCRIPTION]
Priority: [HIGH/MEDIUM/LOW]
Affected Components: [LIST_COMPONENTS]

## Investigation Phase:

### 1. Problem Analysis

- [ ] **Reproduce the Issue**:
  - Steps to reproduce consistently
  - Environment and browser details
  - User permissions and context
  - Input data that triggers the bug

- [ ] **Root Cause Analysis**:
  - Error logs and stack traces
  - Database query performance
  - Network request failures
  - State management issues

### 2. Impact Assessment

- [ ] **User Impact**:
  - Number of users affected
  - Business process disruption
  - Data integrity concerns
  - Compliance implications

- [ ] **Technical Impact**:
  - Performance degradation
  - Security vulnerabilities
  - System stability issues
  - Integration failures

### 3. Solution Strategy

- [ ] **Fix Approach**:
  - Immediate hotfix vs. comprehensive solution
  - Backward compatibility requirements
  - Database migration needs
  - Configuration changes required

## Resolution Phase:

### 1. Implementation

- [ ] **Code Changes**:
  - Implement fix following established patterns
  - Add error handling and validation
  - Update related documentation
  - Ensure no regression issues

- [ ] **Testing Strategy**:
  - Create test case reproducing the bug
  - Verify fix resolves the issue
  - Run full test suite for regressions
  - Perform manual testing in staging

### 2. Validation

- [ ] **Quality Assurance**:
  - Code review completed
  - Security implications assessed
  - Performance impact evaluated
  - Compliance requirements maintained

## Post-Resolution:

- [ ] Deploy to staging environment
- [ ] User acceptance testing
- [ ] Production deployment plan
- [ ] Monitoring and rollback strategy
```

## Multi-Model AI Strategy Templates

### Task Routing Template

For intelligent AI model selection:

```markdown
# AI Model Selection Strategy

Task: [TASK_DESCRIPTION]
Complexity: [LOW/MEDIUM/HIGH/CRITICAL]

## Model Selection Logic:

### GPT-4o-mini (80% of tasks - Cost Optimized)

**Use for**:

- Routine code generation and modification
- Standard test case creation
- Documentation updates
- Simple bug fixes
- Pattern-based implementations

**Characteristics**:

- Fast response time
- Cost-effective
- Good for well-defined patterns
- Reliable for standard operations

### Claude 3.5 Sonnet (Complex Analysis - High Accuracy)

**Use for**:

- Architecture decisions and system design
- Complex business logic implementation
- Compliance and security reviews
- Multi-file refactoring projects
- Advanced problem-solving scenarios

**Characteristics**:

- Superior reasoning capabilities
- Better context understanding
- Excellent for complex analysis
- Higher accuracy for difficult tasks

### DeepSeek-R1 (Planning Tasks - 97% Cost Reduction)

**Use for**:

- Project planning and strategy
- Requirement analysis and breakdown
- Risk assessment and mitigation
- Resource planning and estimation
- Long-term architectural planning

**Characteristics**:

- Exceptional planning capabilities
- Cost-effective for large context
- Strong analytical reasoning
- Ideal for strategic thinking

## Decision Matrix:
```

| Task Type           | Complexity  | Recommended Model | Reasoning                               |
| ------------------- | ----------- | ----------------- | --------------------------------------- |
| Code Generation     | Low-Medium  | GPT-4o-mini       | Fast, cost-effective, proven patterns   |
| Architecture Review | High        | Claude 3.5 Sonnet | Complex analysis, context understanding |
| Project Planning    | High        | DeepSeek-R1       | Strategic thinking, cost-effective      |
| Bug Investigation   | Medium-High | Claude 3.5 Sonnet | Detailed analysis, problem-solving      |
| Documentation       | Low         | GPT-4o-mini       | Standard patterns, quick turnaround     |

````

## Memory Bank Integration Templates

### Context Loading Template
For leveraging project memory effectively:

```markdown
# Context Integration - Memory Bank Utilization

## Required Context Files:
Before starting any development task, load relevant context:

### Business Context
- [ ] `memory_bank/project_brief.md` - Business requirements and goals
- [ ] `memory_bank/compliance_rules.md` - FCRA/FACTA requirements

### Technical Context
- [ ] `memory_bank/tech_stack.md` - Technology choices and versions
- [ ] `memory_bank/architecture.md` - System design and patterns
- [ ] `memory_bank/coding_standards.md` - Code conventions and styles

### Implementation Context
- [ ] `memory_bank/common_patterns.md` - Reusable code templates
- [ ] `.clinerules_modular/core.md` - Core development rules
- [ ] `.clinerules_modular/testing.md` - Testing requirements

## Context Application Strategy:
1. **Load Relevant Context**: Only load files relevant to the current task
2. **Apply Patterns**: Use established patterns from memory bank
3. **Maintain Consistency**: Ensure new code matches existing conventions
4. **Update Memory**: Suggest updates if new patterns are discovered

## Context Optimization:
- Use smart caching for frequently accessed patterns
- Implement context compression for large codebases
- Prioritize recent and relevant information
- Remove outdated or irrelevant context
````

### Pattern Recognition Template

For identifying and applying code patterns:

```markdown
# Pattern Recognition & Application

Task: [IMPLEMENTATION_TASK]

## Pattern Analysis:

### 1. Identify Applicable Patterns

Scan memory bank for patterns matching:

- [ ] **Component Type**: React component, API endpoint, service class
- [ ] **Business Logic**: Credit scoring, dispute processing, compliance
- [ ] **Technical Requirements**: Authentication, validation, testing
- [ ] **Industry Compliance**: FCRA, FACTA, CROA patterns

### 2. Pattern Matching

From `memory_bank/common_patterns.md`, identify:

- [ ] **Exact Matches**: Direct pattern application possible
- [ ] **Similar Patterns**: Adaptation required
- [ ] **Pattern Gaps**: New pattern needed

### 3. Implementation Strategy

- [ ] **Reuse Existing**: Apply proven patterns directly
- [ ] **Adapt Patterns**: Modify existing patterns for new requirements
- [ ] **Create New**: Develop new patterns following established conventions
- [ ] **Document Patterns**: Update memory bank with new patterns

## Quality Assurance:

- [ ] Pattern follows established conventions
- [ ] Maintains consistency with existing codebase
- [ ] Includes proper error handling and validation
- [ ] Has comprehensive test coverage
- [ ] Meets compliance requirements
```

## Advanced Testing Templates

### Test Generation Template

For comprehensive AI-driven test creation:

````markdown
# AI Test Generation Strategy

Target: [FILE_OR_COMPONENT_PATH]
Test Types: [UNIT/INTEGRATION/E2E]

## Analysis Phase:

### 1. Code Understanding

- [ ] **Function Analysis**: Identify all public methods and their purposes
- [ ] **Business Logic**: Understand domain-specific requirements
- [ ] **Edge Cases**: Identify boundary conditions and error scenarios
- [ ] **Dependencies**: Map external dependencies and mocking requirements

### 2. Test Strategy Planning

- [ ] **Coverage Goals**: Target 80%+ line coverage, 80%+ function coverage
- [ ] **Test Categories**:
  - Happy path scenarios
  - Edge cases and boundaries
  - Error conditions and exceptions
  - Security and validation tests
  - Performance and load tests (if applicable)

## Implementation Phase:

### 1. Test Structure

```typescript
describe('[COMPONENT_NAME]', () => {
  // Setup and teardown
  beforeEach(() => {
    // Test setup
  });

  afterEach(() => {
    // Cleanup
  });

  describe('[FEATURE_GROUP]', () => {
    it('should [EXPECTED_BEHAVIOR] when [CONDITIONS]', () => {
      // Arrange
      // Act
      // Assert
    });
  });
});
```
````

### 2. Test Categories

- [ ] **Happy Path Tests**: Normal operation scenarios
- [ ] **Edge Case Tests**: Boundary conditions and limits
- [ ] **Error Handling Tests**: Exception and error scenarios
- [ ] **Integration Tests**: Component interaction testing
- [ ] **Compliance Tests**: FCRA/FACTA requirement validation
- [ ] **Security Tests**: Input validation and PII protection

## Validation Phase:

- [ ] All tests pass consistently
- [ ] Coverage thresholds met
- [ ] Tests follow established patterns
- [ ] Mock objects properly configured
- [ ] Assertions are specific and meaningful

````

### E2E Test Automation Template
For comprehensive end-to-end testing:

```markdown
# E2E Test Automation - Credit Repair Workflows

Workflow: [WORKFLOW_NAME]
User Journey: [USER_JOURNEY_DESCRIPTION]

## Test Planning:

### 1. User Journey Mapping
- [ ] **Entry Point**: How users access the feature
- [ ] **Authentication**: Login and permission requirements
- [ ] **Main Flow**: Primary user actions and expected outcomes
- [ ] **Alternative Paths**: Different user scenarios and edge cases
- [ ] **Exit Conditions**: Success states and error handling

### 2. Test Data Requirements
- [ ] **Consumer Data**: Test consumer profiles with varying credit scenarios
- [ ] **Dispute Data**: Various dispute types and supporting documentation
- [ ] **User Accounts**: Different permission levels and roles
- [ ] **Mock APIs**: Credit bureau and external service responses

## Implementation Strategy:

### 1. Page Object Pattern
```typescript
export class CreditDisputePage {
  constructor(private page: Page) {}

  async navigateToDisputes(): Promise<void> {
    await this.page.click('[data-testid="disputes-menu"]');
    await this.page.waitForURL('**/disputes');
  }

  async selectDisputeItem(itemDescription: string): Promise<void> {
    await this.page.check(`[data-testid="dispute-item"][aria-label="${itemDescription}"]`);
  }

  async submitDispute(): Promise<void> {
    await this.page.click('[data-testid="submit-dispute"]');
    await this.page.waitForSelector('[data-testid="dispute-confirmation"]');
  }
}
````

### 2. Test Scenarios

- [ ] **Credit Report Loading**: Verify report loads with correct data
- [ ] **Dispute Item Selection**: Test single and multiple item selection
- [ ] **Supporting Documents**: File upload and validation
- [ ] **Form Validation**: Required field and format validation
- [ ] **Submission Process**: Complete dispute submission workflow
- [ ] **Confirmation Display**: Success messages and next steps
- [ ] **Error Handling**: Network failures and validation errors

## Compliance Validation:

- [ ] **FCRA Compliance**: Proper permissible purpose validation
- [ ] **Audit Trail**: All actions properly logged
- [ ] **Consumer Rights**: Proper notifications and disclosures
- [ ] **Data Protection**: PII handling and encryption verification

```

These advanced prompt templates leverage 2025 best practices for Cline AI configuration, incorporating Plan & Act mode workflows, multi-model AI strategies, and comprehensive testing automation for The Credit Pros AI-SDLC framework.
```
