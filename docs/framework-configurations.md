# Modern Framework Configurations

## 🚀 Framework-Specific AI-SDLC Integration

This document provides configuration templates for modern development stacks to ensure AI-SDLC works optimally with your specific tech choices.

## TypeScript Strict Mode Configuration

### `tsconfig.strict.json` - Maximum Type Safety

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "allowJs": false,
    "skipLibCheck": false,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitOverride": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src", "tests", "__tests__"],
  "exclude": ["node_modules", "dist", "build"]
}
```

### AI-SDLC TypeScript Integration

```bash
# Auto-configure TypeScript strict mode
./ai-sdlc setup-typescript --strict

# Generate TypeScript-specific tests
./ai-sdlc test-gen src/components/UserProfile.tsx --typescript-strict

# Validate TypeScript configurations
./ai-sdlc validate-typescript
```

## Modern Bundler Support

### Vite Configuration - Preferred Modern Bundler

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@utils': resolve(__dirname, './src/utils'),
      '@types': resolve(__dirname, './src/types'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      reporter: ['text', 'json-summary', 'html'],
      thresholds: {
        global: {
          branches: 85,
          functions: 85,
          lines: 85,
          statements: 85,
        },
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['lodash', 'date-fns'],
        },
      },
    },
  },
});
```

### AI-SDLC Vite Integration Commands

```bash
# Auto-configure Vite for AI-SDLC
./ai-sdlc setup-bundler --vite

# Generate Vite-optimized test configuration
./ai-sdlc test-init --bundler=vite

# Run AI test generation with Vite support
./ai-sdlc test-gen --bundler=vite src/components/
```

## Modern State Management

### Zustand + TanStack Query Configuration

```typescript
// stores/userStore.ts - Zustand Store
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => set({ user }),
        clearUser: () => set({ user: null }),
      }),
      {
        name: 'user-storage',
      }
    )
  )
);

// hooks/useUserQuery.ts - TanStack Query
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../services/userService';

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => userService.getUser(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.updateUser,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(['user', updatedUser.id], updatedUser);
      queryClient.invalidateQueries(['users']);
    },
  });
};
```

### AI-SDLC State Management Integration

```bash
# Generate tests for Zustand stores
./ai-sdlc test-gen stores/ --state-management=zustand

# Generate TanStack Query hook tests
./ai-sdlc test-gen hooks/useUserQuery.ts --react-query

# Generate comprehensive state integration tests
./ai-sdlc test-gen-e2e --state-management=modern
```

## Vitest Configuration - Modern Testing

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8', // Faster than c8
      reporter: ['text', 'json-summary', 'html', 'lcov'],
      thresholds: {
        global: {
          branches: 85,
          functions: 85,
          lines: 85,
          statements: 85,
        },
      },
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        'dist/',
        'build/',
      ],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
```

### AI-SDLC Vitest Integration

```bash
# Setup Vitest (default testing framework)
./ai-sdlc setup-testing --framework=vitest

# Generate Vitest-optimized test files
./ai-sdlc test-gen --testing-framework=vitest src/

# Run coverage with Vitest
npm run test:coverage # Uses Vitest v8 coverage
```

## Framework-Specific AI Test Generation

### React with Modern Hooks

```typescript
// AI-Generated test for modern React component
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProfile } from '../UserProfile';
import { useUserStore } from '../../stores/userStore';
import { server } from '../../test/server';

// AI-SDLC generates comprehensive tests for:
// ✅ Component rendering with TanStack Query
// ✅ Zustand store integration
// ✅ TypeScript strict type checking
// ✅ Modern React patterns (hooks, suspense)
// ✅ MSW API mocking
// ✅ Accessibility testing
```

### Vue 3 Composition API

```typescript
// AI-Generated test for Vue 3 component
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import UserProfile from '../UserProfile.vue';
import { useUserStore } from '../../stores/user';

