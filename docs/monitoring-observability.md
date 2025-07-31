    public function businessMetrics(): JsonResponse
    {
        // Combine Laravel Pulse data with PostHog insights for client frontend
        $metrics = [
            'client_frontend' => [
                'web_vitals' => $this->getClientWebVitals(),
                'user_engagement' => $this->getClientEngagementMetrics(),
                'conversion_funnel' => $this->getConversionMetrics(),
                'feature_adoption' => $this->getFeatureAdoptionMetrics(),
            ],
            'admin_frontend' => [
                'performance' => $this->getAdminPerformanceMetrics(),
                'usage' => $this->getAdminUsageMetrics(),
                'errors' => $this->getAdminErrorMetrics(),
            ],
            'backend' => [
                'api_performance' => $this->getAPIPerformanceMetrics(),
                'database_health' => $this->getDatabaseMetrics(),
                'queue_status' => $this->getQueueMetrics(),
            ]
        ];
        
        return response()->json($metrics);
    }
    
    private function getClientWebVitals(): array
    {
        return [
            'lcp' => Pulse::values('client_web_vitals')
                ->where('key', 'LCP')
                ->whereBetween('timestamp', [now()->subDay(), now()])
                ->avg('value'),
            'fid' => Pulse::values('client_web_vitals')
                ->where('key', 'FID')
                ->whereBetween('timestamp', [now()->subDay(), now()])
                ->avg('value'),
            'cls' => Pulse::values('client_web_vitals')
                ->where('key', 'CLS')
                ->whereBetween('timestamp', [now()->subDay(), now()])
                ->avg('value'),
        ];
    }
    
    private function getAdminPerformanceMetrics(): array
    {
        return [
            'avg_page_load' => Pulse::values('admin_metrics')
                ->where('key', 'page_load')
                ->whereBetween('timestamp', [now()->subDay(), now()])
                ->avg('value'),
            'error_count' => Pulse::values('admin_metrics')
                ->where('key', 'javascript_error')
                ->whereBetween('timestamp', [now()->subDay(), now()])
                ->count(),
            'daily_active_admins' => Pulse::values('admin_metrics')
                ->whereBetween('timestamp', [now()->subDay(), now()])
                ->distinct('key_hash')
                ->count(),
        ];
    }
}
```

### PostHog Feature Flags Integration
```typescript
// resources/js/client/utils/feature-flags.ts
import posthog from 'posthog-js';

export class FeatureFlagManager {
  static isFeatureEnabled(flagKey: string): boolean {
    return posthog.isFeatureEnabled(flagKey) || false;
  }
  
  static getFeatureFlag(flagKey: string): string | boolean | undefined {
    return posthog.getFeatureFlag(flagKey);
  }
  
  static trackFeatureUsage(flagKey: string, value: any): void {
    posthog.capture('feature_flag_used', {
      flag_key: flagKey,
      flag_value: value,
      timestamp: Date.now()
    });
  }
  
  // A/B testing helpers
  static getVariant(experimentKey: string): string {
    const variant = posthog.getFeatureFlag(experimentKey);
    
    // Track experiment participation
    posthog.capture('experiment_participated', {
      experiment_key: experimentKey,
      variant: variant,
      timestamp: Date.now()
    });
    
    return variant as string || 'control';
  }
  
  // Progressive rollout tracking
  static trackRolloutMetric(feature: string, metric: string, value: number): void {
    posthog.capture('rollout_metric', {
      feature_name: feature,
      metric_name: metric,
      metric_value: value,
      timestamp: Date.now()
    });
  }
}

// Usage in React components
export const useFeatureFlag = (flagKey: string) => {
  const [isEnabled, setIsEnabled] = useState(false);
  
  useEffect(() => {
    const checkFlag = () => {
      const enabled = FeatureFlagManager.isFeatureEnabled(flagKey);
      setIsEnabled(enabled);
      
      if (enabled) {
        FeatureFlagManager.trackFeatureUsage(flagKey, enabled);
      }
    };
    
    checkFlag();
    
    // Listen for PostHog feature flag updates
    posthog.onFeatureFlags(checkFlag);
    
    return () => {
      posthog.offFeatureFlags(checkFlag);
    };
  }, [flagKey]);
  
  return isEnabled;
};
```# Monitoring & Observability Strategy

## Overview
Comprehensive monitoring and observability framework leveraging Laravel's native tools and enterprise-grade solutions to ensure optimal performance, rapid issue detection, and data-driven optimization.

## Application Performance Monitoring

### Laravel Pulse Integration
```php
// config/pulse.php
<?php

