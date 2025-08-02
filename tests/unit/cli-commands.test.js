import { describe, it, expect } from 'vitest';
import { execSync } from 'child_process';
import fs from 'fs';

describe('AI-SDLC CLI Commands', () => {
  describe('Help and Version Commands', () => {
    it('should show help information', () => {
      const result = execSync('./ai-sdlc --help', { encoding: 'utf8' });
      expect(result).toContain('AI-SDLC Command Utility');
      expect(result).toContain('init');
      expect(result).toContain('validate');
      expect(result).toContain('repair');
    });

    it('should show version information', () => {
      const result = execSync('./ai-sdlc --version', { encoding: 'utf8' });
      expect(result).toContain('v1.0.0');
    });
  });

  describe('Status Command', () => {
    it('should show current status', () => {
      const result = execSync('./ai-sdlc status', { encoding: 'utf8' });
      expect(result).toContain('Status:');
    });
  });

  describe('Validation Command', () => {
    it('should run validation checks', () => {
      const result = execSync('./ai-sdlc validate', { encoding: 'utf8' });
      expect(result).toContain('validation');
      expect(result).toContain('Success rate: 92%');
    });

    it('should generate validation report', () => {
      execSync('./ai-sdlc validate', { encoding: 'utf8' });
      expect(fs.existsSync('AI_SDLC_VALIDATION_REPORT.md')).toBe(true);
      
      const report = fs.readFileSync('AI_SDLC_VALIDATION_REPORT.md', 'utf8');
      expect(report).toContain('AI-SDLC Framework Validation Report');
      expect(report).toContain('Validation Score:');
    });
  });

  describe('Configuration Files', () => {
    it('should have valid ESLint configuration', () => {
      expect(fs.existsSync('eslint.config.js')).toBe(true);
      
      // Test that the config file exists and contains expected content
      const config = fs.readFileSync('eslint.config.js', 'utf8');
      expect(config).toContain('defineConfig');
    });

    it('should have valid Prettier configuration', () => {
      expect(fs.existsSync('.prettierrc')).toBe(true);
      
      const config = fs.readFileSync('.prettierrc', 'utf8');
      expect(() => JSON.parse(config)).not.toThrow();
    });

    it('should have valid package.json', () => {
      expect(fs.existsSync('package.json')).toBe(true);
      
      const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      expect(pkg.name).toBe('ai-sdlc-framework');
      expect(pkg.scripts).toBeDefined();
      expect(pkg.scripts.test).toBeDefined();
    });

    it('should have valid semantic release configuration', () => {
      expect(fs.existsSync('.releaserc.json')).toBe(true);
      
      const config = JSON.parse(fs.readFileSync('.releaserc.json', 'utf8'));
      expect(config.branches).toBeDefined();
      expect(config.plugins).toBeDefined();
    });
  });

  describe('Git Hooks', () => {
    it('should have Husky directory', () => {
      expect(fs.existsSync('.husky')).toBe(true);
    });

    it('should have pre-commit hook', () => {
      expect(fs.existsSync('.husky/pre-commit')).toBe(true);
      
      const hook = fs.readFileSync('.husky/pre-commit', 'utf8');
      expect(hook).toContain('npx lint-staged');
      expect(hook).toContain('branch_name');
    });

    it('should have commit-msg hook', () => {
      expect(fs.existsSync('.husky/commit-msg')).toBe(true);
      
      const hook = fs.readFileSync('.husky/commit-msg', 'utf8');
      expect(hook).toContain('commitlint');
    });
  });

  describe('Dependencies', () => {
    it('should have all required devDependencies', () => {
      const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      const requiredDeps = [
        'husky',
        'lint-staged',
        'eslint',
        'prettier',
        '@commitlint/cli',
        '@commitlint/config-conventional',
        'vitest',
        '@playwright/test',
        'semantic-release'
      ];

      requiredDeps.forEach(dep => {
        expect(pkg.devDependencies[dep]).toBeDefined();
      });
    });

    it('should have valid lint-staged configuration', () => {
      const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      expect(pkg['lint-staged']).toBeDefined();
      expect(pkg['lint-staged']['*.{js,jsx,ts,tsx}']).toBeDefined();
    });
  });
});