import { describe, it, expect } from 'vitest';
import fs from 'fs';

describe('File Validation Tests', () => {
  describe('Core Configuration Files', () => {
    it('should have valid TypeScript configuration', () => {
      expect(fs.existsSync('tsconfig.json')).toBe(true);

      const config = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
      expect(config.compilerOptions).toBeDefined();
    });

    it('should have valid EditorConfig', () => {
      expect(fs.existsSync('.editorconfig')).toBe(true);

      const config = fs.readFileSync('.editorconfig', 'utf8');
      expect(config).toContain('root = true');
    });

    it('should have valid commitlint configuration', () => {
      expect(fs.existsSync('commitlint.config.js')).toBe(true);

      const config = fs.readFileSync('commitlint.config.js', 'utf8');
      expect(config).toContain('@commitlint/config-conventional');
    });
  });

  describe('GitHub Actions Workflows', () => {
    it('should have GitHub workflows directory', () => {
      expect(fs.existsSync('.github/workflows')).toBe(true);
    });

    it('should have test workflow', () => {
      expect(fs.existsSync('.github/workflows/test.yml')).toBe(true);

      const workflow = fs.readFileSync('.github/workflows/test.yml', 'utf8');
      expect(workflow).toContain('name: Tests');
      expect(workflow).toContain('npm run lint');
      expect(workflow).toContain('npm test');
    });

    it('should have documentation deployment workflow', () => {
      expect(fs.existsSync('.github/workflows/deploy-docs.yml')).toBe(true);

      const workflow = fs.readFileSync(
        '.github/workflows/deploy-docs.yml',
        'utf8'
      );
      expect(workflow).toContain('mkdocs gh-deploy');
    });
  });

  describe('Documentation Files', () => {
    it('should have main README', () => {
      expect(fs.existsSync('docs/README.md')).toBe(true);

      const readme = fs.readFileSync('docs/README.md', 'utf8');
      expect(readme).toContain('AI-Powered SDLC Framework');
      expect(readme).toContain('The Credit Pros');
    });

    it('should have implementation roadmap', () => {
      expect(fs.existsSync('docs/implementation-roadmap.md')).toBe(true);

      const roadmap = fs.readFileSync('docs/implementation-roadmap.md', 'utf8');
      expect(roadmap).toContain('Implementation Status');
    });

    it('should have quick start guide', () => {
      expect(fs.existsSync('docs/quick-start.md')).toBe(true);

      const guide = fs.readFileSync('docs/quick-start.md', 'utf8');
      expect(guide).toContain('Deployment Guide');
    });

    it('should have implementation gaps documentation', () => {
      expect(fs.existsSync('docs/implementation-gaps.md')).toBe(true);

      const gaps = fs.readFileSync('docs/implementation-gaps.md', 'utf8');
      expect(gaps).toContain('Implementation Gaps');
      expect(gaps).toContain('Current Implementation Status');
    });

    it('should have AI automation roadmap', () => {
      expect(fs.existsSync('docs/ai-automation-roadmap.md')).toBe(true);

      const roadmap = fs.readFileSync('docs/ai-automation-roadmap.md', 'utf8');
      expect(roadmap).toContain('AI & Automation Implementation Roadmap');
      expect(roadmap).toContain('Phase 1');
      expect(roadmap).toContain('Phase 2');
      expect(roadmap).toContain('Phase 3');
    });
  });

  describe('Script Files', () => {
    it('should have executable AI-SDLC CLI', () => {
      expect(fs.existsSync('ai-sdlc')).toBe(true);

      const stats = fs.statSync('ai-sdlc');
      expect(stats.mode & parseInt('111', 8)).toBeTruthy(); // Check executable permission
    });

    it('should have setup script', () => {
      expect(fs.existsSync('ai-sdlc-setup.sh')).toBe(true);

      const script = fs.readFileSync('ai-sdlc-setup.sh', 'utf8');
      expect(script).toContain('#!/bin/bash');
      expect(script).toContain('AI-SDLC Framework Setup');
    });

    it('should have validation script', () => {
      expect(fs.existsSync('validate-ai-sdlc.sh')).toBe(true);

      const script = fs.readFileSync('validate-ai-sdlc.sh', 'utf8');
      expect(script).toContain('#!/bin/bash');
      expect(script).toContain('validation');
    });

    it('should have repair script', () => {
      expect(fs.existsSync('ai-sdlc-repair.sh')).toBe(true);

      const script = fs.readFileSync('ai-sdlc-repair.sh', 'utf8');
      expect(script).toContain('#!/bin/bash');
      expect(script).toContain('Auto-repair');
    });
  });

  describe('Test Configuration', () => {
    it('should have Vitest configuration', () => {
      expect(fs.existsSync('vitest.config.js')).toBe(true);

      const config = fs.readFileSync('vitest.config.js', 'utf8');
      expect(config).toContain('defineConfig');
      expect(config).toContain('jsdom');
    });

    it('should have Playwright configuration', () => {
      expect(fs.existsSync('playwright.config.js')).toBe(true);

      const config = fs.readFileSync('playwright.config.js', 'utf8');
      expect(config).toContain('defineConfig');
      expect(config).toContain('chromium');
    });

    it('should have test setup file', () => {
      expect(fs.existsSync('tests/setup.js')).toBe(true);

      const setup = fs.readFileSync('tests/setup.js', 'utf8');
      expect(setup).toContain('@testing-library/jest-dom');
      expect(setup).toContain('cleanup');
    });
  });

  describe('VS Code Configuration', () => {
    it('should have VS Code settings', () => {
      expect(fs.existsSync('.vscode')).toBe(true);
    });
  });

  describe('DevContainer Configuration', () => {
    it('should have devcontainer configuration', () => {
      expect(fs.existsSync('.devcontainer')).toBe(true);
    });
  });
});
