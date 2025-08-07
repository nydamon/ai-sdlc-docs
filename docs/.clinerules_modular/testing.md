# Testing Rules - Comprehensive Test Generation and Automation

## Test-First Development Approach

### Generate Tests During Code Creation (Not After)

- Write tests as you create new functionality
- Use TDD approach: write test, make it pass, refactor
- Aim for 100% coverage on critical business logic (credit calculations, compliance)
- Generate tests for edge cases and error conditions automatically

### Test Generation Strategy

```typescript
// Always follow this test generation pattern:

1. ANALYZE: Understand the code's purpose and business logic
2. IDENTIFY: Determine test types needed (unit, integration, E2E)
3. GENERATE: Create comprehensive test suites with domain knowledge
4. EXECUTE: Run tests and fix any failures immediately
5. VALIDATE: Ensure coverage thresholds are met
6. OPTIMIZE: Refactor tests for maintainability and performance
```

## Testing Framework Standards

### Vitest Configuration (Primary)

- **Framework**: Vitest for all JavaScript/TypeScript testing
- **Coverage Requirements**:
  - Lines: 80% minimum
  - Functions: 80% minimum
  - Branches: 70% minimum
- **Test Environment**: jsdom for React components, node for utilities
- **Mock Strategy**: Use vi.mock() for external dependencies

### Playwright E2E Testing

- **Framework**: Playwright for all end-to-end testing
- **Browser Coverage**: Chromium (primary), Firefox, WebKit
- **Auto-healing**: Implement selector fallbacks for maintenance
- **Visual Regression**: Screenshot comparison for UI components
- **Parallel Execution**: Run tests concurrently for speed

### Laravel/PHP Testing

- **Framework**: Pest for elegant PHP testing syntax
- **Database**: Use RefreshDatabase trait for isolation
- **Authentication**: Create test users with specific permissions
- **API Testing**: Test all endpoints with realistic data

## Test Structure and Patterns

### Unit Test Pattern

```typescript
describe('CreditScoreCalculator', () => {
  describe('calculateFICOScore', () => {
    it('should calculate correct FICO score with valid data', () => {
      // Arrange
      const creditData = {
        paymentHistory: 35, // 35% weight
        creditUtilization: 20,
        lengthOfHistory: 10,
        creditMix: 5,
        newCredit: 5,
      };

      // Act
      const score = calculateFICOScore(creditData);

      // Assert
      expect(score).toBeGreaterThanOrEqual(300);
      expect(score).toBeLessThanOrEqual(850);
      expect(score).toEqual(672);
    });

    // Always test edge cases
    it('should enforce FICO score boundaries', () => {
      expect(calculateFICOScore(extremelyBadData)).toEqual(300);
      expect(calculateFICOScore(perfectCreditData)).toEqual(850);
    });

    // Always test error conditions
    it('should throw error with invalid input', () => {
      expect(() => calculateFICOScore(null)).toThrow('Invalid credit data');
      expect(() => calculateFICOScore({})).toThrow('Missing required fields');
    });
  });
});
```

### Component Test Pattern

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

describe('CreditReportComponent', () => {
  const mockProps = {
    creditData: mockCreditReport,
    onDisputeClick: vi.fn(),
    loading: false
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render credit report data correctly', () => {
    render(<CreditReportComponent {...mockProps} />);

    expect(screen.getByTestId('credit-score')).toHaveTextContent('720');
    expect(screen.getByTestId('report-date')).toBeInTheDocument();
  });

  it('should handle user interactions', async () => {
    const user = userEvent.setup();
    render(<CreditReportComponent {...mockProps} />);

    const disputeButton = screen.getByTestId('dispute-button');
    await user.click(disputeButton);

    expect(mockProps.onDisputeClick).toHaveBeenCalledWith(mockCreditReport.id);
  });

  it('should display loading state', () => {
    render(<CreditReportComponent {...mockProps} loading={true} />);

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    expect(screen.queryByTestId('credit-score')).not.toBeInTheDocument();
  });

  // Always test accessibility
  it('should meet accessibility standards', () => {
    render(<CreditReportComponent {...mockProps} />);

    const creditScore = screen.getByTestId('credit-score');
    expect(creditScore).toHaveAttribute('aria-label');
    expect(creditScore).toHaveAttribute('role');
  });
});
```

### API Test Pattern

```php
<?php

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CreditReportApiTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    /** @test */
    public function it_returns_credit_report_with_valid_request()
    {
        $this->actingAs($this->user);

        $response = $this->postJson('/api/credit-reports', [
            'ssn' => '123-45-6789',
            'permissible_purpose' => 'credit_application'
        ]);

        $response->assertStatus(200)
                ->assertJsonStructure([
                    'data' => ['score', 'report_date', 'trade_lines'],
                    'meta' => ['audit_id', 'compliance_validated']
                ]);
    }

    /** @test */
    public function it_validates_fcra_compliance()
    {
        $this->actingAs($this->user);

        $response = $this->postJson('/api/credit-reports', [
            'ssn' => '123-45-6789',
            'permissible_purpose' => 'invalid_purpose'
        ]);

        $response->assertStatus(403)
                ->assertJson(['error' => 'FCRA violation']);
    }

    /** @test */
    public function it_creates_audit_trail()
    {
        $this->actingAs($this->user);

        $this->postJson('/api/credit-reports', [
            'ssn' => '123-45-6789',
            'permissible_purpose' => 'credit_application'
        ]);

        $this->assertDatabaseHas('audit_logs', [
            'action' => 'credit_report_access',
            'user_id' => $this->user->id
        ]);
    }
}
```

### E2E Test Pattern

```typescript
import { test, expect } from '@playwright/test';

