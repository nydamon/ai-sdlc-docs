# Compliance Rules - FCRA/FACTA/CROA Implementation

## Fair Credit Reporting Act (FCRA) Implementation

### Permissible Purpose Validation

All credit report access MUST be validated before processing:

```typescript
// Required permissible purpose validation
enum PermissiblePurpose {
  CREDIT_APPLICATION = 'credit_application',
  ACCOUNT_REVIEW = 'account_review',
  EMPLOYMENT = 'employment',
  INSURANCE = 'insurance',
  BUSINESS_TRANSACTION = 'business_transaction',
  COURT_ORDER = 'court_order',
}

function validatePermissiblePurpose(
  purpose: PermissiblePurpose,
  userId: string,
  context: AccessContext
): boolean {
  // Log ALL validation attempts for compliance
  auditLogger.record({
    action: 'permissible_purpose_validation',
    purpose,
    userId,
    ipAddress: context.ipAddress,
    timestamp: new Date().toISOString(),
    userAgent: context.userAgent,
  });

  // Check user permissions for specific purpose
  const hasPermission = userPermissions.hasAccess(userId, purpose);

  if (!hasPermission) {
    // Log compliance violation
    complianceLogger.logViolation({
      type: 'FCRA_PERMISSIBLE_PURPOSE_VIOLATION',
      userId,
      attemptedPurpose: purpose,
      severity: 'HIGH',
      timestamp: new Date(),
    });

    throw new FCRAViolationError(
      `User ${userId} lacks permission for purpose: ${purpose}`
    );
  }

  return true;
}

// Usage in credit report controllers
export const getCreditReport = async (req: Request, res: Response) => {
  try {
    // ALWAYS validate permissible purpose first
    validatePermissiblePurpose(req.body.permissible_purpose, req.user.id, {
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
    });

    // Proceed with credit report retrieval
    const creditReport = await creditReportService.getCreditReport(
      req.params.consumerId,
      req.body.permissible_purpose
    );

    res.json({ data: creditReport });
  } catch (error) {
    if (error instanceof FCRAViolationError) {
      res
        .status(403)
        .json({ error: 'Access denied due to compliance requirements' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};
```

### Dispute Processing (Section 611)

30-day dispute resolution timeline MUST be enforced:

```typescript
interface DisputeRecord {
  disputeId: string;
  consumerId: string;
  items: DisputeItem[];
  submissionDate: Date;
  resolutionDeadline: Date;
  status: 'submitted' | 'investigating' | 'resolved' | 'frivolous';
  auditTrail: AuditEntry[];
}

function processNewDispute(disputeData: NewDisputeData): DisputeRecord {
  const submissionDate = new Date();
  const resolutionDeadline = new Date(
    submissionDate.getTime() + 30 * 24 * 60 * 60 * 1000
  );

  const dispute: DisputeRecord = {
    disputeId: generateDisputeId(),
    consumerId: disputeData.consumerId,
    items: disputeData.items,
    submissionDate,
    resolutionDeadline,
    status: 'submitted',
    auditTrail: [
      {
        action: 'dispute_submitted',
        timestamp: submissionDate,
        userId: disputeData.submittedBy,
        details: 'Consumer dispute submitted for investigation',
      },
    ],
  };

  // Schedule automatic resolution reminder
  scheduleResolutionReminder(dispute.disputeId, resolutionDeadline);

  // Log dispute submission for compliance
  complianceLogger.record({
    action: 'dispute_submitted',
    disputeId: dispute.disputeId,
    consumerId: dispute.consumerId,
    resolutionDeadline: resolutionDeadline.toISOString(),
    itemCount: dispute.items.length,
  });

  return dispute;
}

// Automated compliance monitoring
function checkDisputeDeadlines(): void {
  const overdueDisputes = disputeRepository.findOverdueDisputes(new Date());

  overdueDisputes.forEach((dispute) => {
    complianceLogger.logViolation({
      type: 'FCRA_DISPUTE_DEADLINE_VIOLATION',
      disputeId: dispute.disputeId,
      originalDeadline: dispute.resolutionDeadline,
      daysOverdue: calculateDaysOverdue(dispute.resolutionDeadline),
      severity: 'CRITICAL',
    });
  });
}
```

### Adverse Action Notices (Section 613)

Required notifications for credit-based decisions:

