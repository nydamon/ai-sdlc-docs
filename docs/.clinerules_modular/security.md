# Security Rules - PII Protection and Data Security

## PII Data Protection Requirements

### Never Log or Expose PII in Code

- **SSN**: Always encrypt, never log in plain text
- **Credit Card Numbers**: Always mask except last 4 digits
- **Phone Numbers**: Mask middle digits when logging
- **Email Addresses**: Hash when logging for debugging
- **Addresses**: Log only city/state for analytics, never full addresses

**Code Pattern for PII Masking:**

```typescript
// Always use these functions for PII handling
function maskSSN(ssn: string): string {
  if (ssn.length < 4) return '***';
  return `***-**-${ssn.slice(-4)}`;
}

function maskCreditCard(cardNumber: string): string {
  if (cardNumber.length < 4) return cardNumber;
  return `${'*'.repeat(cardNumber.length - 4)}${cardNumber.slice(-4)}`;
}

function maskPhoneNumber(phone: string): string {
  if (phone.length < 4) return '***';
  return `${phone.slice(0, 3)}-***-${phone.slice(-4)}`;
}

// Hash email for debugging purposes
function hashEmail(email: string): string {
  return crypto
    .createHash('sha256')
    .update(email)
    .digest('hex')
    .substring(0, 8);
}
```

### Database Encryption Requirements

All PII must be encrypted at rest using AES-256:

```typescript
interface EncryptedConsumerData {
  id: string;
  encrypted_ssn: string; // AES-256 encrypted
  encrypted_dob: string; // AES-256 encrypted
  encrypted_phone: string; // AES-256 encrypted
  encrypted_address: string; // AES-256 encrypted
  name_hash: string; // SHA-256 hash for search
  created_at: Date;
  updated_at: Date;
}

// Always use encryption service
const encryptionService = {
  encrypt: (data: string, key: string): string => {
    // AES-256-GCM encryption implementation
    const cipher = crypto.createCipher('aes-256-gcm', key);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  },

  decrypt: (encryptedData: string, key: string): string => {
    // AES-256-GCM decryption implementation
    const decipher = crypto.createDecipher('aes-256-gcm', key);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  },
};
```

## Authentication & Authorization

### JWT Token Security

- Use secure tokens with proper expiration
- Implement token rotation for long-lived sessions
- Always validate tokens on every API request
- Include role-based permissions in token payload

```typescript
interface JWTPayload {
  userId: string;
  userRole: 'admin' | 'agent' | 'manager' | 'viewer';
  permissions: string[];
  iat: number;
  exp: number;
  iss: 'thecreditpros.com';
}

// Always validate JWT tokens
function validateJWTToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;

    // Check expiration
    if (decoded.exp < Date.now() / 1000) {
      throw new Error('Token expired');
    }

    // Validate issuer
    if (decoded.iss !== 'thecreditpros.com') {
      throw new Error('Invalid token issuer');
    }

    return decoded;
  } catch (error) {
    logger.warn('JWT validation failed', {
      error: error.message,
      tokenHash: hashToken(token),
    });
    return null;
  }
}
```

### API Security Headers

Always include security headers in API responses:

```typescript
// Required security headers for all responses
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Content-Security-Policy':
    "default-src 'self'; script-src 'self' 'unsafe-inline'",
  'Referrer-Policy': 'strict-origin-when-cross-origin',
};

// Apply to all Express responses
app.use((req, res, next) => {
  Object.entries(securityHeaders).forEach(([key, value]) => {
    res.header(key, value);
  });
  next();
});
```

## Input Validation & Sanitization

### SQL Injection Prevention

Always use parameterized queries, never string concatenation:

```typescript
// NEVER do this (vulnerable to SQL injection)
const badQuery = `SELECT * FROM consumers WHERE ssn = '${userInput}'`;

// ALWAYS do this (parameterized query)
const safeQuery = `SELECT * FROM consumers WHERE ssn = ?`;
const results = await db.query(safeQuery, [userInput]);
```

```php
// Laravel - Always use Eloquent or Query Builder
// NEVER do this
$badQuery = "SELECT * FROM consumers WHERE ssn = '{$request->ssn}'";

// ALWAYS do this
$consumer = Consumer::where('ssn', $request->ssn)->first();

// Or with Query Builder
$results = DB::table('consumers')
  ->where('ssn', $request->ssn)
  ->first();
```

### XSS Prevention

Sanitize all user inputs before displaying:

```typescript
import DOMPurify from 'dompurify';

// Always sanitize HTML content
function sanitizeUserInput(input: string): string {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong'],
    ALLOWED_ATTR: []
  });
}

// React component with XSS protection
const UserCommentDisplay: React.FC<{ comment: string }> = ({ comment }) => {
  const sanitizedComment = sanitizeUserInput(comment);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: sanitizedComment }}
      data-testid="user-comment"
    />
  );
};
```

### CSRF Protection

Implement CSRF tokens for all state-changing operations:

```typescript
// Express middleware for CSRF protection
import csrf from 'csurf';

const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  }
});

app.use(csrfProtection);

// React component with CSRF token
const SecureForm: React.FC = () => {
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    fetch('/api/csrf-token')
      .then(res => res.json())
      .then(data => setCsrfToken(data.csrfToken));
  }, []);

  return (
    <form>
      <input type="hidden" name="_token" value={csrfToken} />
      {/* Form fields */}
    </form>
  );
};
```

## Error Handling & Logging

### Secure Error Messages

Never expose sensitive information in error messages:

