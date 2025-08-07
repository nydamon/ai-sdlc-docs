# Performance Rules - Optimization and Monitoring

## Code Performance Standards

### React Performance Optimization

Always implement performance best practices for React components:

```typescript
// Use React.memo for pure components
export const CreditScoreDisplay = React.memo<CreditScoreProps>(({
  score,
  date,
  isLoading
}) => {
  // Memoize expensive calculations
  const scoreCategory = useMemo(() => {
    return calculateScoreCategory(score);
  }, [score]);

  // Debounce user input for search/filter components
  const debouncedSearchTerm = useMemo(
    () => debounce(searchTerm, 300),
    [searchTerm]
  );

  // Use callback for event handlers
  const handleScoreClick = useCallback((clickedScore: number) => {
    onScoreClick?.(clickedScore);
    analytics.track('credit_score_clicked', { score: clickedScore });
  }, [onScoreClick]);

  return (
    <div className="credit-score-display" data-testid="credit-score">
      <ScoreValue>{score}</ScoreValue>
      <ScoreCategory>{scoreCategory}</ScoreCategory>
      <ScoreDate>{formatDate(date)}</ScoreDate>
    </div>
  );
});

// Lazy load heavy components
const CreditReportViewer = lazy(() =>
  import('./CreditReportViewer').then(module => ({
    default: module.CreditReportViewer
  }))
);

// Use Suspense for loading states
export const CreditReportContainer: React.FC = () => {
  return (
    <Suspense fallback={<CreditReportSkeleton />}>
      <CreditReportViewer />
    </Suspense>
  );
};
```

### API Performance Requirements

All API endpoints must meet performance benchmarks:

```typescript
interface PerformanceBenchmarks {
  creditReportRetrieval: 2000; // 2 seconds max
  disputeSubmission: 1000; // 1 second max
  consumerSearch: 500; // 500ms max
  auditLogInsertion: 100; // 100ms max
}

// Implement caching for expensive operations
class CreditReportService {
  private cache = new Map<string, CachedCreditReport>();
  private readonly CACHE_TTL = 15 * 60 * 1000; // 15 minutes

  async getCreditReport(
    consumerId: string,
    purpose: string
  ): Promise<CreditReport> {
    const startTime = performance.now();
    const cacheKey = `${consumerId}-${purpose}`;

    // Check cache first
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      this.logPerformanceMetric(
        'credit_report_cache_hit',
        performance.now() - startTime
      );
      return cached.data;
    }

    // Fetch from bureau with timeout
    const report = (await Promise.race([
      this.fetchFromBureau(consumerId, purpose),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timeout')), 5000)
      ),
    ])) as CreditReport;

    // Cache the result
    this.cache.set(cacheKey, {
      data: report,
      timestamp: Date.now(),
    });

    const duration = performance.now() - startTime;
    this.logPerformanceMetric('credit_report_retrieval', duration);

    // Alert if performance threshold exceeded
    if (duration > PerformanceBenchmarks.creditReportRetrieval) {
      this.alertSlowOperation('credit_report_retrieval', duration);
    }

    return report;
  }

  private logPerformanceMetric(operation: string, duration: number): void {
    performanceLogger.log({
      operation,
      duration,
      timestamp: new Date(),
      service: 'credit-report-service',
    });
  }
}
```

### Database Query Optimization

Optimize all database queries for performance:

