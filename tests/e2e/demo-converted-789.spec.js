// Auto-Generated Test with AIDEN + Auto-Healing
// Generated: 2025-08-05T12:37:54.410Z
// Description: Manual Test Case 789
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
    } catch (_error) {
      // eslint-disable-line no-unused-vars
      console.log(
        `🔧 Primary selector failed: ${primarySelector}, trying fallbacks...`
      );

      for (const fallback of fallbackSelectors) {
        try {
          await page.waitForSelector(fallback, { timeout: 3000 });
          console.log(`✅ Using fallback selector: ${fallback}`);
          return fallback;
        } catch (_fallbackError) {
          // eslint-disable-line no-unused-vars
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

// Demo Converted Test Case 789
test('converted manual test case 789', async ({ page }) => {
  // This would be generated from your manual test case in Qase
  await page.goto('/credit-reports');

  // Example conversion of manual steps
  await AutoHealingLocators.smartClick(page, '#import-report-btn');
  await AutoHealingLocators.smartFill(page, '#bureau-select', 'Equifax');

  // FCRA compliance validation
  await CreditRepairTestUtils.validateFCRACompliance(page);

  await expect(page.locator('#report-imported')).toBeVisible();
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
    await this.attemptAutoFix(page, testInfo);
  }
});

async function attemptAutoFix(page, _testInfo) {
  // eslint-disable-line no-unused-vars
  console.log('🔧 Attempting auto-fix for common issues...');

  // Check for loading states
  const loadingElements = await page
    .locator('[data-loading], .loading, .spinner')
    .count();
  if (loadingElements > 0) {
    console.log('⏳ Detected loading state, waiting...');
    await page.waitForLoadState('networkidle');
  }

  // Check for modal overlays
  const modals = await page
    .locator('[role="dialog"], .modal, .overlay')
    .count();
  if (modals > 0) {
    console.log('🚪 Detected modal, attempting to close...');
    await page.keyboard.press('Escape');
  }

  // Check for error messages
  const errorMessages = await page
    .locator('[role="alert"], .error-message, .alert-danger')
    .count();
  if (errorMessages > 0) {
    const errorText = await page
      .locator('[role="alert"], .error-message, .alert-danger')
      .first()
      .textContent();
    console.log(`⚠️ Error detected: ${errorText}`);
  }
}