return [
    'domain' => env('PULSE_DOMAIN'),
    'path' => env('PULSE_PATH', 'pulse'),
    'enabled' => env('PULSE_ENABLED', true),
    
    'storage' => [
        'driver' => env('PULSE_STORAGE_DRIVER', 'database'),
        'database' => [
            'connection' => env('PULSE_DB_CONNECTION', 'mysql'),
            'chunk' => 1000,
        ],
    ],
    
    'cache' => env('PULSE_CACHE_DRIVER', 'redis'),
    
    'recorders' => [
        // Application Performance
        Recorders\Servers::class => [
            'server_name' => env('PULSE_SERVER_NAME', gethostname()),
            'directories' => explode(':', env('PULSE_SERVER_DIRECTORIES', '/')),
        ],
        
        // Database Performance
        Recorders\SlowQueries::class => [
            'threshold' => env('PULSE_SLOW_QUERIES_THRESHOLD', 1000),
            'sample_rate' => env('PULSE_SLOW_QUERIES_SAMPLE_RATE', 0.1),
            'location' => env('PULSE_SLOW_QUERIES_LOCATION', true),
        ],
        
        // Cache Performance
        Recorders\CacheInteractions::class => [
            'sample_rate' => env('PULSE_CACHE_SAMPLE_RATE', 0.1),
        ],
        
        // Queue Monitoring
        Recorders\Queues::class => [
            'sample_rate' => env('PULSE_QUEUES_SAMPLE_RATE', 1),
        ],
        
        // User Requests
        Recorders\UserRequests::class => [
            'sample_rate' => env('PULSE_USER_REQUESTS_SAMPLE_RATE', 0.1),
            'ignore' => [
                '#^/pulse#',
                '#^/telescope#',
                '#^/health#',
            ],
        ],
        
        // Exceptions
        Recorders\Exceptions::class => [
            'sample_rate' => env('PULSE_EXCEPTIONS_SAMPLE_RATE', 1),
            'location' => env('PULSE_EXCEPTIONS_LOCATION', true),
            'ignore' => [
                // Ignore validation exceptions in forms
                ValidationException::class,
            ],
        ],
    ],
];
```

### Custom Performance Metrics
```php
// app/Services/PerformanceMonitor.php
<?php

namespace App\Services;

use Laravel\Pulse\Facades\Pulse;
use Illuminate\Support\Facades\DB;

class PerformanceMonitor
{
    public function recordBusinessMetric(string $metric, float $value, array $tags = []): void
    {
        Pulse::record('business_metric', $metric, $value, $tags);
    }
    
    public function recordFeatureUsage(string $feature, string $userId = null): void
    {
        Pulse::record('feature_usage', $feature, 1, [
            'user_id' => $userId,
            'timestamp' => now()->toISOString(),
        ]);
    }
    
    public function recordAPIPerformance(string $endpoint, float $duration, int $statusCode): void
    {
        Pulse::record('api_performance', $endpoint, $duration, [
            'status_code' => $statusCode,
            'response_time_ms' => round($duration * 1000, 2),
        ]);
    }
    
    public function recordDatabasePerformance(): array
    {
        $connectionCounts = [];
        
        foreach (config('database.connections') as $name => $config) {
            if ($config['driver'] === 'mysql') {
                $count = DB::connection($name)
                    ->select("SHOW STATUS LIKE 'Threads_connected'")[0]->Value;
                    
                $connectionCounts[$name] = (int) $count;
                
                Pulse::record('db_connections', $name, $count);
            }
        }
        
        return $connectionCounts;
    }
}
```

## Error Tracking & Alerting

### Sentry Integration
```php
// config/sentry.php
<?php

return [
    'dsn' => env('SENTRY_LARAVEL_DSN', env('SENTRY_DSN')),
    'release' => env('SENTRY_RELEASE'),
    'environment' => env('SENTRY_ENVIRONMENT', env('APP_ENV', 'production')),
    
    'breadcrumbs' => [
        'logs' => true,
        'cache' => true,
        'livewire' => true,
        'sql_queries' => env('SENTRY_TRACE_SQL_QUERIES', false),
        'redis' => true,
        'http_client_requests' => true,
    ],
    
    'tracing' => [
        'enabled' => env('SENTRY_TRACING_ENABLED', false),
        'sample_rate' => env('SENTRY_TRACING_SAMPLE_RATE', 0.1),
        'missing_routes' => true,
        'redis' => true,
        'http_client_requests' => true,
        'queue_jobs' => true,
        'sql_queries' => true,
    ],
    
    'profiles_sample_rate' => env('SENTRY_PROFILES_SAMPLE_RATE', 0.1),
    
    'send_default_pii' => env('SENTRY_SEND_DEFAULT_PII', false),
    
    'before_send_transaction' => function (\Sentry\Event $event): ?\Sentry\Event {
        // Filter out health check transactions
        if (str_contains($event->getTransaction() ?? '', '/health')) {
            return null;
        }
        
        return $event;
    },
];
```

### Custom Error Handling
```php
// app/Exceptions/Handler.php
<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Sentry\Laravel\Integration;

