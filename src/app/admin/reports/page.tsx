'use client';

import React, { useState, useMemo } from 'react';
import { calculateUnitEconomics } from '@/lib/economics/calculator';

export default function AdminReportsPage() {
  const [priceInr, setPriceInr] = useState<number>(999);
  const [credits, setCredits] = useState<number>(15);
  const [redemptionRatePercent, setRedemptionRatePercent] = useState<number>(80);
  const [cafePayoutInr, setCafePayoutInr] = useState<number>(50);
  const [cacInr, setCacInr] = useState<number>(150);
  const [overheadInr, setOverheadInr] = useState<number>(25);

  const economics = useMemo(() => {
    return calculateUnitEconomics({
      subscriptionPricePaise: priceInr * 100,
      totalCredits: credits,
      expectedRedemptionRate: redemptionRatePercent / 100,
      cafeStandardPayoutPaise: cafePayoutInr * 100,
      paymentGatewayFeePercent: 0.02, // 2%
      gstRatePercent: 0.18, // 18%
      marketingCACPaise: cacInr * 100,
      operationalOverheadPaise: overheadInr * 100,
    });
  }, [priceInr, credits, redemptionRatePercent, cafePayoutInr, cacInr, overheadInr]);

  return (
    <div className="space-y-8">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#B99A61]">
          FINANCIAL ENGINEERING
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#244832]">
          Unit Economics &amp; Contribution Margin Simulator
        </h1>
        <p className="text-xs text-[#6B5E55]">
          Precision integer paise model analyzing subscription viability, payout ceilings, and break-even thresholds.
        </p>
      </div>

      {/* Simulator Inputs & Outputs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Interactive Input Controls */}
        <div className="lg:col-span-5 rounded-3xl border border-[#E8E1D5] bg-[#FFFFFF] p-6 sm:p-8 space-y-5 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-[#244832] border-b border-[#E8E1D5] pb-2">
            Model Assumptions
          </h2>

          <div className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-[#49301F] block mb-1">
                Subscription Price: ₹{priceInr}
              </label>
              <input
                type="range"
                min="199"
                max="2499"
                step="50"
                value={priceInr}
                onChange={(e) => setPriceInr(Number(e.target.value))}
                className="w-full accent-[#244832]"
              />
            </div>

            <div>
              <label className="font-bold text-[#49301F] block mb-1">
                Allocated Coffee Credits: {credits} cups
              </label>
              <input
                type="range"
                min="3"
                max="30"
                step="1"
                value={credits}
                onChange={(e) => setCredits(Number(e.target.value))}
                className="w-full accent-[#244832]"
              />
            </div>

            <div>
              <label className="font-bold text-[#49301F] block mb-1">
                Expected Redemption Rate: {redemptionRatePercent}%
              </label>
              <input
                type="range"
                min="40"
                max="100"
                step="5"
                value={redemptionRatePercent}
                onChange={(e) => setRedemptionRatePercent(Number(e.target.value))}
                className="w-full accent-[#244832]"
              />
              <p className="text-[10px] text-[#A89F91]">
                ({Math.round((credits * redemptionRatePercent) / 100)} expected cups redeemed per member)
              </p>
            </div>

            <div>
              <label className="font-bold text-[#49301F] block mb-1">
                Cafe Payout per Cup: ₹{cafePayoutInr}
              </label>
              <input
                type="range"
                min="35"
                max="90"
                step="5"
                value={cafePayoutInr}
                onChange={(e) => setCafePayoutInr(Number(e.target.value))}
                className="w-full accent-[#244832]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="font-bold text-[#49301F] block mb-1">CAC per Sub: ₹{cacInr}</label>
                <input
                  type="number"
                  value={cacInr}
                  onChange={(e) => setCacInr(Number(e.target.value) || 0)}
                  className="w-full rounded-md border border-[#E8E1D5] px-2 py-1 text-xs"
                />
              </div>
              <div>
                <label className="font-bold text-[#49301F] block mb-1">Overhead: ₹{overheadInr}</label>
                <input
                  type="number"
                  value={overheadInr}
                  onChange={(e) => setOverheadInr(Number(e.target.value) || 0)}
                  className="w-full rounded-md border border-[#E8E1D5] px-2 py-1 text-xs"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Calculated Outputs */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-3xl border border-[#B99A61]/30 bg-[#244832] text-[#FFFEFA] p-6 sm:p-8 space-y-6 shadow-xl">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#B99A61]">
              UNIT ECONOMICS SNAPSHOT
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-[#FFFEFA]/10 p-4 border border-[#FFFEFA]/10">
                <p className="text-[11px] text-[#F5F0E6]/70">Gross Contribution</p>
                <p className="font-serif text-3xl font-bold text-[#FFFEFA]">
                  ₹{(economics.grossContributionPaise / 100).toFixed(0)}
                </p>
                <p className="text-[11px] text-[#B99A61] font-semibold mt-0.5">
                  {economics.grossContributionMarginPercent}% Margin
                </p>
              </div>

              <div className="rounded-2xl bg-[#FFFEFA]/10 p-4 border border-[#FFFEFA]/10">
                <p className="text-[11px] text-[#F5F0E6]/70">Net Contribution</p>
                <p className="font-serif text-3xl font-bold text-[#FFFEFA]">
                  ₹{(economics.netContributionAfterCacPaise / 100).toFixed(0)}
                </p>
                <p className="text-[11px] text-[#B99A61] font-semibold mt-0.5">
                  {economics.netMarginPercent}% Net Margin
                </p>
              </div>

              <div className="rounded-2xl bg-[#FFFEFA]/10 p-4 border border-[#FFFEFA]/10 col-span-2 sm:col-span-1">
                <p className="text-[11px] text-[#F5F0E6]/70">Break-Even Threshold</p>
                <p className="font-serif text-3xl font-bold text-[#B99A61]">
                  {economics.breakEvenRedemptionsCount} cups
                </p>
                <p className="text-[10px] text-[#F5F0E6]/60 mt-0.5">
                  Max cups before negative margin
                </p>
              </div>
            </div>

            {/* Detailed P&L Breakdown */}
            <div className="rounded-2xl bg-[#193323] p-5 space-y-2 text-xs border border-[#B99A61]/20">
              <h4 className="font-bold text-[#B99A61] uppercase tracking-wider text-[11px] mb-2">
                Detailed Waterfall (Per Subscriber)
              </h4>
              <div className="flex justify-between py-1 border-b border-[#FFFEFA]/10 text-[#F5F0E6]">
                <span>Customer Gross Payment:</span>
                <span className="font-bold">₹{priceInr}.00</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#FFFEFA]/10 text-[#F5F0E6]/80">
                <span>(-) 18% GST Component:</span>
                <span>-₹{(economics.gstAmountPaise / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#FFFEFA]/10 text-[#F5F0E6]/80">
                <span>(-) 2% Gateway Processing Fee:</span>
                <span>-₹{(economics.paymentGatewayFeePaise / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#FFFEFA]/10 text-[#F5F0E6]/80">
                <span>(-) Cafe Partner Payouts ({economics.expectedRedemptionsCount} cups @ ₹{cafePayoutInr}):</span>
                <span className="font-semibold text-amber-300">-₹{(economics.totalExpectedCafePayoutPaise / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#FFFEFA]/20 text-[#B99A61] font-bold">
                <span>= Gross Contribution:</span>
                <span>₹{(economics.grossContributionPaise / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1 text-[#F5F0E6]/70">
                <span>(-) Blended CAC &amp; Support Overhead:</span>
                <span>-₹{cacInr + overheadInr}.00</span>
              </div>
              <div className="flex justify-between py-2 border-t border-[#B99A61]/40 text-base font-bold text-[#FFFEFA]">
                <span>Net Operating Profit:</span>
                <span className="text-[#B99A61]">₹{(economics.netContributionAfterCacPaise / 100).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
