'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface RefundItem {
  id: string;
  paymentId: string;
  customerName: string;
  customerEmail: string;
  planName: string;
  amountPaise: number;
  reason: string;
  creditsUsed: number;
  status: 'REQUESTED' | 'APPROVED' | 'PROCESSED' | 'REJECTED';
  requestedAt: string;
}

const INITIAL_REFUNDS: RefundItem[] = [
  {
    id: 'REF-101',
    paymentId: 'PAY-8920',
    customerName: 'Anand Verma',
    customerEmail: 'anand.verma@gmail.com',
    planName: 'Weekly Explorer',
    amountPaise: 24900,
    reason: 'Travelled out of Bengaluru for unexpected work emergency. 0 credits used.',
    creditsUsed: 0,
    status: 'REQUESTED',
    requestedAt: 'Nov 19, 2026, 06:10 PM',
  },
];

export default function AdminRefundsPage() {
  const [refunds, setRefunds] = useState<RefundItem[]>(INITIAL_REFUNDS);

  const handleAction = (id: string, newStatus: 'APPROVED' | 'REJECTED') => {
    setRefunds((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-[#244832]">Refund Requests &amp; Disputes</h1>
        <p className="text-xs text-[#6B5E55]">
          Audit subscriber cancellation and refund requests in accordance with policy.
        </p>
      </div>

      <div className="space-y-4">
        {refunds.map((refund) => (
          <div
            key={refund.id}
            className="rounded-3xl border border-[#E8E1D5] bg-[#FFFFFF] p-6 shadow-sm space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8E1D5] pb-3">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#244832]">
                  Refund Request {refund.id} · ₹{refund.amountPaise / 100}
                </h3>
                <p className="text-xs text-[#6B5E55]">
                  Customer: {refund.customerName} ({refund.customerEmail})
                </p>
              </div>
              <Badge variant={refund.status === 'APPROVED' ? 'success' : refund.status === 'REJECTED' ? 'destructive' : 'warning'}>
                {refund.status}
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#49301F]">
              <div>
                <span className="font-bold text-[#244832] block">Subscription:</span>
                <p>{refund.planName} (Payment: {refund.paymentId})</p>
              </div>
              <div>
                <span className="font-bold text-[#244832] block">Credits Consumed:</span>
                <p className="font-semibold text-green-700">{refund.creditsUsed} of 3 cups used (100% Eligible)</p>
              </div>
              <div>
                <span className="font-bold text-[#244832] block">Customer Reason:</span>
                <p className="italic text-[#6B5E55]">&quot;{refund.reason}&quot;</p>
              </div>
            </div>

            {refund.status === 'REQUESTED' && (
              <div className="pt-3 border-t border-[#E8E1D5] flex justify-end gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAction(refund.id, 'REJECTED')}
                  className="text-red-600 border-red-200"
                >
                  Reject Request
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleAction(refund.id, 'APPROVED')}
                  className="font-bold"
                >
                  ✓ Approve &amp; Issue Full Refund (₹{refund.amountPaise / 100})
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
