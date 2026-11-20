import { describe, it, expect } from 'vitest';
import crypto from 'crypto';
import {
  verifyPaymentSignature,
  verifyWebhookSignature,
} from '../../src/lib/payments/razorpay';
import { calculateUnitEconomics } from '../../src/lib/economics/calculator';

describe('SUGGI CLUB — Payment Verification & Unit Economics', () => {
  it('1. Valid Razorpay payment signature succeeds', () => {
    const keySecret = 'test_secret_key_123';
    process.env.RAZORPAY_KEY_SECRET = keySecret;

    const orderId = 'order_test_12345';
    const paymentId = 'pay_test_67890';
    const validSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    const isValid = verifyPaymentSignature({
      razorpayOrderId: orderId,
      razorpayPaymentId: paymentId,
      razorpaySignature: validSignature,
    });

    expect(isValid).toBe(true);
  });

  it('2. Tampered Razorpay payment signature fails', () => {
    const keySecret = 'test_secret_key_123';
    process.env.RAZORPAY_KEY_SECRET = keySecret;

    const isValid = verifyPaymentSignature({
      razorpayOrderId: 'order_test_12345',
      razorpayPaymentId: 'pay_test_67890',
      razorpaySignature: 'tampered_fake_signature_hex_value',
    });

    expect(isValid).toBe(false);
  });

  it('3. Webhook signature verification succeeds with correct HMAC', () => {
    const secret = 'webhook_secret_abc';
    const body = JSON.stringify({ event: 'payment.captured', id: 'evt_123' });
    const signature = crypto.createHmac('sha256', secret).update(body).digest('hex');

    const isValid = verifyWebhookSignature({
      webhookBody: body,
      webhookSignature: signature,
      webhookSecret: secret,
    });

    expect(isValid).toBe(true);
  });

  it('4. Unit Economics: Coffee 15 (₹999, 15 credits, ₹50 payout) computes precisely in paise', () => {
    const result = calculateUnitEconomics({
      subscriptionPricePaise: 99900, // ₹999
      totalCredits: 15,
      expectedRedemptionRate: 0.8, // 80% redemption = 12 cups
      cafeStandardPayoutPaise: 5000, // ₹50/cup
      paymentGatewayFeePercent: 0.02, // 2% Razorpay fee
      gstRatePercent: 0.18, // 18% GST
      marketingCACPaise: 15000, // ₹150 CAC
      operationalOverheadPaise: 2500, // ₹25 overhead
    });

    // Net revenue excluding 18% GST (99900 / 1.18 = 84661 paise = ₹846.61)
    expect(result.netRevenueExcludingGstPaise).toBe(84661);
    expect(result.expectedRedemptionsCount).toBe(12);

    // Cafe payout = 12 * 5000 = 60000 paise (₹600)
    expect(result.totalExpectedCafePayoutPaise).toBe(60000);

    // Break even redemptions count
    expect(result.breakEvenRedemptionsCount).toBe(16);

    // Gross contribution must be positive
    expect(result.grossContributionPaise).toBeGreaterThan(0);
    expect(result.grossContributionMarginPercent).toBeGreaterThan(20);
  });
});