```typescript
// Always use indexes for frequently queried columns
class ConsumerRepository {
  // Use database indexes effectively
  async searchConsumers(criteria: SearchCriteria): Promise<Consumer[]> {
    const query = `
      SELECT c.id, c.name_hash, c.created_at
      FROM consumers c
      WHERE 1=1
    `;

    const params: any[] = [];
    const conditions: string[] = [];

    // Use indexed columns for searching
    if (criteria.nameHash) {
      conditions.push('c.name_hash = ?');
      params.push(criteria.nameHash);
    }

    if (criteria.dateRange) {
      conditions.push('c.created_at BETWEEN ? AND ?');
      params.push(criteria.dateRange.start, criteria.dateRange.end);
    }

    // Limit results to prevent large result sets
    const finalQuery =
      query +
      (conditions.length > 0 ? ' AND ' + conditions.join(' AND ') : '') +
      ' ORDER BY c.created_at DESC LIMIT 100';

    return await this.db.query(finalQuery, params);
  }

  // Use connection pooling for high-throughput operations
  async batchUpdateCreditScores(updates: CreditScoreUpdate[]): Promise<void> {
    const batchSize = 100;
    const batches = chunk(updates, batchSize);

    await this.db.transaction(async (trx) => {
      for (const batch of batches) {
        const query = `
          UPDATE consumers 
          SET credit_score = CASE id 
            ${batch.map(() => 'WHEN ? THEN ?').join(' ')}
          END,
          updated_at = NOW()
          WHERE id IN (${batch.map(() => '?').join(',')})
        `;

        const params = [
          ...batch.flatMap((u) => [u.consumerId, u.newScore]),
          ...batch.map((u) => u.consumerId),
        ];

        await trx.query(query, params);
      }
    });
  }
}
```

## Memory Management

### Memory Usage Optimization

Prevent memory leaks and optimize memory usage:

```typescript
// Clean up event listeners and subscriptions
export const CreditMonitoringComponent: React.FC = () => {
  const [creditData, setCreditData] = useState<CreditData[]>([]);
  const abortControllerRef = useRef<AbortController>();

  useEffect(() => {
    // Create abort controller for cleanup
    abortControllerRef.current = new AbortController();

    const fetchCreditData = async () => {
      try {
        const response = await fetch('/api/credit-monitoring', {
          signal: abortControllerRef.current?.signal
        });
        const data = await response.json();
        setCreditData(data);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Failed to fetch credit data:', error);
        }
      }
    };

    // Set up polling with cleanup
    const intervalId = setInterval(fetchCreditData, 30000);
    fetchCreditData(); // Initial fetch

    return () => {
      // Cleanup on unmount
      clearInterval(intervalId);
      abortControllerRef.current?.abort();
    };
  }, []);

  return (
    <div className="credit-monitoring">
      {creditData.map(item => (
        <CreditDataItem key={item.id} data={item} />
      ))}
    </div>
  );
};

// Use weak references for large objects
class CreditReportCache {
  private cache = new WeakMap<Consumer, CreditReport>();
  private timers = new Map<string, NodeJS.Timeout>();

  set(consumer: Consumer, report: CreditReport, ttl: number = 900000): void {
    this.cache.set(consumer, report);

    // Auto-cleanup after TTL
    const timerId = setTimeout(() => {
      this.cache.delete(consumer);
      this.timers.delete(consumer.id);
    }, ttl);

    this.timers.set(consumer.id, timerId);
  }

  get(consumer: Consumer): CreditReport | undefined {
    return this.cache.get(consumer);
  }

  clear(): void {
    // Clear all timers
    this.timers.forEach(timer => clearTimeout(timer));
    this.timers.clear();
  }
}
```

### Resource Management

Manage system resources efficiently:

```typescript
// Connection pooling configuration
const dbPoolConfig = {
  min: 2,
  max: 10,
  acquireTimeoutMillis: 30000,
  idleTimeoutMillis: 600000,
  reapIntervalMillis: 1000,
  createRetryIntervalMillis: 200,
  createTimeoutMillis: 30000,
};

// File upload handling with size limits
const uploadMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 5, // Maximum 5 files
  },
  fileFilter: (req, file, cb) => {
    // Only allow specific file types
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  },
});

// Stream large responses instead of loading into memory
app.get('/api/reports/export', async (req, res) => {
  const reportStream = await generateLargeReport(req.query);

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', 'attachment; filename="report.json"');

  // Stream the response
  reportStream.pipe(res);

  reportStream.on('error', (error) => {
    console.error('Report generation error:', error);
    res.status(500).json({ error: 'Failed to generate report' });
  });
});
```

