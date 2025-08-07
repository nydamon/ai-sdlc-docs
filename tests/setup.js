/**
 * Test setup file for AI-SDLC E2E tests
 * Provides global configuration and utilities for Playwright tests
 */

import { expect } from '@playwright/test';

// Global test timeout
const GLOBAL_TIMEOUT = 30000; // 30 seconds

// AI-SDLC specific test utilities
class TestUtils {
  /**
   * Wait for element with auto-healing fallbacks
   */
  static async waitForElement(page, primarySelector, fallbackSelectors = []) {
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

  /**
   * Credit repair specific test helpers
   */
  static async validateCreditScore(score) {
    expect(score).toBeGreaterThanOrEqual(300);
    expect(score).toBeLessThanOrEqual(850);
    expect(typeof score).toBe('number');
  }

  /**
   * FCRA compliance validation helper
   */
  static async checkFCRACompliance(page, _element) {
    // Check for required FCRA disclosures
    const hasDisclosure =
      (await page.locator('[data-fcra-disclosure]').count()) > 0;
    const hasPermissiblePurpose =
      (await page.locator('[data-permissible-purpose]').count()) > 0;

    expect(hasDisclosure || hasPermissiblePurpose).toBeTruthy();
  }

  /**
   * Auto-healing screenshot helper
   */
  static async captureDebugScreenshot(page, testInfo, prefix = 'debug') {
    const timestamp = Date.now();
    const filename = `${prefix}-${testInfo.title.replace(/[^a-z0-9]/gi, '_')}-${timestamp}.png`;

    await page.screenshot({
      path: `test-results/${filename}`,
      fullPage: true,
    });

    console.log(`📸 Screenshot saved: test-results/${filename}`);
  }
}

// Make utilities globally available
global.TestUtils = TestUtils;
global.GLOBAL_TIMEOUT = GLOBAL_TIMEOUT;

// Console enhancement for test debugging
const originalConsoleLog = console.log;
console.log = (...args) => {
  const timestamp = new Date().toISOString();
  originalConsoleLog(`[${timestamp}]`, ...args);
};

console.log('✅ AI-SDLC test setup loaded successfully');
console.log('🏦 Credit repair domain testing utilities initialized');
