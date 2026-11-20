'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SUBSCRIPTION_PLANS, PlanData } from '@/lib/data/plans';

export default function SubscriptionManagePage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Active subscription mock
  const [activePlan, setActivePlan] = useState({
    name: 'Coffee 10',
    creditsRemaining: 7,
    creditsTotal: 10,
    expiresAt: 'December 12, 2026',
    status: 'ACTIVE',
  });

  const handlePurchaseOrRenew = async (plan: PlanData) => {
    setIsProcessing(true);
    setSuccessMessage(null);

    // Simulate verified Razorpay test mode payment
    setTimeout(() => {
      setIsProcessing(false);
      setActivePlan({
        name: plan.name,
        creditsRemaining: plan.creditsCount,
        creditsTotal: plan.creditsCount,
        expiresAt: new Date(Date.now() + plan.validityDays * 24 * 60 * 60 * 1000).toLocaleDateString(
          'en-US',
          { month: 'short', day: 'numeric', year: 'numeric' }
        ),
        status: 'ACTIVE',
      });
      setSuccessMessage(
        `🎉 Successfully activated ${plan.name}! ${plan.creditsCount} fresh coffee credits added to your pass.`
      );
    }, 1200);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#244832]">
          Subscription &amp; Credits
        </h1>
        <p className="text-xs text-[#6B5E55]">
          Manage your active coffee pass, renew, or switch between plans.
        </p>
      </div>

      {successMessage && (
        <div className="rounded-2xl bg-[#244832]/10 border border-[#244832]/30 p-4 text-xs font-semibold text-[#244832] animate-in fade-in">
          {successMessage}
        </div>
      )}

      {/* CURRENT MEMBERSHIP CARD */}
      <div className="rounded-3xl border border-[#B99A61]/40 bg-[#FFFFFF] p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-[#E8E1D5] pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#B99A61]">
              CURRENT ACTIVE PASS
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#244832]">{activePlan.name}</h2>
          </div>
          <Badge variant="success">Active</Badge>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="rounded-xl bg-[#F5F0E6] p-4">
            <p className="text-[11px] text-[#6B5E55]">Credits Balance</p>
            <p className="font-serif text-2xl font-bold text-[#244832]">
              {activePlan.creditsRemaining}{' '}
              <span className="text-xs font-sans text-[#6B5E55]">/ {activePlan.creditsTotal}</span>
            </p>
          </div>
          <div className="rounded-xl bg-[#F5F0E6] p-4">
            <p className="text-[11px] text-[#6B5E55]">Pass Expiry</p>
            <p className="font-serif text-lg font-bold text-[#244832]">{activePlan.expiresAt}</p>
          </div>
          <div className="rounded-xl bg-[#F5F0E6] p-4 col-span-2 sm:col-span-1">
            <p className="text-[11px] text-[#6B5E55]">Renewal Setting</p>
            <p className="font-semibold text-xs text-[#244832] mt-1">Manual (No Auto-Charge)</p>
          </div>
        </div>

        <div className="pt-2 text-xs text-[#6B5E55] flex flex-wrap items-center justify-between gap-3">
          <span>Need to cancel or request a refund?</span>
          <button
            onClick={() =>
              alert(
                'To request a cancellation or refund, please submit a ticket in the Support tab. Subscriptions with 0 used credits are 100% refunded within 48h.'
              )
            }
            className="text-xs font-semibold text-red-600 hover:underline cursor-pointer"
          >
            Cancel Subscription / Request Refund
          </button>
        </div>
      </div>

      {/* PLAN OPTIONS (RENEW OR UPGRADE) */}
      <div className="space-y-4">
        <h3 className="font-serif text-xl font-bold text-[#244832]">
          Available Plans to Renew or Switch
        </h3>
        <p className="text-xs text-[#6B5E55]">
          Credits from your existing plan carry forward seamlessly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <div
              key={plan.id}
              className="rounded-2xl border border-[#E8E1D5] bg-[#FFFFFF] p-5 space-y-4 hover:border-[#244832] transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-lg font-bold text-[#244832]">{plan.name}</h4>
                  <Badge variant={plan.isPopular ? 'gold' : 'default'}>{plan.badge}</Badge>
                </div>
                <p className="text-xs text-[#6B5E55] mt-1">{plan.tagline}</p>

                <div className="my-3 pb-3 border-b border-[#F5F0E6]">
                  <span className="text-2xl font-serif font-bold text-[#244832]">₹{plan.priceDisplay}</span>
                  <span className="text-xs text-[#6B5E55]"> / {plan.validityDays} days ({plan.creditsCount} cups)</span>
                </div>

                <ul className="space-y-1.5 text-xs text-[#49301F]">
                  {plan.features.slice(0, 4).map((f, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="text-[#244832] font-bold">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <Button
                  variant={plan.name === activePlan.name ? 'primary' : 'outline'}
                  size="md"
                  className="w-full text-xs font-bold"
                  onClick={() => handlePurchaseOrRenew(plan)}
                  isLoading={isProcessing}
                >
                  {plan.name === activePlan.name ? 'Renew This Plan (₹' + plan.priceDisplay + ')' : 'Switch to ' + plan.name}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
