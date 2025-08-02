import { describe, it, expect } from 'vitest';
import { execSync } from 'child_process';
import fs from 'fs';

describe('AI-SDLC Validation Tests', () => {
  describe('Prerequisites Validation', () => {
    it('should validate Node.js version', () => {
      const result = execSync('./validate-ai-sdlc.sh', { encoding: 'utf8' });
      expect(result).toContain('Node.js');
      expect(result).toMatch(/v\d+\.\d+\.\d+/);
    });

    it('should validate npm availability', () => {
      const result = execSync('./validate-ai-sdlc.sh', { encoding: 'utf8' });
      expect(result).toContain('npm');
    });

    it('should validate Git availability', () => {
      const result = execSync('./validate-ai-sdlc.sh', { encoding: 'utf8' });
      expect(result).toContain('Git');
    });
  });

  describe('Project Structure Validation', () => {
    it('should validate Git repository', () => {
      const result = execSync('./validate-ai-sdlc.sh', { encoding: 'utf8' });
      expect(result).toContain('Git repository');
    });

    it('should validate package.json existence', () => {
      const result = execSync('./validate-ai-sdlc.sh', { encoding: 'utf8' });
      expect(result).toContain('package.json');
    });
  });

  describe('Git Hooks Validation', () => {
    it('should validate Husky installation', () => {
      const result = execSync('./validate-ai-sdlc.sh', { encoding: 'utf8' });
      expect(result).toContain('Husky');
    });

    it('should validate pre-commit hook', () => {
      const result = execSync('./validate-ai-sdlc.sh', { encoding: 'utf8' });
      expect(result).toContain('Pre-commit hook');
    });

    it('should validate commit message hook', () => {
      const result = execSync('./validate-ai-sdlc.sh', { encoding: 'utf8' });
      expect(result).toContain('Commit message hook');
    });
  });

  describe('Quality Tools Validation', () => {
    it('should validate ESLint configuration', () => {
      const result = execSync('./validate-ai-sdlc.sh', { encoding: 'utf8' });
      expect(result).toContain('ESLint');
    });

    it('should validate Prettier configuration', () => {
      const result = execSync('./validate-ai-sdlc.sh', { encoding: 'utf8' });
      expect(result).toContain('Prettier');
    });
  });

  describe('Testing Framework Validation', () => {
    it('should validate Vitest installation', () => {
      const result = execSync('./validate-ai-sdlc.sh', { encoding: 'utf8' });
      expect(result).toContain('Vitest');
    });

    it('should validate Playwright installation', () => {
      const result = execSync('./validate-ai-sdlc.sh', { encoding: 'utf8' });
      expect(result).toContain('Playwright');
    });

    it('should validate Testing Library installation', () => {
      const result = execSync('./validate-ai-sdlc.sh', { encoding: 'utf8' });
      expect(result).toContain('React Testing Library');
    });
  });

  describe('CI/CD Validation', () => {
    it('should validate GitHub Actions directory', () => {
      const result = execSync('./validate-ai-sdlc.sh', { encoding: 'utf8' });
      expect(result).toContain('GitHub Actions');
    });

    it('should validate semantic release configuration', () => {
      const result = execSync('./validate-ai-sdlc.sh', { encoding: 'utf8' });
      expect(result).toContain('Semantic release');
    });
  });

  describe('Validation Report Generation', () => {
    it('should generate validation report file', () => {
      execSync('./validate-ai-sdlc.sh', { encoding: 'utf8' });
      expect(fs.existsSync('AI_SDLC_VALIDATION_REPORT.md')).toBe(true);
    });

    it('should include success rate in report', () => {
      execSync('./validate-ai-sdlc.sh', { encoding: 'utf8' });
      const report = fs.readFileSync('AI_SDLC_VALIDATION_REPORT.md', 'utf8');
      expect(report).toMatch(/\d+%.*\(\d+\/\d+ checks passed\)/);
    });
  });

  describe('Functional Tests', () => {
    it('should test git hooks functionality', () => {
      const result = execSync('./validate-ai-sdlc.sh', { encoding: 'utf8' });
      expect(result).toContain('Pre-commit hook works');
    });

    it('should test linting functionality', () => {
      const result = execSync('./validate-ai-sdlc.sh', { encoding: 'utf8' });
      expect(result).toContain('Linting works');
    });
  });
});