import React from 'react';
import { Badge } from '@/components/ui/badge';

const SETTLEMENTS = [
  { id: 'PAY-2026-W46', period: 'Nov 10 – Nov 16, 2026', totalCups: 124, amount: '₹6,440.00', status: 'PAID', utr: 'HDFCR5202611170094182', date: 'Nov 17, 2026' },
  { id: 'PAY-2026-W45', period: 'Nov 03 – Nov 09, 2026', totalCups: 112, amount: '₹5,800.00', status: 'PAID', utr: 'HDFCR5202611100081290', date: 'Nov 10, 2026' },
  { id: 'PAY-2026-W44', period: 'Oct 27 – Nov 02, 2026', totalCups: 98, amount: '₹5,100.00', status: 'PAID', utr: 'HDFCR5202611030074211', date: 'Nov 03, 2026' },
];

export default function PartnerPayoutsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-[#244832]">Partner Settlements &amp; Payouts</h1>
        <p className="text-xs text-[#6B5E55]">
          Weekly direct bank payouts for verified customer coffee redemptions.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-[#B99A61]/30 bg-[#F5F0E6] p-5 space-y-1">
          <p className="text-xs font-semibold text-[#6B5E55]">Current Cycle (Unsettled)</p>
          <p className="font-serif text-3xl font-bold text-[#244832]">₹3,400.00</p>
          <p className="text-[11px] text-[#244832] font-medium">68 cups poured this week</p>
        </div>

        <div className="rounded-2xl border border-[#E8E1D5] bg-[#FFFFFF] p-5 space-y-1">
          <p className="text-xs font-semibold text-[#6B5E55]">All-Time Payouts</p>
          <p className="font-serif text-3xl font-bold text-[#244832]">₹17,340.00</p>
          <p className="text-[11px] text-[#6B5E55]">334 total verified cups</p>
        </div>

        <div className="rounded-2xl border border-[#E8E1D5] bg-[#FFFFFF] p-5 space-y-1">
          <p className="text-xs font-semibold text-[#6B5E55]">Payout Schedule</p>
          <p className="font-serif text-xl font-bold text-[#244832]">Every Monday</p>
          <p className="text-[11px] text-[#A89F91]">Direct NEFT/RTGS to HDFC A/C</p>
        </div>
      </div>

      {/* Settlements Table */}
      <div className="rounded-3xl border border-[#E8E1D5] bg-[#FFFFFF] shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#E8E1D5] bg-[#F5F0E6]/50">
          <h3 className="font-serif text-base font-bold text-[#244832]">Settlement Statements</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F0E6] text-[#244832] font-serif uppercase tracking-wider text-[11px] border-b border-[#E8E1D5]">
              <tr>
                <th className="py-3 px-4 font-bold">Settlement ID</th>
                <th className="py-3 px-4 font-bold">Billing Cycle</th>
                <th className="py-3 px-4 font-bold">Redemptions</th>
                <th className="py-3 px-4 font-bold">Amount Paid</th>
                <th className="py-3 px-4 font-bold">Bank Reference (UTR)</th>
                <th className="py-3 px-4 font-bold">Date Paid</th>
                <th className="py-3 px-4 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F0E6] text-[#49301F]">
              {SETTLEMENTS.map((settlement) => (
                <tr key={settlement.id} className="hover:bg-[#F5F0E6]/30 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-semibold text-[#244832]">{settlement.id}</td>
                  <td className="py-3.5 px-4 text-[#6B5E55]">{settlement.period}</td>
                  <td className="py-3.5 px-4 font-bold">{settlement.totalCups} cups</td>
                  <td className="py-3.5 px-4 font-serif text-sm font-bold text-[#244832]">{settlement.amount}</td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-[#6B5E55]">{settlement.utr}</td>
                  <td className="py-3.5 px-4 text-[#6B5E55]">{settlement.date}</td>
                  <td className="py-3.5 px-4">
                    <Badge variant="success">✓ {settlement.status}</Badge>
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
