# React Best Practices

## Dual Frontend Architecture

### Client-Facing Frontend (TypeScript)
```typescript
// Primary Technology Stack
- React 18+ with TypeScript for type safety
- Vite for fast development and building
- TanStack Query for server state management
- Zustand for client state management
- Tailwind CSS for styling

// Analytics & Product Intelligence
- PostHog for product analytics and user behavior
- Feature flags and A/B testing capabilities
- Conversion funnel tracking
- Real-time user engagement metrics

// Performance & Monitoring
- Web Vitals collection with PostHog integration
- Sentry for error tracking
- Custom performance metrics
- User experience monitoring
```

### Admin Panel Frontend (JavaScript)
```javascript
// Primary Technology Stack
- React 18+ with JavaScript (ES6+)
- Vite or Webpack for build tooling
- Context API or Redux Toolkit for state management
- Tailwind CSS for consistent styling

// Internal Monitoring Only
- Basic performance monitoring
- Error tracking without external services
- Admin action logging
- Internal metrics collection
```

## TypeScript Configuration (Client Frontend)

### Strict Type Safety
```typescript
// tsconfig.json - Client Frontend
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    
    // Strict type checking
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    
    // Path mapping
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/utils/*": ["./src/utils/*"],
      "@/types/*": ["./src/types/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### Type Definitions
```typescript
// src/types/api.ts
export interface ApiResponse<T> {
  data: T;
  message: string;
  status: 'success' | 'error';
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

// src/types/user.ts
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user' | 'premium';
  created_at: string;
  updated_at: string;
}