class Handler extends ExceptionHandler
{
    protected $dontReport = [
        \Illuminate\Auth\AuthenticationException::class,
        \Illuminate\Auth\Access\AuthorizationException::class,
        \Symfony\Component\HttpKernel\Exception\HttpException::class,
        \Illuminate\Database\Eloquent\ModelNotFoundException::class,
        \Illuminate\Validation\ValidationException::class,
    ];

    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            if (app()->bound('sentry')) {
                Integration::captureUnhandledException($e);
            }
            
            // Custom business logic error tracking
            if ($e instanceof \App\Exceptions\BusinessLogicException) {
                $this->recordBusinessError($e);
            }
        });
    }
    
    private function recordBusinessError(\App\Exceptions\BusinessLogicException $exception): void
    {
        Pulse::record('business_error', $exception->getErrorCode(), 1, [
            'message' => $exception->getMessage(),
            'context' => $exception->getContext(),
            'user_id' => auth()->id(),
        ]);
        
        // Alert for critical business errors
        if ($exception->isCritical()) {
            \Illuminate\Support\Facades\Notification::route('slack', config('alerts.slack_webhook'))
                ->notify(new \App\Notifications\CriticalBusinessError($exception));
        }
    }
}
```

## Frontend Performance Monitoring

### Client Frontend (TypeScript) - Web Vitals + PostHog
```typescript
// resources/js/client/monitoring/performance-monitor.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB, Metric } from 'web-vitals';
import posthog from 'posthog-js';

interface PerformanceData {
  metric: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  url: string;
  timestamp: number;
}

class ClientPerformanceMonitor {
  private apiEndpoint = '/api/metrics/web-vitals';
  
  init(): void {
    // Initialize PostHog if not already done
    if (!posthog.__loaded) {
      posthog.init(process.env.VITE_POSTHOG_KEY!, {
        api_host: process.env.VITE_POSTHOG_HOST || 'https://app.posthog.com',
        loaded: () => {
          // Track performance metrics once PostHog is loaded
          this.initWebVitals();
        }
      });
    } else {
      this.initWebVitals();
    }
    
    this.monitorRouteChanges();
    this.setupCustomMetrics();
  }
  
  private initWebVitals(): void {
    // Collect all Core Web Vitals
    getCLS(this.sendMetric.bind(this));
    getFID(this.sendMetric.bind(this));
    getFCP(this.sendMetric.bind(this));
    getLCP(this.sendMetric.bind(this));
    getTTFB(this.sendMetric.bind(this));
  }
  
  private sendMetric(metric: Metric): void {
    const data: PerformanceData = {
      metric: metric.name,
      value: metric.value,
      rating: metric.rating!,
      url: window.location.pathname,
      timestamp: Date.now()
    };
    
    // Send to Laravel backend for internal monitoring
    navigator.sendBeacon(this.apiEndpoint, JSON.stringify(data));
    
    // Send to PostHog for product analytics
    posthog.capture('web_vital_measured', {
      metric_name: metric.name,
      metric_value: metric.value,
      metric_rating: metric.rating,
      page_url: window.location.pathname,
      user_agent: navigator.userAgent
    });
    
    // Also send to Sentry for correlation
    if (window.Sentry) {
      window.Sentry.addBreadcrumb({
        category: 'performance',
        message: `${metric.name}: ${metric.value}`,
        level: 'info',
        data: data
      });
    }
  }
  
  private setupCustomMetrics(): void {
    // Track feature usage with PostHog
    this.trackFeatureUsage();
    
    // Monitor conversion funnels
    this.setupConversionTracking();
    
    // Track user engagement metrics
    this.trackEngagementMetrics();
  }
  