## Performance Monitoring

### Real-time Performance Tracking

Monitor performance metrics in production:

```typescript
interface PerformanceMetric {
  operation: string;
  duration: number;
  timestamp: Date;
  userId?: string;
  metadata?: Record<string, any>;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private readonly BATCH_SIZE = 100;
  private readonly FLUSH_INTERVAL = 5000; // 5 seconds

  constructor() {
    // Periodically flush metrics to monitoring service
    setInterval(() => {
      this.flushMetrics();
    }, this.FLUSH_INTERVAL);
  }

  track(
    operation: string,
    duration: number,
    metadata?: Record<string, any>
  ): void {
    const metric: PerformanceMetric = {
      operation,
      duration,
      timestamp: new Date(),
      metadata,
    };

    this.metrics.push(metric);

    // Alert on slow operations
    if (this.isSlowOperation(operation, duration)) {
      this.alertSlowOperation(metric);
    }

    // Flush if batch size reached
    if (this.metrics.length >= this.BATCH_SIZE) {
      this.flushMetrics();
    }
  }

  private isSlowOperation(operation: string, duration: number): boolean {
    const thresholds = {
      api_request: 1000,
      database_query: 500,
      credit_report_fetch: 2000,
      file_upload: 5000,
    };

    return duration > (thresholds[operation] || 1000);
  }

  private async flushMetrics(): Promise<void> {
    if (this.metrics.length === 0) return;

    const batch = [...this.metrics];
    this.metrics = [];

    try {
      await fetch('/api/metrics/batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ metrics: batch }),
      });
    } catch (error) {
      console.error('Failed to flush performance metrics:', error);
      // Re-add metrics to queue on failure
      this.metrics.unshift(...batch);
    }
  }

  private alertSlowOperation(metric: PerformanceMetric): void {
    console.warn(
      `Slow operation detected: ${metric.operation} took ${metric.duration}ms`
    );

    // Send alert to monitoring system
    alertingService.send({
      type: 'performance_alert',
      severity: 'warning',
      message: `Slow operation: ${metric.operation}`,
      duration: metric.duration,
      timestamp: metric.timestamp,
    });
  }
}

// Usage with decorator pattern
function trackPerformance(operation: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const startTime = performance.now();

      try {
        const result = await originalMethod.apply(this, args);
        const duration = performance.now() - startTime;

        performanceMonitor.track(operation, duration, {
          method: propertyKey,
          success: true,
        });

        return result;
      } catch (error) {
        const duration = performance.now() - startTime;

        performanceMonitor.track(operation, duration, {
          method: propertyKey,
          success: false,
          error: error.message,
        });

        throw error;
      }
    };

    return descriptor;
  };
}

// Example usage
class CreditReportController {
  @trackPerformance('credit_report_fetch')
  async getCreditReport(req: Request, res: Response): Promise<void> {
    // Method implementation
  }
}
```

### Performance Testing Requirements

All critical paths must have performance tests:

