# TCP Credit Repair - Cline Prompt Templates

## Quick Test Generation Commands

### React Component Testing
```
Write comprehensive Vitest tests for this React component that:
1. Test all user interactions (clicks, form inputs, state changes)
2. Verify accessibility compliance (WCAG 2.1 AA standards)
3. Test loading states, error boundaries, and edge cases
4. Mock API calls with realistic credit repair data
5. Test responsive design breakpoints (mobile/desktop)
6. Verify proper data sanitization and PII masking
7. Include credit score range validation (300-850)
Run the tests and fix any failures until 100% pass rate
```

### Laravel API Endpoint Testing
```
Generate comprehensive PHPUnit tests for this Laravel controller that:
1. Test FCRA Section 604 permissible purpose validation
2. Verify audit trail creation for all credit data access
3. Test rate limiting and authentication/authorization
4. Mock external credit bureau API responses appropriately
5. Test input validation and SQL injection prevention
6. Verify proper error responses with compliance messaging
7. Test database transactions and rollback scenarios
Include both Feature and Unit tests, run them, and fix until passing
```

### Credit Calculation Logic Testing
```
Create thorough Vitest tests for this credit calculation module that:
1. Test FICO 8 algorithm implementation with various score ranges
2. Verify 300-850 score boundary enforcement
3. Test edge cases (missing data, invalid inputs, extreme values)
4. Validate payment history weight calculations (35% of score)
5. Test credit utilization impact (30% of score)
6. Verify length of credit history calculations (15% of score)
7. Test credit mix and new credit factors (10% each)
8. Include compliance validation for dispute scenarios
Run tests and ensure mathematical accuracy matches FICO standards
```

### Database Migration Testing
```
Write PHPUnit tests for this Laravel migration that:
1. Test successful migration up and down operations
2. Verify proper foreign key constraints and indexes
3. Test data integrity during migration
4. Validate PII encryption in new columns
5. Test audit trail table creation if applicable
6. Verify FCRA compliance in data structure
7. Test rollback scenarios and data preservation
Run migration tests in isolated database and fix issues
```

### E2E Credit Dispute Workflow
```
Create Playwright E2E tests for the credit dispute process that:
1. Login as test user with realistic credit profile
2. Navigate to dispute dashboard and load credit reports
3. Select dispute items with various dispute reasons
4. Upload supporting documents (PDF, images)
5. Submit dispute and verify confirmation messaging
6. Test email notification delivery (mock SMTP)
7. Verify audit log entries for compliance
8. Test dispute status tracking and updates
9. Validate dispute resolution workflow completion
Run against staging environment and fix any timing issues
```

## Domain-Specific Test Patterns

### FCRA Compliance Validation
```
Add FCRA compliance tests to this code that verify:
1. Audit trail logging for all credit data access with user ID and timestamp
2. Permissible purpose validation before credit pulls (Section 604)
3. Consumer consent verification and documentation
4. Dispute resolution timeline compliance (30-day rule)
5. Data accuracy requirements and correction procedures
6. Consumer notification requirements for adverse actions
7. Data retention policies (7-year rule for most items)
Include mock compliance scenarios and edge cases
```

### PII Data Protection Testing
```
Generate security tests for PII handling that:
1. Verify SSN encryption at rest and in transit
2. Test proper data masking in logs and error messages
3. Validate secure data transmission (HTTPS, TLS 1.3)
4. Test data access controls and user permissions
5. Verify secure deletion of expired consumer data
6. Test backup and restore procedures for encrypted data
7. Validate compliance with state privacy laws (CCPA, etc.)
Include penetration testing scenarios for data exposure
```

### Credit Bureau Integration Testing
```
Create integration tests for credit bureau APIs that:
1. Mock Experian, Equifax, TransUnion API responses
2. Test API timeout handling and retry mechanisms
3. Verify credit report parsing and data normalization
4. Test error handling for bureau service outages
5. Validate rate limiting compliance with bureau agreements
6. Test credit monitoring webhook processing
7. Verify proper dispute submission to bureaus
8. Test credit score update notifications
Include realistic credit report data in mocks
```

## Performance & Security Testing

### Load Testing for Credit Processing
```
Create performance tests for credit processing that:
1. Test concurrent credit report pulls (50+ simultaneous)
2. Verify database query performance with large datasets
3. Test memory usage during bulk credit score calculations
4. Validate API response times under load (< 2 seconds)
5. Test cache efficiency for frequent credit lookups
6. Verify proper connection pooling and resource cleanup
7. Test graceful degradation under system stress
Use realistic production data volumes in testing
```

### Security Testing for Credit Platform
```
Generate security tests that verify:
1. SQL injection prevention in all database queries
2. XSS protection in credit report display components
3. CSRF token validation for sensitive operations
4. Authentication bypass attempts and session management
5. File upload security (malware scanning, type validation)
6. API endpoint authorization and privilege escalation
7. Sensitive data exposure in error messages and logs
8. Rate limiting effectiveness against brute force attacks
Include OWASP Top 10 vulnerability testing scenarios
```

## Maintenance & Monitoring

### Test Coverage Analysis
```
Analyze the current test coverage for this module and:
1. Identify untested code paths and functions
2. Generate tests for missing coverage areas
3. Create integration tests for component interactions
4. Add regression tests for previously fixed bugs
5. Verify edge case coverage for credit calculations
6. Test error handling paths and exception scenarios
7. Create performance benchmarks for critical functions
Achieve minimum 90% code coverage with meaningful tests
```

### Test Maintenance & Optimization
```
Review and optimize existing tests in this file:
1. Remove duplicate or redundant test cases
2. Improve test readability and maintainability
3. Update mock data to reflect current business rules
4. Optimize slow-running tests for better CI/CD performance
5. Add missing assertions and validation checks
6. Update deprecated testing library usage
7. Ensure tests follow current TCP coding standards
Run all tests and verify they still pass after optimization
```

## Quick Commands for Common Tasks

### Add Missing Tests
```
"Scan this directory for files missing tests and generate comprehensive test suites for each one using appropriate testing frameworks (Vitest, PHPUnit, Playwright). Focus on credit repair domain requirements and FCRA compliance."
```

### Fix Failing Tests
```
"Fix all failing tests in this project by analyzing the errors, updating the test expectations, and modifying the source code as needed. Maintain existing functionality while ensuring tests pass."
```

### Update Test Data
```
"Update all test mock data to reflect current credit repair industry standards, FICO score ranges, and realistic consumer credit profiles. Ensure PII is properly masked in test data."
```

### Compliance Audit
```
"Review all tests for FCRA compliance coverage and add missing compliance validation tests where needed. Focus on audit trails, consumer rights, and data protection requirements."
```

These templates are designed to work with Cline's natural language processing while maintaining the specific credit repair domain expertise and compliance requirements for The Credit Pros.