test.describe('Credit Dispute Workflow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('[data-testid="email"]', 'test@example.com');
    await page.fill('[data-testid="password"]', 'password');
    await page.click('[data-testid="login-button"]');
    await expect(page).toHaveURL('/dashboard');
  });

  test('should complete full dispute submission', async ({ page }) => {
    // Navigate to dispute page
    await page.click('[data-testid="dispute-link"]');
    await expect(page.locator('h1')).toContainText('Dispute Items');

    // Load credit report
    await page.click('[data-testid="load-report"]');
    await page.waitForSelector('[data-testid="credit-report-loaded"]');

    // Select dispute items
    await page.check('[data-testid="dispute-item-1"]');
    await page.selectOption(
      '[data-testid="dispute-reason"]',
      'incorrect_balance'
    );

    // Add supporting documentation
    await page.setInputFiles(
      '[data-testid="file-upload"]',
      './test-files/bank-statement.pdf'
    );

    // Submit dispute
    await page.click('[data-testid="submit-dispute"]');

    // Verify success
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
    await expect(
      page.locator('[data-testid="confirmation-number"]')
    ).toBeVisible();

    // Verify audit trail
    const auditResponse = await page.waitForResponse(
      (response) =>
        response.url().includes('/api/audit-logs') && response.status() === 200
    );
    expect(auditResponse).toBeTruthy();
  });
});
```

## Domain-Specific Testing Requirements

### Credit Repair Compliance Testing

Always include these test patterns for credit-related functionality:

```typescript
// FCRA Compliance Tests
describe('FCRA Compliance', () => {
  it('should validate permissible purpose before credit access', () => {
    expect(() => {
      accessCreditReport(ssn, 'curiosity', context);
    }).toThrow(FCRAViolationError);
  });

  it('should create audit trail for all credit data access', () => {
    const auditSpy = jest.spyOn(auditLogger, 'log');

    accessCreditReport(ssn, 'credit_application', context);

    expect(auditSpy).toHaveBeenCalledWith({
      action: 'credit_access',
      user_id: context.userId,
      permissible_purpose: 'credit_application',
      timestamp: expect.any(Date),
    });
  });
});

// Credit Score Validation Tests
describe('Credit Score Validation', () => {
  it('should enforce 300-850 FICO range', () => {
    expect(calculateCreditScore(perfectCredit)).toBeLessThanOrEqual(850);
    expect(calculateCreditScore(worstCredit)).toBeGreaterThanOrEqual(300);
  });

  it('should handle missing credit data gracefully', () => {
    expect(() => calculateCreditScore(null)).toThrow('Invalid credit data');
    expect(() => calculateCreditScore({})).toThrow('Missing required fields');
  });
});

// PII Protection Tests
describe('PII Protection', () => {
  it('should encrypt SSN in database storage', () => {
    const consumer = Consumer.create({ ssn: '123-45-6789' });

    expect(consumer.encrypted_ssn).not.toEqual('123-45-6789');
    expect(consumer.getDecryptedSSN()).toEqual('123-45-6789');
  });

  it('should mask PII in logs and error messages', () => {
    const maskedSSN = maskPII('123-45-6789');
    expect(maskedSSN).toEqual('***-**-6789');
  });
});
```

## Performance and Security Testing

### Performance Test Patterns

```typescript
describe('Performance Tests', () => {
  it('should calculate credit scores within acceptable time', async () => {
    const startTime = performance.now();

    await calculateCreditScore(largeCreditDataset);

    const endTime = performance.now();
    expect(endTime - startTime).toBeLessThan(100); // 100ms threshold
  });

  it('should handle concurrent credit report requests', async () => {
    const promises = Array(10)
      .fill(null)
      .map(() => fetchCreditReport('test-consumer-id'));

    const results = await Promise.all(promises);
    expect(results).toHaveLength(10);
    expect(results.every((result) => result.score > 0)).toBe(true);
  });
});
```

### Security Test Patterns

```typescript
describe('Security Tests', () => {
  it('should prevent SQL injection in credit queries', () => {
    const maliciousInput = "'; DROP TABLE consumers; --";

    expect(() => {
      searchConsumers(maliciousInput);
    }).not.toThrow();

    // Verify table still exists
    expect(Consumer.count()).toBeGreaterThan(0);
  });

  it('should validate JWT tokens for API access', () => {
    const invalidToken = 'invalid.jwt.token';

    expect(() => {
      authenticateRequest(invalidToken);
    }).toThrow(AuthenticationError);
  });
});
```

## Test Execution and Maintenance

### Automated Test Execution

- Run tests on every commit (pre-commit hook)
- Execute full test suite in CI/CD pipeline
- Generate coverage reports for all test runs
- Alert on coverage drops below thresholds

### Test Maintenance Rules

- Update tests when requirements change
- Refactor tests when code structure changes
- Remove obsolete tests for deleted functionality
- Optimize slow-running tests for better CI performance
- Keep test data realistic but avoid production data

### Continuous Improvement

- Monitor test flakiness and fix unstable tests
- Analyze test coverage gaps and add missing tests
- Review test performance and optimize bottlenecks
- Update testing patterns based on team feedback

These testing rules ensure comprehensive, automated, and maintainable test coverage across The Credit Pros AI-SDLC framework while maintaining regulatory compliance and high code quality standards.
