import React from 'react';
import { Badge } from '@/components/ui/badge';

const GLOBAL_REDEMPTIONS = [
  { id: 'RDM-8401', customer: 'Rahul Sharma', cafe: 'Maverick & Farmer', neighborhood: 'Ulsoor', drink: 'Flat White with Oat Milk', payoutRate: '₹50.00', timestamp: 'Today, 10:14 AM' },
  { id: 'RDM-8400', customer: 'Ananya Mehra', cafe: 'Maverick & Farmer', neighborhood: 'Ulsoor', drink: 'Cold Smoke Nitro Brew', payoutRate: '₹50.00', timestamp: 'Today, 09:35 AM' },
  { id: 'RDM-8399', customer: 'Karthik Varma', cafe: 'Araku Coffee', neighborhood: 'Indiranagar', drink: 'Grand Reserve Cappuccino', payoutRate: '₹50.00', timestamp: 'Today, 09:10 AM' },
  { id: 'RDM-8398', customer: 'Sana Shaikh', cafe: 'Araku Coffee', neighborhood: 'Indiranagar', drink: 'Chemex Selection Araku', payoutRate: '₹80.00', timestamp: 'Today, 08:45 AM' },
  { id: 'RDM-8397', customer: 'Neha Venkatesh', cafe: 'Blue Tokai Coffee', neighborhood: 'Koramangala', drink: 'Attikan Estate Cafe Latte', payoutRate: '₹50.00', timestamp: 'Today, 08:30 AM' },
  { id: 'RDM-8396', customer: 'Kunal Singhania', cafe: 'Third Wave Coffee', neighborhood: 'Church Street', drink: 'Orange Zest Cold Brew', payoutRate: '₹50.00', timestamp: 'Today, 08:05 AM' },
];

export default function AdminRedemptionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-[#244832]">Global Redemptions Feed</h1>
        <p className="text-xs text-[#6B5E55]">
          Live stream of all coffee pass redemptions validated across Bengaluru roasteries.
        </p>
      </div>

      <div className="rounded-3xl border border-[#E8E1D5] bg-[#FFFFFF] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F0E6] text-[#244832] font-serif uppercase tracking-wider text-[11px] border-b border-[#E8E1D5]">
              <tr>
                <th className="py-3 px-4 font-bold">Redemption ID</th>
                <th className="py-3 px-4 font-bold">Customer</th>
                <th className="py-3 px-4 font-bold">Cafe Partner</th>
                <th className="py-3 px-4 font-bold">Neighborhood</th>
                <th className="py-3 px-4 font-bold">Drink Prepared</th>
                <th className="py-3 px-4 font-bold">Cafe Payout Snapshot</th>
                <th className="py-3 px-4 font-bold">Timestamp</th>
                <th className="py-3 px-4 font-bold">Audit Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F0E6] text-[#49301F]">
              {GLOBAL_REDEMPTIONS.map((rdm) => (
                <tr key={rdm.id} className="hover:bg-[#F5F0E6]/30 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-semibold text-[#244832]">{rdm.id}</td>
                  <td className="py-3.5 px-4 font-bold text-[#244832]">{rdm.customer}</td>
                  <td className="py-3.5 px-4 font-semibold">{rdm.cafe}</td>
                  <td className="py-3.5 px-4 text-[#6B5E55]">{rdm.neighborhood}</td>
                  <td className="py-3.5 px-4">{rdm.drink}</td>
                  <td className="py-3.5 px-4 font-bold text-[#244832]">{rdm.payoutRate}</td>
                  <td className="py-3.5 px-4 text-[#6B5E55]">{rdm.timestamp}</td>
                  <td className="py-3.5 px-4">
                    <Badge variant="success">✓ Verified Single-Use</Badge>
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
