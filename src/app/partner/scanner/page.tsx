'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { validateAndConsumeToken, RedemptionValidationResult } from '@/lib/redemption/engine';

const SAMPLE_DRINKS = [
  { id: 'item-1', name: 'Cold Smoke Nitro Brew', tier: 'STANDARD', payout: '₹50.00' },
  { id: 'item-2', name: 'Flat White with Oat Milk', tier: 'STANDARD', payout: '₹50.00' },
  { id: 'item-3', name: 'Clarified Cappuccino', tier: 'PREMIUM', payout: '₹80.00' },
  { id: 'item-4', name: 'Classic Cortado', tier: 'STANDARD', payout: '₹50.00' },
  { id: 'item-5', name: 'Pour Over (Orange Blossom)', tier: 'PREMIUM', payout: '₹80.00' },
];

export default function PartnerScannerPage() {
  const [tokenInput, setTokenInput] = useState('');
  const [selectedDrink, setSelectedDrink] = useState(SAMPLE_DRINKS[1].name);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<RedemptionValidationResult | null>(null);

  const handleValidateRedemption = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenInput.trim()) return;

    setIsProcessing(true);
    setResult(null);

    try {
      const res = await validateAndConsumeToken({
        rawToken: tokenInput.trim(),
        cafeId: 'cafe-1',
        staffUserId: 'staff-1',
        drinkName: selectedDrink,
      });

      setResult(res);
      if (res.success) {
        setTokenInput('');
      }
    } catch {
      setResult({ success: false, error: 'Network communication error with server' });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#244832]">Barista Counter Scanner</h1>
          <p className="text-xs text-[#6B5E55]">
            Scan or input customer pass to deduct 1 coffee credit.
          </p>
        </div>
        <Link href="/partner/dashboard">
          <Badge variant="outline">← Dashboard</Badge>
        </Link>
      </div>

      {/* SCANNER VERIFICATION RESULT MODAL / BANNER */}
      {result && (
        <div
          className={`rounded-3xl border p-6 text-center space-y-3 animate-in zoom-in-95 duration-200 ${
            result.success
              ? 'border-green-300 bg-green-50 text-green-950'
              : 'border-red-300 bg-red-50 text-red-950'
          }`}
        >
          <span className="text-5xl block">{result.success ? '✅' : '❌'}</span>
          <h2 className="font-serif text-2xl font-bold">
            {result.success ? 'Redemption Successful!' : 'Redemption Rejected'}
          </h2>

          {result.success ? (
            <div className="space-y-1.5 text-xs text-green-800">
              <p className="font-bold text-sm text-[#244832]">{result.drinkName}</p>
              <p>Customer credit deducted successfully. Prepared item confirmed.</p>
              <p className="font-semibold">
                Customer Balance Remaining: {result.remainingCredits} credits
              </p>
              <p className="text-[10px] text-green-700 pt-1">
                Transaction ID: {result.redemptionId} · Snapshot Payout: ₹50.00 logged
              </p>
            </div>
          ) : (
            <div className="space-y-1 text-xs text-red-700">
              <p className="font-bold">{result.error}</p>
              <p className="text-[11px] text-red-600">
                Please request the customer to tap &quot;Refresh QR&quot; on their pass or verify active credits.
              </p>
            </div>
          )}

          <div className="pt-2">
            <Button
              variant={result.success ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setResult(null)}
            >
              Scan Next Customer
            </Button>
          </div>
        </div>
      )}

      {/* SCANNER WORKFLOW CARD */}
      <div className="rounded-3xl border border-[#E8E1D5] bg-[#FFFFFF] p-6 sm:p-8 shadow-md space-y-6">
        {/* Step 1: Drink Selection */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-[#49301F] tracking-wide uppercase">
            1. Select Drink Being Prepared:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {SAMPLE_DRINKS.map((drink) => (
              <button
                type="button"
                key={drink.id}
                onClick={() => setSelectedDrink(drink.name)}
                className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                  selectedDrink === drink.name
                    ? 'border-[#244832] bg-[#244832]/10 font-bold text-[#244832]'
                    : 'border-[#E8E1D5] hover:border-[#B99A61] text-[#49301F]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{drink.name}</span>
                  <span className="text-[10px] text-[#B99A61]">{drink.tier}</span>
                </div>
                <span className="text-[10px] text-[#6B5E55] block mt-0.5">
                  Payout to Cafe: {drink.payout}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Barista Scanner Input */}
        <form onSubmit={handleValidateRedemption} className="space-y-4 pt-2 border-t border-[#E8E1D5]">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#49301F] tracking-wide uppercase">
              2. Customer QR Token:
            </label>
            <div className="relative">
              <Input
                placeholder="Scan or paste customer token (e.g. sgc_...)"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                required
                className="font-mono text-sm pr-20"
              />
              <button
                type="button"
                onClick={() => {
                  // Simulate auto-reading the demo active pass token
                  setTokenInput('sgc_demo_valid_pass_token_123');
                }}
                className="absolute right-2 top-2 rounded-md bg-[#F5F0E6] px-2 py-1 text-[10px] font-bold text-[#244832] hover:bg-[#B99A61] hover:text-[#FFFEFA] transition-colors cursor-pointer"
              >
                Demo Fill
              </button>
            </div>
            <p className="text-[11px] text-[#A89F91]">
              Use a standard barcode/camera scanner connected to this terminal, or paste the code directly.
            </p>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full font-bold shadow-lg"
            isLoading={isProcessing}
          >
            ✓ Verify &amp; Deduct 1 Credit
          </Button>
        </form>

        <div className="rounded-xl bg-[#F5F0E6] p-4 text-xs text-[#6B5E55] space-y-1">
          <p className="font-semibold text-[#244832]">Security &amp; Concurrency Guarantees:</p>
          <ul className="list-disc list-inside space-y-0.5 text-[11px]">
            <li>Tokens expire automatically in 90 seconds</li>
            <li>Atomic transaction prevents double spending or concurrent abuse</li>
            <li>Partner payout rate is permanently snapshotted upon validation</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