  private trackFeatureUsage(): void {
    // Track button clicks and feature interactions
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const featureName = target.dataset.feature || target.getAttribute('aria-label');
      
      if (featureName) {
        posthog.capture('feature_used', {
          feature_name: featureName,
          element_type: target.tagName,
          page_url: window.location.pathname
        });
      }
    });
  }
  
  private setupConversionTracking(): void {
    // Track key conversion events
    const conversionEvents = [
      'signup_completed',
      'purchase_completed',
      'trial_started',
      'subscription_upgraded'
    ];
    
    conversionEvents.forEach(event => {
      document.addEventListener(event, (customEvent: any) => {
        posthog.capture(event, {
          ...customEvent.detail,
          timestamp: Date.now()
        });
      });
    });
  }
  
  recordCustomMetric(name: string, value: number, context?: Record<string, any>): void {
    const data = {
      metric: `custom.${name}`,
      value,
      rating: 'good' as const,
      url: window.location.pathname,
      timestamp: Date.now(),
      context
    };
    
    // Send to Laravel
    navigator.sendBeacon(this.apiEndpoint, JSON.stringify(data));
    
    // Send to PostHog
    posthog.capture('custom_metric', {
      metric_name: name,
      metric_value: value,
      ...context
    });
  }
}

export default new ClientPerformanceMonitor();
```

### Admin Frontend (JavaScript) - Basic Monitoring
```javascript
// resources/js/admin/monitoring/performance-monitor.js
class AdminPerformanceMonitor {
  constructor() {
    this.apiEndpoint = '/api/metrics/admin-performance';
    this.init();
  }
  
  init() {
    this.monitorPageLoads();
    this.monitorUserInteractions();
    this.monitorErrors();
  }
  
  monitorPageLoads() {
    window.addEventListener('load', () => {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      
      this.sendMetric({
        type: 'page_load',
        value: loadTime,
        url: window.location.pathname,
        timestamp: Date.now()
      });
    });
  }
  
  monitorUserInteractions() {
    // Track admin actions
    document.addEventListener('click', (event) => {
      const target = event.target;
      const action = target.dataset.action;
      
      if (action) {
        this.sendMetric({
          type: 'admin_action',
          action: action,
          element: target.tagName,
          url: window.location.pathname,
          timestamp: Date.now()
        });
      }
    });
  }
  
  monitorErrors() {
    window.addEventListener('error', (event) => {
      this.sendMetric({
        type: 'javascript_error',
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        url: window.location.pathname,
        timestamp: Date.now()
      });
    });
  }
  
  sendMetric(data) {
    // Send to Laravel backend only (no external analytics for admin)
    fetch(this.apiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).catch(error => {
      console.warn('Failed to send admin metric:', error);
    });
  }
}

// Initialize admin monitoring
new AdminPerformanceMonitor();
```

### User Experience Monitoring
```typescript
// resources/js/monitoring/user-experience.ts
class UserExperienceMonitor {
  private interactionStartTime: number = 0;
  
  init(): void {
    this.monitorUserInteractions();
    this.monitorErrorBoundaries();
    this.monitorNetworkConditions();
  }
  
  private monitorUserInteractions(): void {
    // Track click-to-interaction delays
    document.addEventListener('click', (event) => {
      this.interactionStartTime = performance.now();
      
      // Track which elements users interact with most
      const target = event.target as HTMLElement;
      const elementInfo = {
        tagName: target.tagName,
        className: target.className,
        id: target.id,
        textContent: target.textContent?.slice(0, 50)
      };
      
      this.recordInteraction('click', elementInfo);
    });
    
    // Track form interactions
    document.addEventListener('submit', (event) => {
      const form = event.target as HTMLFormElement;
      const interactionTime = performance.now() - this.interactionStartTime;
      
      this.recordFormSubmission(form.id || form.className, interactionTime);
    });
  }
  
  private monitorErrorBoundaries(): void {
    window.addEventListener('error', (event) => {
      this.recordJavaScriptError({
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        url: window.location.href
      });
    });
    
    window.addEventListener('unhandledrejection', (event) => {
      this.recordPromiseRejection({
        reason: event.reason?.toString(),
        url: window.location.href
      });
    });
  }
  
  private recordInteraction(type: string, elementInfo: any): void {
    fetch('/api/metrics/user-interaction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type,
        element: elementInfo,
        url: window.location.pathname,
        timestamp: Date.now()
      })
    });
  }
}
```

## Business Intelligence & Analytics

### Custom Metrics Dashboard
```php
// app/Http/Controllers/MetricsDashboardController.php
<?php

namespace App\Http\Controllers;

use Laravel\Pulse\Facades\Pulse;
use Illuminate\Http\JsonResponse;

class MetricsDashboardController extends Controller
{
    public function businessMetrics(): JsonResponse
    {
        $metrics = [
            'user_engagement' => $this->getUserEngagementMetrics(),
            'feature_adoption' => $this->getFeatureAdoptionMetrics(),
            'performance_trends' => $this->getPerformanceTrends(),
            'error_trends' => $this->getErrorTrends(),
        ];
        
        return response()->json($metrics);
    }
    
