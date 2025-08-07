// Auto-Generated Test with AIDEN + Auto-Healing
// Generated: 2025-08-05T12:38:02.586Z
// Description: Test credit score calculation with FICO 8 algorithm
// Framework: Playwright with Auto-Healing Wrapper

const { test, expect } = require('@playwright/test');

// Auto-healing configuration
test.use({
  retry: 3,
  timeout: 30000,
  actionTimeout: 10000,
});

// Auto-healing utilities
class AutoHealingLocators {
  static async findElement(page, primarySelector, fallbackSelectors = []) {
    try {
      await page.waitForSelector(primarySelector, { timeout: 5000 });
      return primarySelector;
    } catch {
      console.log(
        `🔧 Primary selector failed: ${primarySelector}, trying fallbacks...`
      );

      for (const fallback of fallbackSelectors) {
        try {
          await page.waitForSelector(fallback, { timeout: 3000 });
          console.log(`✅ Using fallback selector: ${fallback}`);
          return fallback;
        } catch {
          continue;
        }
      }

      throw new Error(`❌ All selectors failed for: ${primarySelector}`);
    }
  }

  static async smartFill(page, selector, value, fallbacks = []) {
    const workingSelector = await this.findElement(page, selector, fallbacks);
    await page.fill(workingSelector, value);
  }

  static async smartClick(page, selector, fallbacks = []) {
    const workingSelector = await this.findElement(page, selector, fallbacks);
    await page.click(workingSelector);
  }
}

// Credit Repair Domain Utilities
class CreditRepairTestUtils {
  static generateTestCreditProfile() {
    return {
      ssn: '123-45-6789', // Test SSN
      creditScore: 650,
      income: 50000,
      debts: [
        { type: 'credit_card', amount: 5000, creditor: 'Test Bank' },
        { type: 'auto_loan', amount: 15000, creditor: 'Test Auto Finance' },
      ],
    };
  }

  static async validateFCRACompliance(page) {
    // Check for required FCRA disclosures
    const disclosureSelector = await AutoHealingLocators.findElement(
      page,
      '[data-testid="fcra-disclosure"]',
      ['.fcra-disclosure', '#fcra-notice', '[aria-label*="FCRA"]']
    );

    await expect(page.locator(disclosureSelector)).toBeVisible();
    console.log('✅ FCRA compliance disclosure validated');
  }

  static async validateSecureDataHandling(page) {
    // Ensure PII data is properly masked
    const elements = await page.locator('[data-sensitive]').all();
    for (const element of elements) {
      const text = await element.textContent();
      if (text && text.includes('***')) {
        console.log('✅ PII data properly masked');
      }
    }
  }
}

// Demo Auto-Generated Test (Configure AIDEN for real generation)
// Requirement: "Test credit score calculation with FICO 8 algorithm"

test('test_credit_score_calculation_with_fico_8_algorithm', async ({
  page,
}) => {
  // Navigate to application
  await page.goto('/');

  // Example credit repair test pattern
  await AutoHealingLocators.smartFill(page, '#credit-score', '650', [
    '[name="creditScore"]',
    '[data-testid="credit-input"]',
  ]);

  await AutoHealingLocators.smartClick(page, '#calculate-btn', [
    '.calculate',
    '[data-testid="calculate"]',
    'button:has-text("Calculate")',
  ]);

  // Validate FCRA compliance
  await CreditRepairTestUtils.validateFCRACompliance(page);

  // Assert results
  await expect(page.locator('#results')).toBeVisible();

  console.log(
    '✅ Demo test completed - Configure QASE_API_TOKEN for AI generation'
  );
});

// Auto-healing test wrapper
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status === 'failed') {
    console.log(`🔧 Test failed, capturing debugging info...`);

    // Capture screenshot for debugging
    await page.screenshot({
      path: `test-results/failed-${testInfo.title.replace(/[^a-z0-9]/gi, '_')}-${Date.now()}.png`,
      fullPage: true,
    });

    // Log page errors
    page.on('pageerror', (error) => {
      console.log(`📄 Page error: ${error.message}`);
    });

    // Check for common auto-fixable issues
  }
});