```typescript
class SecurityError extends Error {
  public userMessage: string;
  public internalMessage: string;

  constructor(userMessage: string, internalMessage: string) {
    super(internalMessage);
    this.userMessage = userMessage;
    this.internalMessage = internalMessage;
  }
}

// API error handler
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  // Log detailed error internally
  logger.error('API Error', {
    error: error.message,
    stack: error.stack,
    userId: req.user?.id,
    endpoint: req.path,
    method: req.method,
    ip: req.ip,
  });

  // Return generic error to user
  if (error instanceof SecurityError) {
    res.status(403).json({
      error: error.userMessage,
      timestamp: new Date().toISOString(),
    });
  } else {
    res.status(500).json({
      error: 'An internal server error occurred',
      timestamp: new Date().toISOString(),
    });
  }
});
```

### Audit Logging for Security Events

Log all security-relevant events:

```typescript
interface SecurityEvent {
  type:
    | 'login_attempt'
    | 'login_failure'
    | 'permission_denied'
    | 'data_access'
    | 'suspicious_activity';
  userId?: string;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
  details: Record<string, any>;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

function logSecurityEvent(event: SecurityEvent): void {
  // Log to security monitoring system
  securityLogger.log({
    ...event,
    environment: process.env.NODE_ENV,
    application: 'ai-sdlc-framework',
  });

  // Alert on high severity events
  if (event.severity === 'high' || event.severity === 'critical') {
    alertingSystem.sendAlert({
      subject: `Security Alert: ${event.type}`,
      body: `Security event detected: ${event.details}`,
      severity: event.severity,
    });
  }
}

// Usage examples
logSecurityEvent({
  type: 'login_failure',
  ipAddress: req.ip,
  userAgent: req.headers['user-agent'],
  timestamp: new Date(),
  details: {
    attempted_email: maskEmail(req.body.email),
    reason: 'invalid_credentials',
  },
  severity: 'medium',
});
```

## Rate Limiting & DDoS Protection

### API Rate Limiting

Implement rate limiting to prevent abuse:

```typescript
import rateLimit from 'express-rate-limit';

// General API rate limiting
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP',
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict rate limiting for sensitive endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many authentication attempts',
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
});

// Apply rate limiting
app.use('/api', generalLimiter);
app.use('/api/auth', authLimiter);
```

### Request Size Limiting

Prevent large payload attacks:

```typescript
import express from 'express';

// Limit request payload size
app.use(
  express.json({
    limit: '10mb',
    verify: (req, res, buf, encoding) => {
      // Additional validation can be added here
      if (buf.length > 10 * 1024 * 1024) {
        throw new Error('Request payload too large');
      }
    },
  })
);

// Limit URL-encoded payload size
app.use(
  express.urlencoded({
    limit: '10mb',
    extended: true,
  })
);
```

## Environment & Configuration Security

### Environment Variable Security

Never expose sensitive configuration:

```typescript
// Environment variable validation
const requiredEnvVars = [
  'DATABASE_URL',
  'JWT_SECRET',
  'ENCRYPTION_KEY',
  'OPENAI_API_KEY',
];

// Check all required environment variables exist
requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    throw new Error(`Missing required environment variable: ${varName}`);
  }
});

// Validate environment variable formats
if (process.env.JWT_SECRET!.length < 32) {
  throw new Error('JWT_SECRET must be at least 32 characters');
}

// Never log environment variables
logger.info('Application starting', {
  nodeVersion: process.version,
  environment: process.env.NODE_ENV,
  // NEVER log: process.env
});
```

### Database Connection Security

Secure database connections:

```typescript
// Database connection with SSL
const dbConfig = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl:
    process.env.NODE_ENV === 'production'
      ? {
          require: true,
          rejectUnauthorized: false,
        }
      : false,
  pool: {
    min: 2,
    max: 10,
    acquire: 30000,
    idle: 10000,
  },
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
};
```

## Security Testing Requirements

### Security Test Patterns

Always include security tests:

```typescript
describe('Security Tests', () => {
  describe('SQL Injection Prevention', () => {
    it('should prevent SQL injection in user search', async () => {
      const maliciousInput = "'; DROP TABLE consumers; --";

      const response = await request(app)
        .get('/api/consumers/search')
        .query({ name: maliciousInput })
        .expect(200);

      // Should not return error about dropped table
      expect(response.body.error).not.toContain('table');
    });
  });

  describe('XSS Prevention', () => {
    it('should sanitize user input in comments', async () => {
      const maliciousScript = '<script>alert("xss")</script>';

      const response = await request(app)
        .post('/api/comments')
        .send({ comment: maliciousScript })
        .expect(201);

      // Should not contain script tags
      expect(response.body.comment).not.toContain('<script>');
    });
  });

  describe('Authentication Tests', () => {
    it('should reject invalid JWT tokens', async () => {
      const invalidToken = 'invalid.jwt.token';

      await request(app)
        .get('/api/protected-endpoint')
        .set('Authorization', `Bearer ${invalidToken}`)
        .expect(401);
    });

    it('should reject expired JWT tokens', async () => {
      const expiredToken = generateExpiredToken();

      await request(app)
        .get('/api/protected-endpoint')
        .set('Authorization', `Bearer ${expiredToken}`)
        .expect(401);
    });
  });

  describe('Rate Limiting Tests', () => {
    it('should enforce rate limiting on auth endpoints', async () => {
      // Make multiple requests rapidly
      const promises = Array(10)
        .fill(null)
        .map(() =>
          request(app)
            .post('/api/auth/login')
            .send({ email: 'test@example.com', password: 'wrong' })
        );

      const responses = await Promise.all(promises);
      const rateLimitedResponses = responses.filter((r) => r.status === 429);

      expect(rateLimitedResponses.length).toBeGreaterThan(0);
    });
  });
});
```

These security rules ensure comprehensive protection of PII data and system security across The Credit Pros AI-SDLC framework. All code must implement these security patterns to maintain compliance and protect sensitive consumer information.