```typescript
describe('Performance Tests', () => {
  describe('Credit Report API', () => {
    it('should fetch credit report within 2 seconds', async () => {
      const startTime = performance.now();

      const response = await request(app)
        .get('/api/credit-reports/test-consumer-id')
        .set('Authorization', `Bearer ${validToken}`)
        .expect(200);

      const duration = performance.now() - startTime;
      expect(duration).toBeLessThan(2000);
      expect(response.body.data).toBeDefined();
    });

    it('should handle concurrent requests efficiently', async () => {
      const concurrentRequests = 10;
      const startTime = performance.now();

      const promises = Array(concurrentRequests).fill(null).map((_, index) =>
        request(app)
          .get(`/api/credit-reports/consumer-${index}`)
          .set('Authorization', `Bearer ${validToken}`)
      );

      const responses = await Promise.all(promises);
      const totalDuration = performance.now() - startTime;

      // All requests should complete
      expect(responses.every(r => r.status === 200)).toBe(true);

      // Average response time should be reasonable
      const avgDuration = totalDuration / concurrentRequests;
      expect(avgDuration).toBeLessThan(3000);
    });
  });

  describe('Database Performance', () => {
    it('should execute consumer search within 500ms', async () => {
      const startTime = performance.now();

      const results = await consumerRepository.searchConsumers({
        nameHash: 'test-hash',
        dateRange: {
          start: new Date('2024-01-01'),
          end: new Date('2024-12-31')
        }
      });

      const duration = performance.now() - startTime;
      expect(duration).toBeLessThan(500);
      expect(results).toBeDefined();
    });

    it('should handle batch operations efficiently', async () => {
      const batchSize = 1000;
      const updates = Array(batchSize).fill(null).map((_, index) => ({
        consumerId: `consumer-${index}`,
        newScore: 700 + (index % 150)
      }));

      const startTime = performance.now();

      await consumerRepository.batchUpdateCreditScores(updates);

      const duration = performance.now() - startTime;
      const operationsPerSecond = batchSize / (duration / 1000);

      expect(operationsPerSecond).toBeGreaterThan(100); // At least 100 ops/sec
    });
  });

  describe('Memory Usage', () => {
    it('should not leak memory during large data processing', async () => {
      const initialMemory = process.memoryUsage().heapUsed;

      // Process large dataset
      const largeDataset = generateLargeTestDataset(10000);
      await processLargeDataset(largeDataset);

      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }

      const finalMemory = process.memoryUsage().heapUsed;
      const memoryIncrease = finalMemory - initialMemory;

      // Memory increase should be reasonable (less than 50MB)
      expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024);
    });
  });

  describe('Frontend Performance', () => {
    it('should render credit score component quickly', () => {
      const startTime = performance.now();

      render(
        <CreditScoreDisplay
          score={750}
          date="2024-08-07"
          isLoading={false}
        />
      );

      const duration = performance.now() - startTime;
      expect(duration).toBeLessThan(100); // 100ms for component render
    });

    it('should handle large lists efficiently', () => {
      const largeDataset = Array(1000).fill(null).map((_, index) => ({
        id: index,
        score: 300 + (index % 550),
        date: new Date().toISOString()
      }));

      const startTime = performance.now();

      render(<CreditScoreList data={largeDataset} />);

      const duration = performance.now() - startTime;
      expect(duration).toBeLessThan(500); // 500ms for large list render
    });
  });
});
```

## Optimization Best Practices

### Bundle Optimization

Minimize JavaScript bundle size:

```typescript
// Use dynamic imports for code splitting
const LazyFeatureComponent = lazy(() =>
  import('./features/LazyFeature').then((module) => ({
    default: module.LazyFeature,
  }))
);

// Tree shaking - import only what you need
import { debounce } from 'lodash/debounce';
// Instead of: import _ from 'lodash';

// Optimize images and assets
const optimizedImageLoader = ({ src, width, quality }) => {
  return `https://cdn.example.com/${src}?w=${width}&q=${quality || 75}`;
};
```

### Network Optimization

Reduce network overhead:

```typescript
// Use compression for API responses
app.use(
  compression({
    filter: (req, res) => {
      if (req.headers['x-no-compression']) {
        return false;
      }
      return compression.filter(req, res);
    },
    level: 6,
    threshold: 1024,
  })
);

// Implement ETags for caching
app.use('/api/static', (req, res, next) => {
  res.set('Cache-Control', 'public, max-age=31536000'); // 1 year
  res.set('ETag', generateETag(req.path));
  next();
});

// Use HTTP/2 Server Push for critical resources
app.get('/', (req, res) => {
  res.push('/css/critical.css');
  res.push('/js/critical.js');
  res.render('index');
});
```

These performance rules ensure The Credit Pros AI-SDLC framework maintains optimal performance while handling credit repair operations at scale.
