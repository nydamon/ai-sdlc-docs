import { describe, it, expect } from 'vitest';
import { execSync } from 'child_process';
import fs from 'fs';

describe('AI-SDLC Simple CLI Tests', () => {
  describe('Help Command', () => {
    it('should show help information', () => {
      const result = execSync('./ai-sdlc help', { encoding: 'utf8' });
      expect(result).toContain('AI-SDLC Simple CLI');
      expect(result).toContain('setup');
      expect(result).toContain('status');
      expect(result).toContain('validate');
      expect(result).toContain('help');
    });

    it('should show help as default command', () => {
      const result = execSync('./ai-sdlc', { encoding: 'utf8' });
      expect(result).toContain('AI-SDLC Simple CLI');
    });
  });

  describe('Status Command', () => {
    it('should show current status', () => {
      const result = execSync('./ai-sdlc status', { encoding: 'utf8' });
      expect(result).toContain('Setup Status');
      expect(result).toContain('Status:');
    });
  });

  describe('Validate Command', () => {
    it('should run validation checks', () => {
      const result = execSync('./ai-sdlc validate', { encoding: 'utf8' });
      expect(result).toContain('Validation Results');
      expect(result).toContain('Summary');
    });
  });

  describe('Setup Script Validation', () => {
    it('should have setup.sh script', () => {
      expect(fs.existsSync('./setup.sh')).toBe(true);

      const script = fs.readFileSync('./setup.sh', 'utf8');
      expect(script).toContain('#!/bin/bash');
      expect(script).toContain('AI-SDLC Simple Setup');
    });

    it('should have executable setup.sh', () => {
      const stats = fs.statSync('./setup.sh');
      expect(stats.mode & parseInt('111', 8)).toBeTruthy(); // Check executable permission
    });
  });

  describe('Configuration Files', () => {
    it('should have basic project files when they exist', () => {
      // These tests only run if files exist (don't require them)
      if (fs.existsSync('package.json')) {
        const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        expect(pkg).toBeDefined();
      }

      if (fs.existsSync('.eslintrc.js')) {
        const config = fs.readFileSync('.eslintrc.js', 'utf8');
        expect(config).toContain('module.exports');
      }

      if (fs.existsSync('.prettierrc')) {
        const config = fs.readFileSync('.prettierrc', 'utf8');
        expect(() => JSON.parse(config)).not.toThrow();
      }
    });
  });

  describe('Error Handling', () => {
    it('should handle unknown commands gracefully', () => {
      try {
        execSync('./ai-sdlc unknown-command', { encoding: 'utf8' });
      } catch (error) {
        expect(error.stdout || error.stderr).toContain('Unknown command');
      }
    });
  });
});