```typescript
interface AdverseActionNotice {
  consumerId: string;
  actionTaken: string;
  creditReportingAgency: {
    name: string;
    address: string;
    phone: string;
    website: string;
  };
  consumerRights: {
    freeReportRight: string;
    disputeRight: string;
    contactInfo: string;
  };
  notificationDate: Date;
  deliveryMethod: 'email' | 'mail' | 'sms';
}

async function sendAdverseActionNotice(
  consumerId: string,
  actionDetails: string,
  creditBureau: 'experian' | 'equifax' | 'transunion'
): Promise<void> {
  const bureauInfo = getCreditBureauInfo(creditBureau);

  const notice: AdverseActionNotice = {
    consumerId,
    actionTaken: actionDetails,
    creditReportingAgency: bureauInfo,
    consumerRights: {
      freeReportRight:
        'You have the right to a free copy of your credit report from the credit reporting agency used',
      disputeRight:
        'You have the right to dispute inaccurate or incomplete information in your credit report',
      contactInfo:
        'Contact the credit reporting agency to request your report or file a dispute',
    },
    notificationDate: new Date(),
    deliveryMethod: 'email',
  };

  // Send notice within required timeframe
  await notificationService.sendAdverseActionNotice(notice);

  // Log for compliance tracking
  complianceLogger.record({
    action: 'adverse_action_notice_sent',
    consumerId: notice.consumerId,
    actionTaken: notice.actionTaken,
    creditBureau,
    sentDate: notice.notificationDate.toISOString(),
  });
}
```

## Fair and Accurate Credit Transactions Act (FACTA)

### Red Flags Rule Implementation

Identity theft prevention program:

```typescript
interface RedFlag {
  type:
    | 'ADDRESS_DISCREPANCY'
    | 'CREDIT_REPORT_IRREGULARITY'
    | 'ACCOUNT_PATTERN_ANOMALY'
    | 'IDENTITY_VERIFICATION_FAILURE';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  detectedAt: Date;
  consumerInfo?: string; // Masked consumer identifier
}

function detectRedFlags(application: CreditApplication): RedFlag[] {
  const flags: RedFlag[] = [];

  // Address discrepancy check
  if (application.providedAddress !== application.creditReportAddress) {
    flags.push({
      type: 'ADDRESS_DISCREPANCY',
      severity: 'HIGH',
      description:
        'Consumer provided address differs from credit report address',
      detectedAt: new Date(),
      consumerInfo: maskConsumerInfo(application.consumerId),
    });
  }

  // Credit report irregularity check
  const irregularities = analyzeReportIrregularities(application.creditReport);
  if (irregularities.length > 0) {
    flags.push({
      type: 'CREDIT_REPORT_IRREGULARITY',
      severity: 'MEDIUM',
      description: `Unusual patterns detected: ${irregularities.join(', ')}`,
      detectedAt: new Date(),
      consumerInfo: maskConsumerInfo(application.consumerId),
    });
  }

  // Account pattern anomaly check
  if (hasAccountPatternAnomalies(application.creditReport)) {
    flags.push({
      type: 'ACCOUNT_PATTERN_ANOMALY',
      severity: 'HIGH',
      description: 'Suspicious account opening patterns detected',
      detectedAt: new Date(),
      consumerInfo: maskConsumerInfo(application.consumerId),
    });
  }

  // Log all red flags for compliance
  flags.forEach((flag) => {
    complianceLogger.record({
      action: 'red_flag_detected',
      flagType: flag.type,
      severity: flag.severity,
      description: flag.description,
      timestamp: flag.detectedAt.toISOString(),
    });
  });

  return flags;
}

// Response procedures for red flags
function handleRedFlags(
  flags: RedFlag[],
  application: CreditApplication
): void {
  const highSeverityFlags = flags.filter(
    (f) => f.severity === 'HIGH' || f.severity === 'CRITICAL'
  );

  if (highSeverityFlags.length > 0) {
    // Enhanced verification required
    initiateEnhancedVerification(application.consumerId, highSeverityFlags);

    // Alert compliance team
    alertComplianceTeam({
      type: 'HIGH_RISK_RED_FLAGS',
      applicationId: application.id,
      flagCount: highSeverityFlags.length,
      flags: highSeverityFlags,
    });
  }
}
```

### Truncation Requirements