// AI-SDLC generates comprehensive tests for:
// ✅ Composition API lifecycle hooks
// ✅ Pinia store integration
// ✅ Vue 3 reactive properties
// ✅ TypeScript prop validation
// ✅ Teleport and Suspense components
```

### Laravel with Pest

```php
<?php
// AI-Generated Pest test for Laravel
use App\Models\User;
use App\Services\CreditScoreService;

beforeEach(function () {
    $this->creditScoreService = new CreditScoreService();
});

it('calculates credit score with FCRA compliance', function () {
    // AI-SDLC generates comprehensive tests for:
    // ✅ FCRA compliance validation
    // ✅ Database factory integration
    // ✅ Service layer testing
    // ✅ Exception handling
    // ✅ API endpoint validation

    $user = User::factory()->create();

    $score = $this->creditScoreService->calculateScore($user);

    expect($score)
        ->toBeInt()
        ->toBeBetween(300, 850)
        ->and($this->creditScoreService->isCompliant())
        ->toBeTrue();
});
```

## Auto-Detection and Configuration

### Framework Detection Algorithm

```javascript
// AI-SDLC auto-detects your tech stack:

const detectFramework = () => {
  const packageJson = require('./package.json');
  const dependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  // Frontend Framework Detection
  if (dependencies['@vitejs/plugin-react']) return 'react-vite';
  if (dependencies['vue'] && dependencies['@vue/cli-service']) return 'vue-cli';
  if (dependencies['vue'] && dependencies['vite']) return 'vue-vite';
  if (dependencies['next']) return 'nextjs';

  // Testing Framework Detection
  if (dependencies['vitest']) return 'vitest';
  if (dependencies['jest']) return 'jest-legacy';

  // State Management Detection
  if (dependencies['zustand']) return 'zustand';
  if (dependencies['@tanstack/react-query']) return 'tanstack-query';
  if (dependencies['pinia']) return 'pinia';

  // Build Tool Detection
  if (fs.existsSync('./vite.config.ts')) return 'vite';
  if (fs.existsSync('./webpack.config.js')) return 'webpack';
};
```

### Smart Configuration Generation

```bash
# AI-SDLC automatically configures based on detection
./ai-sdlc auto-configure

# Output example:
# 🔍 Detected: React + Vite + TypeScript + Zustand + Vitest
# ✅ Configured TypeScript strict mode
# ✅ Optimized Vite for testing
# ✅ Generated Zustand store tests
# ✅ Set up Vitest with v8 coverage
# ✅ Created framework-specific AI test templates
```

## Credit Repair Domain Integration

### FCRA-Compliant Modern Stack

```typescript
// Modern TypeScript interfaces for credit repair
interface CreditData {
  readonly ssn: string; // Encrypted in production
  readonly score: number; // 300-850 FICO range
  readonly reportDate: Date;
  readonly tradelines: readonly Tradeline[];
  readonly disputes: readonly Dispute[];
}

// AI-SDLC generates domain-specific tests:
// ✅ FCRA Section 607 accuracy validation
// ✅ PII encryption verification
// ✅ Consumer disclosure compliance
// ✅ Data retention policy compliance
// ✅ State-specific regulations (CCPA, GDPR)
```

## Implementation Commands

```bash
# Setup AI-SDLC with modern frameworks
./ai-sdlc setup --detect-framework

# Generate configuration for detected stack
./ai-sdlc generate-config --modern

# Update existing projects to modern standards
./ai-sdlc modernize --upgrade-dependencies

# Validate framework-specific configurations
./ai-sdlc validate --framework-specific
```

---

**Framework Support Status:**

- ✅ React 18+ with modern patterns
- ✅ Vue 3 + Composition API
- ✅ TypeScript 5+ strict mode
- ✅ Vite, esbuild, SWC bundlers
- ✅ Vitest (primary), Jest legacy support
- ✅ TanStack Query, Zustand state management
- ✅ Laravel 10+ with Pest
- ✅ Node.js with modern frameworks

**Updated:** August 7, 2025  
**AI-SDLC Version:** AI-SDLC Framework v2.7.1 (Claude Code + Cline Enterprise Platform Integration)
