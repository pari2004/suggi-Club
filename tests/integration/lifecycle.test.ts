import { describe, it, expect, beforeEach } from 'vitest';
import {
  generateRedemptionToken,
  validateAndConsumeToken,
  memoryStore,
} from '../../src/lib/redemption/engine';
import { createSessionToken, verifySessionToken, SessionUser } from '../../src/lib/auth/session';
import { calculateUnitEconomics } from '../../src/lib/economics/calculator';

describe('SUGGI CLUB — End-to-End Pilot Lifecycle Test', () => {
  const customerId = 'cust_bengaluru_001';
  const subId = 'sub_coffee10_001';
  const cafeId = 'cafe_maverick_ulsoor';
  const baristaUserId = 'barista_rohan_001';

  beforeEach(() => {
    // Reset test memory store
    memoryStore.tokens.clear();
    memoryStore.redemptions.clear();
    memoryStore.todayRedemptionsCount.clear();

    // 1. Activate Customer Subscription (Coffee 10: 10 credits)
    memoryStore.subscriptions.set(subId, {
      id: subId,
      userId: customerId,
      status: 'ACTIVE',
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      creditsRemaining: 10,
      creditsUsed: 0,
      dailyCap: 2,
    });
  });

  it('Complete Lifecycle: Customer session -> QR Pass generation -> Barista Scan -> Deduct 1 Credit -> Payout Snapshot', async () => {
    // Step 1: Customer Authentication & Session verification
    const customerUser: SessionUser = {
      id: customerId,
      name: 'Rahul Sharma',
      email: 'rahul.customer@gmail.com',
      role: 'CUSTOMER',
    };
    const sessionToken = createSessionToken(customerUser);
    const verifiedSession = verifySessionToken(sessionToken);

    expect(verifiedSession).not.toBeNull();
    expect(verifiedSession?.id).toBe(customerId);
    expect(verifiedSession?.role).toBe('CUSTOMER');

    // Step 2: Customer generates 90s single-use QR token
    const tokenResult = await generateRedemptionToken({
      userId: customerId,
      subscriptionId: subId,
      cafeId,
    });

    expect(tokenResult.success).toBe(true);
    expect(tokenResult.data).toBeDefined();
    const rawQrToken = tokenResult.data!.token;

    // Step 3: Barista at Maverick & Farmer Coffee scans customer QR
    const scanResult = await validateAndConsumeToken({
      rawToken: rawQrToken,
      cafeId,
      staffUserId: baristaUserId,
      drinkName: 'Flat White with Oat Milk',
    });

    expect(scanResult.success).toBe(true);
    expect(scanResult.remainingCredits).toBe(9);
    expect(scanResult.drinkName).toBe('Flat White with Oat Milk');

    // Step 4: Verify that reused QR fails immediately (single-use enforcement)
    const duplicateScan = await validateAndConsumeToken({
      rawToken: rawQrToken,
      cafeId,
      staffUserId: baristaUserId,
      drinkName: 'Flat White with Oat Milk',
    });

    expect(duplicateScan.success).toBe(false);
    expect(duplicateScan.error).toMatch(/already been used/i);

    // Balance remains 9 credits (never double charged)
    const sub = memoryStore.subscriptions.get(subId);
    expect(sub?.creditsRemaining).toBe(9);
    expect(sub?.creditsUsed).toBe(1);

    // Step 5: Partner Payout Reconciliation Snapshot
    // A standard redemption at ₹50 payout
    const cafePayoutPaise = 5000; // ₹50
    const economics = calculateUnitEconomics({
      subscriptionPricePaise: 69900, // ₹699 Coffee 10
      totalCredits: 10,
      expectedRedemptionRate: 0.8, // 8 cups
      cafeStandardPayoutPaise: cafePayoutPaise,
      paymentGatewayFeePercent: 0.02,
      gstRatePercent: 0.18,
      marketingCACPaise: 10000,
      operationalOverheadPaise: 2000,
    });

    expect(economics.grossContributionPaise).toBeGreaterThan(0);
    expect(economics.breakEvenRedemptionsCount).toBeGreaterThanOrEqual(10);
  });
});
