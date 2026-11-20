export interface UnitEconomicsInput {
  subscriptionPricePaise: number; // e.g. 99900 (₹999)
  totalCredits: number; // e.g. 15
  expectedRedemptionRate: number; // e.g. 0.80 (80% of credits redeemed)
  cafeStandardPayoutPaise: number; // e.g. 5000 (₹50)
  paymentGatewayFeePercent: number; // e.g. 0.02 (2% Razorpay fee)
  gstRatePercent: number; // e.g. 0.18 (18% GST)
  marketingCACPaise: number; // e.g. 15000 (₹150 customer acquisition cost)
  operationalOverheadPaise: number; // e.g. 3000 (₹30 per sub tech/support)
}

export interface UnitEconomicsOutput {
  subscriptionPricePaise: number;
  netRevenueExcludingGstPaise: number;
  gstAmountPaise: number;
  expectedRedemptionsCount: number;
  totalExpectedCafePayoutPaise: number;
  paymentGatewayFeePaise: number;
  grossContributionPaise: number;
  grossContributionMarginPercent: number;
  breakEvenRedemptionsCount: number;
  netContributionAfterCacPaise: number;
  netMarginPercent: number;
}

/**
 * Calculates unit economics for SUGGI CLUB subscriptions using integer paise arithmetic.
 * Never uses floating-point arithmetic for monetary results.
 */
export function calculateUnitEconomics(input: UnitEconomicsInput): UnitEconomicsOutput {
  const {
    subscriptionPricePaise,
    totalCredits,
    expectedRedemptionRate,
    cafeStandardPayoutPaise,
    paymentGatewayFeePercent,
    gstRatePercent,
    marketingCACPaise,
    operationalOverheadPaise,
  } = input;

  // Net revenue excluding 18% GST: Price / 1.18
  const netRevenueExcludingGstPaise = Math.round(
    subscriptionPricePaise / (1 + gstRatePercent)
  );
  const gstAmountPaise = subscriptionPricePaise - netRevenueExcludingGstPaise;

  // Expected redemptions (e.g. 15 * 0.80 = 12 cups)
  const expectedRedemptionsCount = Math.round(totalCredits * expectedRedemptionRate);

  // Total payout to cafes (e.g. 12 cups * ₹50 = ₹600 = 60000 paise)
  const totalExpectedCafePayoutPaise = expectedRedemptionsCount * cafeStandardPayoutPaise;

  // Payment gateway fee (2% on gross transaction)
  const paymentGatewayFeePaise = Math.round(
    subscriptionPricePaise * paymentGatewayFeePercent
  );

  // Gross contribution = Net Revenue - Cafe Payout - Payment Fee
  const grossContributionPaise =
    netRevenueExcludingGstPaise - totalExpectedCafePayoutPaise - paymentGatewayFeePaise;

  const grossContributionMarginPercent =
    netRevenueExcludingGstPaise > 0
      ? (grossContributionPaise / netRevenueExcludingGstPaise) * 100
      : 0;

  // Break-even redemptions = (Net Revenue - Payment Fee) / Cafe Payout per cup
  const fundsAvailableForPayout = netRevenueExcludingGstPaise - paymentGatewayFeePaise;
  const breakEvenRedemptionsCount =
    cafeStandardPayoutPaise > 0
      ? Math.floor(fundsAvailableForPayout / cafeStandardPayoutPaise)
      : totalCredits;

  // Net contribution after CAC and ops overhead
  const netContributionAfterCacPaise =
    grossContributionPaise - marketingCACPaise - operationalOverheadPaise;

  const netMarginPercent =
    netRevenueExcludingGstPaise > 0
      ? (netContributionAfterCacPaise / netRevenueExcludingGstPaise) * 100
      : 0;

  return {
    subscriptionPricePaise,
    netRevenueExcludingGstPaise,
    gstAmountPaise,
    expectedRedemptionsCount,
    totalExpectedCafePayoutPaise,
    paymentGatewayFeePaise,
    grossContributionPaise,
    grossContributionMarginPercent: Number(grossContributionMarginPercent.toFixed(1)),
    breakEvenRedemptionsCount,
    netContributionAfterCacPaise,
    netMarginPercent: Number(netMarginPercent.toFixed(1)),
  };
}
