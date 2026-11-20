'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BENGALURU_CAFES } from '@/lib/data/cafes';

interface CafeReconciliation {
  cafeId: string;
  cafeName: string;
  neighborhood: string;
  unsettledRedemptions: number;
  standardRedemptions: number;
  premiumRedemptions: number;
  totalOwedPaise: number;
  bankAccount: string;
  bankIfsc: string;
  status: 'PENDING' | 'PAID';
  utr?: string;
}

const INITIAL_RECONCILIATIONS: CafeReconciliation[] = BENGALURU_CAFES.slice(0, 5).map((cafe, i) => {
  const std = 40 + i * 8;
  const prem = 10 + i * 3;
  const owed = std * 5000 + prem * 8000;
  return {
    cafeId: cafe.id,
    cafeName: cafe.name,
    neighborhood: cafe.neighborhood,
    unsettledRedemptions: std + prem,
    standardRedemptions: std,
    premiumRedemptions: prem,
    totalOwedPaise: owed,
    bankAccount: 'HDFC Bank ••••••' + (1234 + i),
    bankIfsc: 'HDFC000018' + i,
    status: 'PENDING',
  };
});

export default function AdminPayoutsPage() {
  const [reconciliations, setReconciliations] = useState<CafeReconciliation[]>(INITIAL_RECONCILIATIONS);
  const [isProcessingAll, setIsProcessingAll] = useState(false);

  const totalOwedAllCafes = reconciliations.reduce((sum, r) => sum + r.totalOwedPaise, 0);
  const totalUnsettledCups = reconciliations.reduce((sum, r) => sum + r.unsettledRedemptions, 0);

  const markCafePaid = (cafeId: string) => {
    setReconciliations((prev) =>
      prev.map((r) =>
        r.cafeId === cafeId
          ? {
              ...r,
              status: 'PAID',
              utr: 'HDFCR5' + Math.floor(10000000000 + Math.random() * 90000000000),
            }
          : r
      )
    );
  };

  const handleBatchSettleAll = () => {
    setIsProcessingAll(true);
    setTimeout(() => {
      setIsProcessingAll(false);
      setReconciliations((prev) =>
        prev.map((r) => ({
          ...r,
          status: 'PAID',
          utr: 'HDFCR5' + Math.floor(10000000000 + Math.random() * 90000000000),
        }))
      );
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#244832]">Partner Payout Reconciliation</h1>
          <p className="text-xs text-[#6B5E55]">
            Batch calculate weekly partner cafe payouts, reconcile verified QR cups, and record bank UTR references.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={handleBatchSettleAll}
          isLoading={isProcessingAll}
          className="font-bold shadow-md"
        >
          🏦 Batch Reconcile &amp; Settle All ({totalUnsettledCups} Cups)
        </Button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-[#B99A61]/30 bg-[#F5F0E6] p-5 space-y-1">
          <p className="text-xs font-semibold text-[#6B5E55]">Total Unsettled Payouts</p>
          <p className="font-serif text-3xl font-bold text-[#244832]">₹{totalOwedAllCafes / 100}</p>
          <p className="text-[11px] text-[#244832] font-medium">{totalUnsettledCups} verified coffee redemptions</p>
        </div>

        <div className="rounded-2xl border border-[#E8E1D5] bg-[#FFFFFF] p-5 space-y-1">
          <p className="text-xs font-semibold text-[#6B5E55]">Standard Rate / Premium Rate</p>
          <p className="font-serif text-2xl font-bold text-[#244832]">₹50 / ₹80</p>
          <p className="text-[11px] text-[#6B5E55]">Net transfer per verified counter scan</p>
        </div>

        <div className="rounded-2xl border border-[#E8E1D5] bg-[#FFFFFF] p-5 space-y-1">
          <p className="text-xs font-semibold text-[#6B5E55]">Participating Roasteries</p>
          <p className="font-serif text-2xl font-bold text-[#244832]">{reconciliations.length} Cafes</p>
          <p className="text-[11px] text-[#A89F91]">Bengaluru Pilot Cohort</p>
        </div>
      </div>

      {/* Reconciliation Table */}
      <div className="rounded-3xl border border-[#E8E1D5] bg-[#FFFFFF] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F0E6] text-[#244832] font-serif uppercase tracking-wider text-[11px] border-b border-[#E8E1D5]">
              <tr>
                <th className="py-3 px-4 font-bold">Cafe Partner</th>
                <th className="py-3 px-4 font-bold">Total Cups</th>
                <th className="py-3 px-4 font-bold">Standard Cups (₹50)</th>
                <th className="py-3 px-4 font-bold">Premium Cups (₹80)</th>
                <th className="py-3 px-4 font-bold">Total Reconciled Amount</th>
                <th className="py-3 px-4 font-bold">Bank Details</th>
                <th className="py-3 px-4 font-bold">Status / Bank UTR</th>
                <th className="py-3 px-4 font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F0E6] text-[#49301F]">
              {reconciliations.map((r) => (
                <tr key={r.cafeId} className="hover:bg-[#F5F0E6]/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-[#244832] text-sm">{r.cafeName}</p>
                    <p className="text-[10px] text-[#A89F91]">{r.neighborhood}</p>
                  </td>
                  <td className="py-3.5 px-4 font-serif text-sm font-bold text-[#244832]">
                    {r.unsettledRedemptions} cups
                  </td>
                  <td className="py-3.5 px-4">{r.standardRedemptions} (₹{(r.standardRedemptions * 5000) / 100})</td>
                  <td className="py-3.5 px-4">{r.premiumRedemptions} (₹{(r.premiumRedemptions * 8000) / 100})</td>
                  <td className="py-3.5 px-4 font-serif text-sm font-bold text-[#244832]">
                    ₹{r.totalOwedPaise / 100}
                  </td>
                  <td className="py-3.5 px-4 text-[#6B5E55]">
                    <p>{r.bankAccount}</p>
                    <p className="text-[10px]">{r.bankIfsc}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    {r.status === 'PAID' ? (
                      <div>
                        <Badge variant="success">✓ PAID</Badge>
                        <p className="font-mono text-[10px] text-[#6B5E55] mt-1">{r.utr}</p>
                      </div>
                    ) : (
                      <Badge variant="warning">PENDING</Badge>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    {r.status === 'PENDING' && (
                      <button
                        onClick={() => markCafePaid(r.cafeId)}
                        className="text-xs font-bold text-[#244832] underline hover:text-[#B99A61] cursor-pointer"
                      >
                        Mark Settled
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