// src/types/analytics.ts
export interface AnalyticsEvent {
  event_name: string;
  properties: Record<string, any>;
  timestamp: number;
  user_id?: string;
}
```

## JavaScript Configuration (Admin Frontend)

### Modern JavaScript Setup
```javascript
// jsconfig.json - Admin Frontend
{
  "compilerOptions": {
    "target": "es2020",
    "lib": ["es2020", "dom", "dom.iterable"],
    "module": "esnext",
    "moduleResolution": "node",
    "jsx": "react-jsx",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/utils/*": ["./src/utils/*"]
    }
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

### PropTypes for Runtime Validation
```javascript
// src/components/AdminDashboard.jsx
import React from 'react';
import PropTypes from 'prop-types';

const AdminDashboard = ({ user, metrics, onRefresh }) => {
  return (
    <div className="admin-dashboard">
      <h1>Welcome, {user.name}</h1>
      <MetricsPanel metrics={metrics} />
      <button onClick={onRefresh}>Refresh Data</button>
    </div>
  );
};

AdminDashboard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.oneOf(['admin', 'super_admin']).isRequired
  }).isRequired,
  metrics: PropTypes.arrayOf(PropTypes.object),
  onRefresh: PropTypes.func.isRequired
};

export default AdminDashboard;
```

## State Management Patterns

### Client Frontend - Zustand + TanStack Query
```typescript
// src/stores/userStore.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { User } from '@/types/user';

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  preferences: UserPreferences;
  setUser: (user: User) => void;
  logout: () => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        preferences: {
          theme: 'light',
          notifications: true,
          language: 'en'
        },
        setUser: (user) => set({ user, isAuthenticated: true }),
        logout: () => set({ user: null, isAuthenticated: false }),
        updatePreferences: (newPreferences) =>
          set((state) => ({
            preferences: { ...state.preferences, ...newPreferences }
          }))
      }),
      { name: 'user-storage' }
    )
  )
);

// src/hooks/useUserQuery.ts
import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';

export const useUserQuery = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => api.get<User>(`/users/${userId}`),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3
  });
};
```

### Admin Frontend - Context API
```javascript
// src/context/AdminContext.jsx
import React, { createContext, useContext, useReducer } from 'react';

const AdminContext = createContext();

const adminReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_METRICS':
      return { ...state, metrics: action.payload, loading: false };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, {
    metrics: [],
    loading: false,
    error: null
  });

  const fetchMetrics = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await fetch('/api/admin/metrics');
      const data = await response.json();
      dispatch({ type: 'SET_METRICS', payload: data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  return (
    <AdminContext.Provider value={{ ...state, fetchMetrics, dispatch }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};
```

## Component Architecture

### Client Frontend - TypeScript Components
```typescript
// src/components/FeatureCard.tsx
import React from 'react';
import { useFeatureFlag } from '@/hooks/useFeatureFlag';
import { FeatureFlagManager } from '@/utils/feature-flags';

interface FeatureCardProps {
  title: string;
  description: string;
  premium?: boolean;
  onActivate: (featureId: string) => void;
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  premium = false,
  onActivate,
  className = ''
}) => {
  const isPremiumEnabled = useFeatureFlag('premium-features');
  const showCard = !premium || isPremiumEnabled;

  const handleClick = () => {
    // Track feature interaction with PostHog
    FeatureFlagManager.trackFeatureUsage('feature-card-click', {
      feature_title: title,
      is_premium: premium
    });
    
    onActivate(title.toLowerCase());
  };

  if (!showCard) return null;

  return (
    <div 
      className={`feature-card ${className}`}
      data-feature={title.toLowerCase()}
      onClick={handleClick}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
      {premium && (
        <span className="premium-badge">Premium</span>
      )}
    </div>
  );
};
```

### Admin Frontend - JavaScript Components
```javascript
// src/components/MetricsTable.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const MetricsTable = ({ metrics, onSort, onFilter }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    onFilter(filterText);
  }, [filterText, onFilter]);

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' 
      ? 'desc' 
      : 'asc';
    
    setSortConfig({ key, direction });
    onSort(key, direction);
  };

  return (
    <div className="metrics-table">
      <div className="table-controls">
        <input
          type="text"
          placeholder="Filter metrics..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="filter-input"
        />
      </div>
      
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>
              Metric Name
              {sortConfig.key === 'name' && (
                <span className={`sort-indicator ${sortConfig.direction}`}>
                  {sortConfig.direction === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </th>
            <th onClick={() => handleSort('value')}>Value</th>
            <th onClick={() => handleSort('timestamp')}>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {metrics.map((metric) => (
            <tr key={metric.id}>
              <td>{metric.name}</td>
              <td>{metric.value}</td>
              <td>{new Date(metric.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

MetricsTable.propTypes = {
  metrics: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    timestamp: PropTypes.string.isRequired
  })).isRequired,
  onSort: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired
};

export default MetricsTable;
```

## Testing Strategies

### Client Frontend Testing (Vitest + TypeScript)
```typescript
// src/components/__tests__/FeatureCard.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FeatureCard } from '../FeatureCard';

// Mock PostHog
vi.mock('@/utils/feature-flags', () => ({
  FeatureFlagManager: {
    trackFeatureUsage: vi.fn()
  }
}));

vi.mock('@/hooks/useFeatureFlag', () => ({
  useFeatureFlag: vi.fn(() => true)
}));

describe('FeatureCard', () => {
  const defaultProps = {
    title: 'Test Feature',
    description: 'Test description',
    onActivate: vi.fn()
  };

  it('renders correctly with required props', () => {
    render(<FeatureCard {...defaultProps} />);
    
    expect(screen.getByText('Test Feature')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('calls onActivate when clicked', () => {
    const mockOnActivate = vi.fn();
    render(<FeatureCard {...defaultProps} onActivate={mockOnActivate} />);
    
    fireEvent.click(screen.getByText('Test Feature'));
    
    expect(mockOnActivate).toHaveBeenCalledWith('test feature');
  });

  it('shows premium badge for premium features', () => {
    render(<FeatureCard {...defaultProps} premium={true} />);
    
    expect(screen.getByText('Premium')).toBeInTheDocument();
  });
});
```

### Admin Frontend Testing (Vitest + JavaScript)
```javascript
// src/components/__tests__/MetricsTable.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import MetricsTable from '../MetricsTable';

const mockMetrics = [
  { id: '1', name: 'CPU Usage', value: '75%', timestamp: '2024-01-01T10:00:00Z' },
  { id: '2', name: 'Memory Usage', value: '60%', timestamp: '2024-01-01T10:01:00Z' }
];

describe('MetricsTable', () => {
  const defaultProps = {
    metrics: mockMetrics,
    onSort: vi.fn(),
    onFilter: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders metrics correctly', () => {
    render(<MetricsTable {...defaultProps} />);
    
    expect(screen.getByText('CPU Usage')).toBeInTheDocument();
    expect(screen.getByText('Memory Usage')).toBeInTheDocument();
  });

  it('calls onSort when column header is clicked', () => {
    const mockOnSort = vi.fn();
    render(<MetricsTable {...defaultProps} onSort={mockOnSort} />);
    
    fireEvent.click(screen.getByText('Metric Name'));
    
    expect(mockOnSort).toHaveBeenCalledWith('name', 'asc');
  });

  it('filters metrics when filter input changes', () => {
    const mockOnFilter = vi.fn();
    render(<MetricsTable {...defaultProps} onFilter={mockOnFilter} />);
    
    const filterInput = screen.getByPlaceholderText('Filter metrics...');
    fireEvent.change(filterInput, { target: { value: 'CPU' } });
    
    expect(mockOnFilter).toHaveBeenCalledWith('CPU');
  });
});
```

## Performance Optimization

### Code Splitting & Lazy Loading
```typescript
// src/routes/index.tsx - Client Frontend
import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

// Lazy load page components
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Profile = lazy(() => import('@/pages/Profile'));
const Settings = lazy(() => import('@/pages/Settings'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Dashboard />
      </Suspense>
    )
  },
  {
    path: '/profile',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Profile />
      </Suspense>
    )
  }
]);
```

### Bundle Analysis & Optimization
```typescript
// vite.config.ts - Client Frontend
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          analytics: ['posthog-js'],
          ui: ['@headlessui/react', '@heroicons/react']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['posthog-js']
  }
});
```

---

## Implementation Checklist

### Client Frontend (TypeScript)
- [ ] Set up Vite with TypeScript configuration
- [ ] Configure Zustand + TanStack Query
- [ ] Integrate PostHog for analytics and feature flags
- [ ] Set up comprehensive type definitions
- [ ] Implement component testing with Vitest
- [ ] Configure code splitting and lazy loading

### Admin Frontend (JavaScript)
- [ ] Set up build tooling (Vite/Webpack)
- [ ] Configure Context API for state management
- [ ] Set up PropTypes for runtime validation
- [ ] Implement component testing with Vitest
- [ ] Configure internal monitoring only
- [ ] Set up admin-specific routing

### Shared Standards
- [ ] Implement consistent ESLint rules for both frontends
- [ ] Set up shared Prettier configuration
- [ ] Create component library standards
- [ ] Establish testing patterns and utilities
- [ ] Configure CI/CD for both frontend builds

*This dual frontend approach provides optimal user experience for customers while maintaining internal admin efficiency with appropriate monitoring and analytics for each use case.*