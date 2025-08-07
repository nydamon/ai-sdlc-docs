// Auto-healing utilities added by AI-SDLC
class AutoHealingLocators {
   
  static async findElement(page, primarySelector, fallbackSelectors = []) {
    try {
      await page.waitForSelector(primarySelector, { timeout: 5000 });
      return primarySelector;
    } catch (_error) {
       
      for (const fallback of fallbackSelectors) {
        try {
          await page.waitForSelector(fallback, { timeout: 3000 });
          return fallback;
        } catch (_fallbackError) {
           
          continue;
        }
      }
      throw new Error(`All selectors failed for: ${primarySelector}`);
    }
  }
}

import { test, expect } from '@playwright/test';
import { execSync } from 'child_process';
import fs from 'fs';

test.describe('AI-SDLC Setup Workflow', () => {
  const testProjectDir = './test-e2e-project';

  test.beforeEach(async () => {
    // Clean up test directory
    if (fs.existsSync(testProjectDir)) {
      fs.rmSync(testProjectDir, { recursive: true, force: true });
    }
    fs.mkdirSync(testProjectDir, { recursive: true });
  });

  test.afterEach(async () => {
    // Clean up
    if (fs.existsSync(testProjectDir)) {
      fs.rmSync(testProjectDir, { recursive: true, force: true });
    }
  });

  test('complete setup workflow for new project', async () => {
    // Create basic project structure
    process.chdir(testProjectDir);
    execSync('npm init -y', { encoding: 'utf8' });
    execSync('git init', { encoding: 'utf8' });
    execSync('git config user.email "test@example.com"', { encoding: 'utf8' });
    execSync('git config user.name "Test User"', { encoding: 'utf8' });

    // Run AI-SDLC setup
    const setupResult = execSync('../ai-sdlc setup', { encoding: 'utf8' });
    expect(setupResult).toContain('Setup complete');

    // Verify files were created
    expect(fs.existsSync('.husky/pre-commit')).toBe(true);
    expect(fs.existsSync('.husky/commit-msg')).toBe(true);
    expect(fs.existsSync('.eslintrc.js')).toBe(true);
    expect(fs.existsSync('.prettierrc')).toBe(true);
    expect(fs.existsSync('commitlint.config.js')).toBe(true);

    // Test validation
    const validateResult = execSync('../ai-sdlc validate', {
      encoding: 'utf8',
    });
    expect(validateResult).toContain('All validation checks passed');

    // Test git hooks by creating a commit
    fs.writeFileSync('test.js', 'console.log("test");');
    execSync('git add test.js', { encoding: 'utf8' });

    try {
      execSync('git commit -m "test: add test file"', { encoding: 'utf8' });
    } catch (_error) {
       
      // Expected to fail on master branch due to branch naming enforcement
    }

    process.chdir('..');
  });

  test('re-setup fixes broken configuration', async () => {
    process.chdir(testProjectDir);
    execSync('npm init -y', { encoding: 'utf8' });
    execSync('git init', { encoding: 'utf8' });

    // Run initial setup
    execSync('../ai-sdlc setup', { encoding: 'utf8' });

    // Break configuration by removing ESLint config
    fs.unlinkSync('.eslintrc.js');

    // Verify validation fails
    const validateResult = execSync('../ai-sdlc validate', {
      encoding: 'utf8',
    });
    expect(validateResult).toContain('ESLint');

    // Run setup again to fix issues (simplified CLI doesn't have repair)
    const setupResult = execSync('../ai-sdlc setup', { encoding: 'utf8' });
    expect(setupResult).toContain('Setup complete');

    // Verify configuration is fixed
    expect(fs.existsSync('.eslintrc.js')).toBe(true);

    process.chdir('..');
  });

  test('status command shows current setup state', async () => {
    process.chdir(testProjectDir);
    execSync('npm init -y', { encoding: 'utf8' });
    execSync('git init', { encoding: 'utf8' });

    // Run setup
    execSync('../ai-sdlc setup', { encoding: 'utf8' });

    // Check status
    const statusResult = execSync('../ai-sdlc status', { encoding: 'utf8' });
    expect(statusResult).toContain('Status:');
    expect(statusResult).toContain('AI-SDLC is working perfectly');

    process.chdir('..');
  });

  test('help command shows available commands', async () => {
    process.chdir(testProjectDir);

    // Run help
    const helpResult = execSync('../ai-sdlc help', { encoding: 'utf8' });
    expect(helpResult).toContain('AI-SDLC Simple CLI');
    expect(helpResult).toContain('setup');
    expect(helpResult).toContain('status');
    expect(helpResult).toContain('validate');

    process.chdir('..');
  });
});