Credit card number truncation in all receipts and statements:

```typescript
function truncateCreditCardNumber(cardNumber: string): string {
  // Remove any existing formatting
  const cleanNumber = cardNumber.replace(/\D/g, '');

  if (cleanNumber.length < 4) {
    return cardNumber; // Return as-is if too short
  }

  // Show only last 4 digits
  const lastFour = cleanNumber.slice(-4);
  const maskedDigits = '*'.repeat(cleanNumber.length - 4);

  return `${maskedDigits}${lastFour}`;
}

// Apply truncation to all payment displays
const PaymentDisplay: React.FC<{ payment: PaymentInfo }> = ({ payment }) => {
  const truncatedCard = truncateCreditCardNumber(payment.cardNumber);

  return (
    <div className="payment-info">
      <span>Card: {truncatedCard}</span>
      <span>Amount: ${payment.amount}</span>
    </div>
  );
};

// Database storage - never store full card numbers
interface PaymentRecord {
  id: string;
  cardLastFour: string; // Only store last 4 digits
  cardType: 'visa' | 'mastercard' | 'amex' | 'discover';
  amount: number;
  transactionDate: Date;
}
```

## Credit Repair Organizations Act (CROA)

### Service Agreement Requirements

Written contracts with mandatory disclosures:

```typescript
interface CreditRepairAgreement {
  serviceId: string;
  consumerId: string;
  services: CreditRepairService[];
  feeStructure: 'pay_after_service' | 'monthly_subscription';
  disclaimers: string[];
  consumerRights: string[];
  signedDate: Date | null;
  effectiveDate: Date | null;
  cancellationDeadline: Date;
}

function createCreditRepairAgreement(
  consumerId: string,
  services: CreditRepairService[]
): CreditRepairAgreement {
  const agreement: CreditRepairAgreement = {
    serviceId: generateServiceId(),
    consumerId,
    services,
    feeStructure: 'pay_after_service', // CROA requirement
    disclaimers: [
      'Results are not guaranteed and may vary based on individual circumstances',
      'The length of time required to complete services varies by individual',
      'We cannot remove accurate negative information from your credit report',
      'You have the right to dispute items in your credit report yourself at no cost',
      'Your payment obligations begin only after services have been performed',
    ],
    consumerRights: [
      'You have the right to cancel this contract within 3 business days without penalty',
      'You may cancel this contract at any time with written notice',
      'You will not be charged until services have been completed',
      'You have the right to see a written contract before paying any fees',
    ],
    signedDate: null,
    effectiveDate: null,
    cancellationDeadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 business days
  };

  // Log agreement creation for compliance
  complianceLogger.record({
    action: 'credit_repair_agreement_created',
    serviceId: agreement.serviceId,
    consumerId: agreement.consumerId,
    serviceCount: services.length,
    cancellationDeadline: agreement.cancellationDeadline.toISOString(),
  });

  return agreement;
}

// Monitor cancellation period compliance
function checkCancellationRights(): void {
  const activeAgreements =
    agreementRepository.findActiveDuringCancellationPeriod(new Date());

  activeAgreements.forEach((agreement) => {
    if (agreement.signedDate && !agreement.effectiveDate) {
      // Still in cancellation period, ensure no charges
      const charges = billingService.getChargesForService(agreement.serviceId);

      if (charges.length > 0) {
        complianceLogger.logViolation({
          type: 'CROA_PREMATURE_BILLING_VIOLATION',
          serviceId: agreement.serviceId,
          chargeCount: charges.length,
          severity: 'CRITICAL',
        });
      }
    }
  });
}
```

## State-Specific Compliance

### Multi-State Regulation Handling

Different states have additional requirements:

