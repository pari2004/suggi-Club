import { describe, it, expect, beforeEach } from 'vitest';
import {
  generateRedemptionToken,
  validateAndConsumeToken,
  memoryStore,
  hashToken,
} from '../../src/lib/redemption/engine';

describe('SUGGI CLUB — Secure QR Redemption Engine', () => {
  const userId = 'test-user-123';
  const subId = 'test-sub-123';
  const cafeId = 'cafe-maverick-indiranagar';
  const otherCafeId = 'cafe-araku-ulsoor';
  const staffUserId = 'staff-user-456';

  beforeEach(() => {
    // Reset test memory store
    memoryStore.tokens.clear();
    memoryStore.redemptions.clear();
    memoryStore.todayRedemptionsCount.clear();

    // Setup an active test subscription with 5 credits
    memoryStore.subscriptions.set(subId, {
      id: subId,
      userId,
      status: 'ACTIVE',
      expiresAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days
      creditsRemaining: 5,
      creditsUsed: 0,
      dailyCap: 2,
    });
  });

  it('1. Valid QR token generation and single-use redemption succeeds', async () => {
    // Generate QR
    const genResult = await generateRedemptionToken({
      userId,
      subscriptionId: subId,
      cafeId,
    });

    expect(genResult.success).toBe(true);
    expect(genResult.data).toBeDefined();
    expect(genResult.data?.token).toMatch(/^sgc_/);
    expect(genResult.data?.expiresInSeconds).toBe(90);

    const rawToken = genResult.data!.token;

    // Barista scans and validates
    const redeemResult = await validateAndConsumeToken({
      rawToken,
      cafeId,
      staffUserId,
      drinkName: 'Flat White',
    });

    expect(redeemResult.success).toBe(true);
    expect(redeemResult.remainingCredits).toBe(4);
    expect(redeemResult.drinkName).toBe('Flat White');

    // Check that subscription credit was deducted
    const updatedSub = memoryStore.subscriptions.get(subId);
    expect(updatedSub?.creditsRemaining).toBe(4);
    expect(updatedSub?.creditsUsed).toBe(1);
  });

  it('2. Expired QR token fails', async () => {
    // Generate token with 0 second TTL
    const genResult = await generateRedemptionToken({
      userId,
      subscriptionId: subId,
      cafeId,
      ttlSeconds: -10, // already expired
    });

    expect(genResult.success).toBe(true);
    const rawToken = genResult.data!.token;

    const redeemResult = await validateAndConsumeToken({
      rawToken,
      cafeId,
      staffUserId,
    });

    expect(redeemResult.success).toBe(false);
    expect(redeemResult.error).toMatch(/expired/i);

    // Verify credits were NOT deducted
    const updatedSub = memoryStore.subscriptions.get(subId);
    expect(updatedSub?.creditsRemaining).toBe(5);
  });

  it('3. Reused QR token fails (Single-Use Enforcement)', async () => {
    const genResult = await generateRedemptionToken({
      userId,
      subscriptionId: subId,
      cafeId,
    });

    const rawToken = genResult.data!.token;

    // First scan succeeds
    const firstScan = await validateAndConsumeToken({
      rawToken,
      cafeId,
      staffUserId,
    });
    expect(firstScan.success).toBe(true);

    // Second scan with same token must fail
    const secondScan = await validateAndConsumeToken({
      rawToken,
      cafeId,
      staffUserId,
    });
    expect(secondScan.success).toBe(false);
    expect(secondScan.error).toMatch(/already been used/i);

    // Verify credits deducted only once (balance: 4, not 3)
    const updatedSub = memoryStore.subscriptions.get(subId);
    expect(updatedSub?.creditsRemaining).toBe(4);
  });

  it('4. Wrong cafe redemption fails when token is bound to specific cafe', async () => {
    // Bound to cafeId (Maverick)
    const genResult = await generateRedemptionToken({
      userId,
      subscriptionId: subId,
      cafeId,
    });

    const rawToken = genResult.data!.token;

    // Attempt scan at otherCafeId (Araku)
    const redeemResult = await validateAndConsumeToken({
      rawToken,
      cafeId: otherCafeId,
      staffUserId,
    });

    expect(redeemResult.success).toBe(false);
    expect(redeemResult.error).toMatch(/not valid for this cafe location/i);

    // Credits intact
    const updatedSub = memoryStore.subscriptions.get(subId);
    expect(updatedSub?.creditsRemaining).toBe(5);
  });

  it('5. Inactive or expired subscription fails', async () => {
    // Set subscription to EXPIRED
    const sub = memoryStore.subscriptions.get(subId)!;
    sub.status = 'EXPIRED';

    const genResult = await generateRedemptionToken({
      userId,
      subscriptionId: subId,
      cafeId,
    });

    expect(genResult.success).toBe(false);
    expect(genResult.error).toMatch(/not active|expired/i);
  });

  it('6. Zero credits remaining fails', async () => {
    // Set credits to 0
    const sub = memoryStore.subscriptions.get(subId)!;
    sub.creditsRemaining = 0;

    const genResult = await generateRedemptionToken({
      userId,
      subscriptionId: subId,
      cafeId,
    });

    expect(genResult.success).toBe(false);
    expect(genResult.error).toMatch(/no remaining coffee credits/i);
  });

  it('7. Daily redemption cap enforcement', async () => {
    // Cap is 2 per day
    const token1 = (await generateRedemptionToken({ userId, subscriptionId: subId, cafeId })).data!.token;
    await validateAndConsumeToken({ rawToken: token1, cafeId, staffUserId });

    const token2 = (await generateRedemptionToken({ userId, subscriptionId: subId, cafeId })).data!.token;
    await validateAndConsumeToken({ rawToken: token2, cafeId, staffUserId });

    // 3rd attempt on same day must be rejected at token generation
    const gen3 = await generateRedemptionToken({ userId, subscriptionId: subId, cafeId });
    expect(gen3.success).toBe(false);
    expect(gen3.error).toMatch(/daily limit reached/i);
  });

  it('8. Concurrent scans cannot consume the same credit twice', async () => {
    const genResult = await generateRedemptionToken({
      userId,
      subscriptionId: subId,
      cafeId,
    });
    const rawToken = genResult.data!.token;

    // Simulate 2 parallel simultaneous scan requests arriving at the server
    const [scan1, scan2] = await Promise.all([
      validateAndConsumeToken({ rawToken, cafeId, staffUserId }),
      validateAndConsumeToken({ rawToken, cafeId, staffUserId }),
    ]);

    // Exactly one must succeed and one must fail
    const successCount = [scan1, scan2].filter((r) => r.success).length;
    const failCount = [scan1, scan2].filter((r) => !r.success).length;

    expect(successCount).toBe(1);
    expect(failCount).toBe(1);

    // Exactly 1 credit deducted
    const updatedSub = memoryStore.subscriptions.get(subId);
    expect(updatedSub?.creditsRemaining).toBe(4);
  });
});