    private function getUserEngagementMetrics(): array
    {
        return [
            'daily_active_users' => Pulse::values('feature_usage')
                ->where('type', 'login')
                ->whereBetween('timestamp', [now()->subDay(), now()])
                ->distinct('key_hash')
                ->count(),
                
            'session_duration' => Pulse::values('user_session')
                ->whereBetween('timestamp', [now()->subWeek(), now()])
                ->avg('value'),
                
            'page_views' => Pulse::values('user_requests')
                ->whereBetween('timestamp', [now()->subDay(), now()])
                ->count(),
        ];
    }
    
    private function getFeatureAdoptionMetrics(): array
    {
        $features = Pulse::values('feature_usage')
            ->whereBetween('timestamp', [now()->subMonth(), now()])
            ->groupBy('key')
            ->selectRaw('key as feature, COUNT(*) as usage_count, COUNT(DISTINCT key_hash) as unique_users')
            ->orderByDesc('usage_count')
            ->get();
            
        return [
            'top_features' => $features->take(10),
            'adoption_rate' => $this->calculateAdoptionRate($features),
            'feature_retention' => $this->calculateFeatureRetention($features),
        ];
    }
    
    private function getPerformanceTrends(): array
    {
        return [
            'response_times' => Pulse::values('api_performance')
                ->whereBetween('timestamp', [now()->subWeek(), now()])
                ->groupBy(DB::raw('DATE(timestamp)'))
                ->selectRaw('DATE(timestamp) as date, AVG(value) as avg_response_time')
                ->get(),
                
            'database_performance' => Pulse::values('slow_queries')
                ->whereBetween('timestamp', [now()->subWeek(), now()])
                ->groupBy(DB::raw('DATE(timestamp)'))
                ->selectRaw('DATE(timestamp) as date, COUNT(*) as slow_query_count')
                ->get(),
                
            'cache_hit_rate' => $this->calculateCacheHitRate(),
        ];
    }
    
    private function getErrorTrends(): array
    {
        return [
            'error_rate' => Pulse::values('exceptions')
                ->whereBetween('timestamp', [now()->subWeek(), now()])
                ->groupBy(DB::raw('DATE(timestamp)'))
                ->selectRaw('DATE(timestamp) as date, COUNT(*) as error_count')
                ->get(),
                
            'top_errors' => Pulse::values('exceptions')
                ->whereBetween('timestamp', [now()->subDay(), now()])
                ->groupBy('key')
                ->selectRaw('key as error_type, COUNT(*) as occurrence_count')
                ->orderByDesc('occurrence_count')
                ->take(10)
                ->get(),
        ];
    }
}
```

## Infrastructure Monitoring

### Server Performance Tracking
```php
// app/Console/Commands/MonitorServerHealth.php
<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Laravel\Pulse\Facades\Pulse;

class MonitorServerHealth extends Command
{
    protected $signature = 'monitor:server-health';
    protected $description = 'Monitor server health metrics';
    
    public function handle(): void
    {
        $this->recordCPUUsage();
        $this->recordMemoryUsage();
        $this->recordDiskUsage();
        $this->recordNetworkStats();
        $this->checkDatabaseConnections();
        $this->checkRedisConnection();
    }
    
    private function recordCPUUsage(): void
    {
        $cpuUsage = $this->getCPUUsage();
        Pulse::record('server_cpu', gethostname(), $cpuUsage);
        
        if ($cpuUsage > 80) {
            $this->alert("High CPU usage detected: {$cpuUsage}%");
        }
    }
    
    private function recordMemoryUsage(): void
    {
        $memoryStats = $this->getMemoryStats();
        $usagePercent = ($memoryStats['used'] / $memoryStats['total']) * 100;
        
        Pulse::record('server_memory', gethostname(), $usagePercent);
        
        if ($usagePercent > 85) {
            $this->alert("High memory usage detected: {$usagePercent}%");
        }
    }
    
    private function recordDiskUsage(): void
    {
        $diskStats = $this->getDiskStats();
        
        foreach ($diskStats as $mount => $stats) {
            $usagePercent = ($stats['used'] / $stats['total']) * 100;
            Pulse::record('server_disk', "{$mount}@" . gethostname(), $usagePercent);
            
            if ($usagePercent > 90) {
                $this->alert("High disk usage detected on {$mount}: {$usagePercent}%");
            }
        }
    }
    