```typescript
interface StateComplianceRules {
  state: string;
  bondRequired: boolean;
  bondAmount?: number;
  registrationRequired: boolean;
  coolingOffPeriod: number; // days
  maxFeeRestrictions: boolean;
  additionalDisclosures: string[];
}

const stateComplianceRules: StateComplianceRules[] = [
  {
    state: 'CA',
    bondRequired: true,
    bondAmount: 100000,
    registrationRequired: true,
    coolingOffPeriod: 5,
    maxFeeRestrictions: true,
    additionalDisclosures: [
      'This contract may be cancelled by the buyer until midnight of the fifth business day after the date the buyer signed this contract',
      'The total cost of services cannot exceed $1,500',
    ],
  },
  {
    state: 'TX',
    bondRequired: true,
    bondAmount: 10000,
    registrationRequired: false,
    coolingOffPeriod: 3,
    maxFeeRestrictions: false,
    additionalDisclosures: [
      'You may cancel this contract without penalty within three business days',
    ],
  },
  {
    state: 'FL',
    bondRequired: false,
    registrationRequired: true,
    coolingOffPeriod: 5,
    maxFeeRestrictions: true,
    additionalDisclosures: [
      'This contract is voidable by you until midnight of the fifth business day after you sign this contract',
    ],
  },
];

function getStateCompliance(state: string): StateComplianceRules {
  const rules = stateComplianceRules.find((r) => r.state === state);
  if (!rules) {
    throw new Error(`Compliance rules not configured for state: ${state}`);
  }
  return rules;
}

// Apply state-specific rules to agreements
function applyStateCompliance(
  agreement: CreditRepairAgreement,
  consumerState: string
): CreditRepairAgreement {
  const stateRules = getStateCompliance(consumerState);

  // Adjust cooling off period
  const coolingOffMs = stateRules.coolingOffPeriod * 24 * 60 * 60 * 1000;
  agreement.cancellationDeadline = new Date(Date.now() + coolingOffMs);

  // Add state-specific disclosures
  agreement.disclaimers.push(...stateRules.additionalDisclosures);

  // Apply fee restrictions if applicable
  if (stateRules.maxFeeRestrictions) {
    validateFeeCompliance(agreement.services, consumerState);
  }

  return agreement;
}
```

## Compliance Testing Requirements

### Automated Compliance Tests

All compliance rules must have corresponding tests:

```typescript
describe('FCRA Compliance Tests', () => {
  describe('Permissible Purpose Validation', () => {
    it('should reject credit access without valid permissible purpose', () => {
      const invalidContext = {
        purpose: 'curiosity',
        userId: 'test-user',
        ipAddress: '127.0.0.1',
      };

      expect(() => {
        validatePermissiblePurpose(
          'curiosity' as PermissiblePurpose,
          'test-user',
          invalidContext
        );
      }).toThrow(FCRAViolationError);
    });

    it('should create audit trail for all validation attempts', () => {
      const auditSpy = jest.spyOn(auditLogger, 'record');

      try {
        validatePermissiblePurpose(
          PermissiblePurpose.CREDIT_APPLICATION,
          'test-user',
          { ipAddress: '127.0.0.1', userAgent: 'test-agent' }
        );
      } catch (error) {
        // Expected for test user
      }

      expect(auditSpy).toHaveBeenCalledWith({
        action: 'permissible_purpose_validation',
        purpose: 'credit_application',
        userId: 'test-user',
        ipAddress: '127.0.0.1',
        timestamp: expect.any(String),
        userAgent: 'test-agent',
      });
    });
  });

  describe('Dispute Resolution Timeline', () => {
    it('should enforce 30-day resolution deadline', () => {
      const dispute = processNewDispute({
        consumerId: 'test-consumer',
        items: [{ type: 'incorrect_balance', description: 'Wrong amount' }],
        submittedBy: 'test-user',
      });

      const expectedDeadline = new Date(
        dispute.submissionDate.getTime() + 30 * 24 * 60 * 60 * 1000
      );
      expect(dispute.resolutionDeadline).toEqual(expectedDeadline);
    });
  });
});

describe('CROA Compliance Tests', () => {
  describe('Service Agreement Requirements', () => {
    it('should enforce pay-after-service fee structure', () => {
      const agreement = createCreditRepairAgreement('test-consumer', [
        { type: 'dispute_resolution', description: 'Resolve credit disputes' },
      ]);

      expect(agreement.feeStructure).toBe('pay_after_service');
    });

    it('should provide 3-day cancellation period', () => {
      const agreement = createCreditRepairAgreement('test-consumer', []);
      const threeDaysFromNow = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

      expect(agreement.cancellationDeadline.getTime()).toBeCloseTo(
        threeDaysFromNow.getTime(),
        -10000
      );
    });
  });
});
```

These compliance rules ensure The Credit Pros AI-SDLC framework maintains strict adherence to all regulatory requirements while providing credit repair services.
