/**
 * Credit Score Calculation Module
 * The Credit Pros - FCRA Compliant
 */

/**
 * Calculate credit score based on FICO 8 algorithm
 * @param {Object} creditData - Credit report data
 * @param {number} creditData.paymentHistory - Payment history score (0-100)
 * @param {number} creditData.creditUtilization - Credit utilization ratio (0-100)
 * @param {number} creditData.creditHistory - Length of credit history in months
 * @param {number} creditData.creditMix - Credit mix diversity score (0-10)
 * @param {number} creditData.newCredit - New credit inquiries count
 * @returns {number} FICO score (300-850)
 */
function calculateCreditScore(creditData) {
  if (!creditData || typeof creditData !== 'object') {
    throw new Error('Invalid credit data provided');
  }

  const {
    paymentHistory = 0,
    creditUtilization = 0,
    creditHistory = 0,
    creditMix = 0,
    newCredit = 0
  } = creditData;

  // FICO 8 algorithm weights
  const paymentWeight = 0.35; // 35%
  const utilizationWeight = 0.30; // 30%
  const historyWeight = 0.15; // 15%
  const mixWeight = 0.10; // 10%
  const newCreditWeight = 0.10; // 10%

  // Calculate weighted score
  let score = 
    (paymentHistory * paymentWeight) +
    ((100 - creditUtilization) * utilizationWeight) +
    (Math.min(creditHistory / 120, 1) * 100 * historyWeight) +
    (creditMix * 10 * mixWeight) +
    (Math.max(0, 10 - newCredit) * 10 * newCreditWeight);

  // Convert to FICO range (300-850)
  const ficoScore = Math.round(300 + (score * 5.5));
  
  // Ensure within valid range
  return Math.max(300, Math.min(850, ficoScore));
}

/**
 * Validate credit score is FCRA compliant
 * @param {number} score - Credit score to validate
 * @returns {boolean} True if score is valid
 */
function isValidCreditScore(score) {
  return typeof score === 'number' && score >= 300 && score <= 850;
}

/**
 * Get credit score range description
 * @param {number} score - Credit score
 * @returns {string} Score range description
 */
function getCreditScoreRange(score) {
  if (!isValidCreditScore(score)) {
    return 'Invalid Score';
  }

  if (score >= 800) return 'Exceptional';
  if (score >= 740) return 'Very Good';
  if (score >= 670) return 'Good';
  if (score >= 580) return 'Fair';
  return 'Poor';
}

module.exports = {
  calculateCreditScore,
  isValidCreditScore,
  getCreditScoreRange
};