    private function checkDatabaseConnections(): void
    {
        try {
            $connectionCount = DB::select("SHOW STATUS LIKE 'Threads_connected'")[0]->Value;
            $maxConnections = DB::select("SHOW VARIABLES LIKE 'max_connections'")[0]->Value;
            
            $usagePercent = ($connectionCount / $maxConnections) * 100;
            Pulse::record('db_connection_usage', 'mysql', $usagePercent);
            
            if ($usagePercent > 80) {
                $this->alert("High database connection usage: {$usagePercent}%");
            }
        } catch (\Exception $e) {
            $this->error("Failed to check database connections: " . $e->getMessage());
            Pulse::record('db_connection_error', 'mysql', 1);
        }
    }
    
    private function alert(string $message): void
    {
        \Illuminate\Support\Facades\Notification::route('slack', config('alerts.slack_webhook'))
            ->notify(new \App\Notifications\ServerAlert($message));
    }
}
```

### Queue Performance Monitoring
```php
// app/Services/QueueMonitor.php
<?php

namespace App\Services;

use Laravel\Pulse\Facades\Pulse;
use Illuminate\Support\Facades\Redis;

class QueueMonitor
{
    public function recordQueueMetrics(): void
    {
        $queues = config('queue.connections.redis.queues', ['default']);
        
        foreach ($queues as $queue) {
            $this->recordQueueDepth($queue);
            $this->recordQueueThroughput($queue);
            $this->recordFailedJobs($queue);
        }
    }
    
    private function recordQueueDepth(string $queue): void
    {
        $depth = Redis::llen("queues:{$queue}");
        Pulse::record('queue_depth', $queue, $depth);
        
        // Alert on queue backup
        if ($depth > 1000) {
            \Illuminate\Support\Facades\Notification::route('slack', config('alerts.slack_webhook'))
                ->notify(new \App\Notifications\QueueBackupAlert($queue, $depth));
        }
    }
    
    private function recordQueueThroughput(string $queue): void
    {
        // Calculate jobs processed in last minute
        $processedJobs = Pulse::values('queue_processed')
            ->where('key', $queue)
            ->whereBetween('timestamp', [now()->subMinute(), now()])
            ->count();
            
        Pulse::record('queue_throughput', $queue, $processedJobs);
    }
    
    private function recordFailedJobs(string $queue): void
    {
        $failedCount = \Illuminate\Support\Facades\DB::table('failed_jobs')
            ->where('queue', $queue)
            ->where('failed_at', '>', now()->subHour())
            ->count();
            
        Pulse::record('queue_failures', $queue, $failedCount);
        
        if ($failedCount > 10) {
            \Illuminate\Support\Facades\Notification::route('slack', config('alerts.slack_webhook'))
                ->notify(new \App\Notifications\QueueFailureAlert($queue, $failedCount));
        }
    }
}
```

## Alerting & Notification System

### Multi-Channel Alert Manager
```php
// app/Services/AlertManager.php
<?php

namespace App\Services;

use Illuminate\Notifications\Notification;

class AlertManager
{
    private array $channels = [];
    
    public function __construct()
    {
        $this->channels = [
            'critical' => ['slack', 'email', 'sms'],
            'warning' => ['slack', 'email'],
            'info' => ['slack'],
        ];
    }
    
    public function sendAlert(string $severity, string $title, string $message, array $context = []): void
    {
        $channels = $this->channels[$severity] ?? ['slack'];
        
        $alert = new \App\Notifications\SystemAlert($severity, $title, $message, $context);
        
        foreach ($channels as $channel) {
            $this->sendToChannel($channel, $alert);
        }
        
        // Log alert for audit trail
        \Illuminate\Support\Facades\Log::channel('alerts')->info("Alert sent", [
            'severity' => $severity,
            'title' => $title,
            'message' => $message,
            'context' => $context,
            'channels' => $channels,
        ]);
    }
    
    private function sendToChannel(string $channel, Notification $alert): void
    {
        switch ($channel) {
            case 'slack':
                \Illuminate\Support\Facades\Notification::route('slack', config('alerts.slack_webhook'))
                    ->notify($alert);
                break;
                
            case 'email':
                \Illuminate\Support\Facades\Notification::route('mail', config('alerts.email'))
                    ->notify($alert);
                break;
                
            case 'sms':
                \Illuminate\Support\Facades\Notification::route('vonage', config('alerts.phone'))
                    ->notify($alert);
                break;
        }
    }
    
    public function createIncident(string $title, string $description, array $metadata = []): void
    {
        // Integration with incident management tools
        $incident = [
            'title' => $title,
            'description' => $description,
            'severity' => $metadata['severity'] ?? 'medium',
            'service' => $metadata['service'] ?? 'unknown',
            'created_at' => now()->toISOString(),
            'metadata' => $metadata,
        ];
        
        // Send to incident management platform (PagerDuty, Opsgenie, etc.)
        $this->sendToIncidentManagement($incident);
    }
}
```

### Smart Alert Filtering
```php
// app/Services/AlertFilter.php
<?php

