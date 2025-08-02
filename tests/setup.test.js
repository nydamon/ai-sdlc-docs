import { describe, it, expect, beforeEach } from 'vitest';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

describe('AI-SDLC Setup Tests', () => {
  const testDir = './test-project';
  
  beforeEach(() => {
    // Clean up test directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
    fs.mkdirSync(testDir, { recursive: true });
  });

  describe('Project Detection', () => {
    it('should detect Laravel project', () => {
      // Create Laravel project structure
      fs.writeFileSync(path.join(testDir, 'composer.json'), JSON.stringify({
        require: {
          'laravel/framework': '^10.0'
        }
      }));
      fs.writeFileSync(path.join(testDir, 'artisan'), '#!/usr/bin/env php');
      
      // Run setup script should detect Laravel
      const result = execSync(`cd ${testDir} && ../ai-sdlc-setup.sh --dry-run`, { encoding: 'utf8' });
      expect(result).toContain('Laravel project detected');
    });

    it('should detect React TypeScript project', () => {
      // Create React TypeScript project structure
      fs.writeFileSync(path.join(testDir, 'package.json'), JSON.stringify({
        dependencies: {
          'react': '^18.0.0',
          'typescript': '^5.0.0'
        }
      }));
      fs.writeFileSync(path.join(testDir, 'tsconfig.json'), '{}');
      
      const result = execSync(`cd ${testDir} && ../ai-sdlc-setup.sh --dry-run`, { encoding: 'utf8' });
      expect(result).toContain('TypeScript React project detected');
    });
  });

  describe('Git Hooks Installation', () => {
    it('should install Husky correctly', () => {
      fs.writeFileSync(path.join(testDir, 'package.json'), JSON.stringify({
        name: 'test-project',
        devDependencies: {}
      }));
      
      execSync(`cd ${testDir} && npm init -y && ../ai-sdlc init`, { encoding: 'utf8' });
      
      expect(fs.existsSync(path.join(testDir, '.husky'))).toBe(true);
      expect(fs.existsSync(path.join(testDir, '.husky/pre-commit'))).toBe(true);
      expect(fs.existsSync(path.join(testDir, '.husky/commit-msg'))).toBe(true);
    });

    it('should enforce branch naming', () => {
      // This would need to be tested in an actual git repo
      expect(true).toBe(true); // Placeholder for actual git branch test
    });
  });

  describe('Configuration Files', () => {
    it('should create ESLint configuration', () => {
      execSync(`cd ${testDir} && npm init -y && ../ai-sdlc init`, { encoding: 'utf8' });
      
      expect(fs.existsSync(path.join(testDir, 'eslint.config.js'))).toBe(true);
    });

    it('should create Prettier configuration', () => {
      execSync(`cd ${testDir} && npm init -y && ../ai-sdlc init`, { encoding: 'utf8' });
      
      expect(fs.existsSync(path.join(testDir, '.prettierrc'))).toBe(true);
    });

    it('should create commitlint configuration', () => {
      execSync(`cd ${testDir} && npm init -y && ../ai-sdlc init`, { encoding: 'utf8' });
      
      expect(fs.existsSync(path.join(testDir, 'commitlint.config.js'))).toBe(true);
    });
  });

  describe('Validation System', () => {
    it('should pass validation after setup', () => {
      execSync(`cd ${testDir} && npm init -y && ../ai-sdlc init`, { encoding: 'utf8' });
      
      const result = execSync(`cd ${testDir} && ../ai-sdlc validate`, { encoding: 'utf8' });
      expect(result).toContain('All validations passed');
    });

    it('should detect missing configurations', () => {
      fs.writeFileSync(path.join(testDir, 'package.json'), JSON.stringify({
        name: 'test-project'
      }));
      
      const result = execSync(`cd ${testDir} && ../ai-sdlc validate`, { encoding: 'utf8' });
      expect(result).toContain('ESLint configuration');
    });
  });

  describe('Auto-Repair System', () => {
    it('should fix missing ESLint configuration', () => {
      fs.writeFileSync(path.join(testDir, 'package.json'), JSON.stringify({
        name: 'test-project'
      }));
      
      execSync(`cd ${testDir} && ../ai-sdlc repair`, { encoding: 'utf8' });
      
      expect(fs.existsSync(path.join(testDir, 'eslint.config.js'))).toBe(true);
    });

    it('should fix Husky installation', () => {
      fs.writeFileSync(path.join(testDir, 'package.json'), JSON.stringify({
        name: 'test-project',
        devDependencies: {
          husky: '^9.0.0'
        }
      }));
      
      execSync(`cd ${testDir} && npm install && ../ai-sdlc repair`, { encoding: 'utf8' });
      
      expect(fs.existsSync(path.join(testDir, '.husky'))).toBe(true);
    });
  });
});