namespace App\Services;

class AlertFilter
{
    private array $suppressionRules = [];
    private array $escalationRules = [];
    
    public function shouldSendAlert(array $alert): bool
    {
        // Check suppression rules
        if ($this->isAlertSuppressed($alert)) {
            return false;
        }
        
        // Check rate limiting
        if ($this->isRateLimited($alert)) {
            return false;
        }
        
        // Check maintenance windows
        if ($this->isInMaintenanceWindow()) {
            return false;
        }
        
        return true;
    }
    
    private function isAlertSuppressed(array $alert): bool
    {
        foreach ($this->suppressionRules as $rule) {
            if ($this->matchesRule($alert, $rule)) {
                \Illuminate\Support\Facades\Log::info("Alert suppressed by rule", [
                    'alert' => $alert,
                    'rule' => $rule,
                ]);
                return true;
            }
        }
        
        return false;
    }
    
    private function isRateLimited(array $alert): bool
    {
        $key = "alert_rate_limit:" . md5(serialize($alert));
        $count = \Illuminate\Support\Facades\Cache::get($key, 0);
        
        if ($count >= config('alerts.rate_limit', 5)) {
            return true;
        }
        
        \Illuminate\Support\Facades\Cache::put($key, $count + 1, now()->addMinutes(15));
        return false;
    }
    
    public function escalateAlert(array $alert): bool
    {
        foreach ($this->escalationRules as $rule) {
            if ($this->shouldEscalate($alert, $rule)) {
                $this->performEscalation($alert, $rule);
                return true;
            }
        }
        
        return false;
    }
}
```

## Performance Optimization Insights

### Automated Performance Analysis
```php
// app/Services/PerformanceAnalyzer.php
<?php

namespace App\Services;

use Laravel\Pulse\Facades\Pulse;

class PerformanceAnalyzer
{
    public function generateOptimizationRecommendations(): array
    {
        return [
            'database' => $this->analyzeDatabasePerformance(),
            'cache' => $this->analyzeCachePerformance(),
            'queries' => $this->analyzeSlowQueries(),
            'endpoints' => $this->analyzeSlowEndpoints(),
            'frontend' => $this->analyzeFrontendPerformance(),
        ];
    }
    
    private function analyzeDatabasePerformance(): array
    {
        $slowQueries = Pulse::values('slow_queries')
            ->whereBetween('timestamp', [now()->subDay(), now()])
            ->orderByDesc('value')
            ->take(10)
            ->get();
            
        $recommendations = [];
        
        foreach ($slowQueries as $query) {
            $analysis = $this->analyzeQuery($query->key);
            
            if ($analysis['missing_indexes']) {
                $recommendations[] = [
                    'type' => 'add_index',
                    'query' => $query->key,
                    'suggested_indexes' => $analysis['suggested_indexes'],
                    'estimated_improvement' => $analysis['estimated_improvement'],
                ];
            }
            
            if ($analysis['n_plus_one']) {
                $recommendations[] = [
                    'type' => 'fix_n_plus_one',
                    'query' => $query->key,
                    'suggested_eager_loading' => $analysis['eager_loading_suggestions'],
                ];
            }
        }
        
        return $recommendations;
    }
    
    private function analyzeCachePerformance(): array
    {
        $cacheStats = Pulse::values('cache_interactions')
            ->whereBetween('timestamp', [now()->subDay(), now()])
            ->get();
            
        $hitRate = $this->calculateCacheHitRate($cacheStats);
        $recommendations = [];
        
        if ($hitRate < 0.8) {
            $recommendations[] = [
                'type' => 'improve_cache_strategy',
                'current_hit_rate' => $hitRate,
                'target_hit_rate' => 0.9,
                'suggestions' => [
                    'Implement query result caching for frequently accessed data',
                    'Add cache warming for critical application data',
                    'Optimize cache key strategies to reduce conflicts',
                ],
            ];
        }
        
        return [
            'hit_rate' => $hitRate,
            'recommendations' => $recommendations,
        ];
    }
    
    private function analyzeSlowEndpoints(): array
    {
        $slowEndpoints = Pulse::values('api_performance')
            ->whereBetween('timestamp', [now()->subDay(), now()])
            ->where('value', '>', 1) // Slower than 1 second
            ->groupBy('key')
            ->selectRaw('key as endpoint, AVG(value) as avg_response_time, COUNT(*) as request_count')
            ->orderByDesc('avg_response_time')
            ->take(10)
            ->get();
            
        return $slowEndpoints->map(function ($endpoint) {
            return [
                'endpoint' => $endpoint->endpoint,
                'avg_response_time' => round($endpoint->avg_response_time, 3),
                'request_count' => $endpoint->request_count,
                'suggestions' => $this->generateEndpointOptimizations($endpoint),
            ];
        })->toArray();
    }
    
    private function generateEndpointOptimizations($endpoint): array
    {
        $suggestions = [];
        
        if ($endpoint->avg_response_time > 2) {
            $suggestions[] = 'Consider implementing response caching';
            $suggestions[] = 'Review database queries for optimization opportunities';
        }
        
        if ($endpoint->request_count > 1000) {
            $suggestions[] = 'High traffic endpoint - consider rate limiting';
            $suggestions[] = 'Implement CDN caching if possible';
        }
        
        return $suggestions;
    }
}
```

## Real-Time Dashboard

### Metrics Dashboard API
```php
// app/Http/Controllers/Api/DashboardController.php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Laravel\Pulse\Facades\Pulse;

class DashboardController extends Controller
{
    public function realTimeMetrics()
    {
        return response()->json([
            'system_health' => $this->getSystemHealth(),
            'application_metrics' => $this->getApplicationMetrics(),
            'user_activity' => $this->getUserActivity(),
            'alerts' => $this->getActiveAlerts(),
            'performance_summary' => $this->getPerformanceSummary(),
        ]);
    }
    
    private function getSystemHealth(): array
    {
        return [
            'status' => $this->calculateOverallHealth(),
            'uptime' => $this->getSystemUptime(),
            'cpu_usage' => $this->getLatestMetric('server_cpu'),
            'memory_usage' => $this->getLatestMetric('server_memory'),
            'disk_usage' => $this->getLatestMetric('server_disk'),
            'database_status' => $this->getDatabaseStatus(),
            'cache_status' => $this->getCacheStatus(),
        ];
    }
    
    private function getApplicationMetrics(): array
    {
        return [
            'active_users' => $this->getActiveUserCount(),
            'requests_per_minute' => $this->getRequestsPerMinute(),
            'average_response_time' => $this->getAverageResponseTime(),
            'error_rate' => $this->getErrorRate(),
            'queue_depth' => $this->getTotalQueueDepth(),
        ];
    }
    
    private function getPerformanceSummary(): array
    {
        $now = now();
        $oneHourAgo = $now->copy()->subHour();
        
        return [
            'web_vitals' => [
                'lcp' => $this->getAverageWebVital('LCP', $oneHourAgo, $now),
                'fid' => $this->getAverageWebVital('FID', $oneHourAgo, $now),
                'cls' => $this->getAverageWebVital('CLS', $oneHourAgo, $now),
            ],
            'api_performance' => [
                'p50' => $this->getPercentileResponseTime(50, $oneHourAgo, $now),
                'p95' => $this->getPercentileResponseTime(95, $oneHourAgo, $now),
                'p99' => $this->getPercentileResponseTime(99, $oneHourAgo, $now),
            ],
            'trends' => [
                'response_time_trend' => $this->getResponseTimeTrend(),
                'error_rate_trend' => $this->getErrorRateTrend(),
                'throughput_trend' => $this->getThroughputTrend(),
            ],
        ];
    }
}
```

---

## Implementation Checklist

### Phase 1: Core Monitoring (Week 1)
- [ ] Configure Laravel Pulse with all recorders
- [ ] Set up Sentry for error tracking and performance
- [ ] Implement basic server health monitoring
- [ ] Configure Slack/Teams alerting

### Phase 2: Advanced Metrics (Week 2)
- [ ] Deploy web vitals collection on frontend
- [ ] Set up business metrics tracking
- [ ] Implement queue performance monitoring
- [ ] Create real-time dashboard API

### Phase 3: Intelligence & Optimization (Week 3)
- [ ] Deploy automated performance analysis
- [ ] Set up smart alert filtering and escalation
- [ ] Implement optimization recommendations
- [ ] Create comprehensive reporting

### Monitoring Targets
| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| API Response Time | < 200ms avg | > 500ms |
| Error Rate | < 0.1% | > 1% |
| Database Query Time | < 100ms avg | > 1000ms |
| Cache Hit Rate | > 90% | < 80% |
| Queue Processing | < 5min avg | > 15min |
| Server CPU | < 70% avg | > 85% |
| Memory Usage | < 80% avg | > 90% |

*This monitoring strategy provides comprehensive visibility into application performance, user experience, and system health with intelligent alerting and optimization recommendations.*