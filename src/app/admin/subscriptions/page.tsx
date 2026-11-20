import React from 'react';
import { Badge } from '@/components/ui/badge';

const SUBSCRIPTIONS = [
  { id: 'SUB-401', customer: 'Rahul Sharma', email: 'rahul.customer@gmail.com', plan: 'Coffee 10', creditsTotal: 10, creditsRemaining: 7, creditsUsed: 3, startsAt: 'Nov 02, 2026', expiresAt: 'Dec 02, 2026', status: 'ACTIVE' },
  { id: 'SUB-402', customer: 'Neha Venkatesh', email: 'neha.v@outlook.com', plan: 'Weekly Explorer', creditsTotal: 3, creditsRemaining: 2, creditsUsed: 1, startsAt: 'Nov 18, 2026', expiresAt: 'Nov 25, 2026', status: 'ACTIVE' },
  { id: 'SUB-403', customer: 'Kunal Singhania', email: 'kunal.s@gmail.com', plan: 'Coffee 15', creditsTotal: 15, creditsRemaining: 11, creditsUsed: 4, startsAt: 'Oct 28, 2026', expiresAt: 'Nov 27, 2026', status: 'ACTIVE' },
  { id: 'SUB-404', customer: 'Sana Shaikh', email: 'sana.shaikh@techcorp.in', plan: 'Premium Club', creditsTotal: 15, creditsRemaining: 14, creditsUsed: 1, startsAt: 'Nov 15, 2026', expiresAt: 'Dec 15, 2026', status: 'ACTIVE' },
  { id: 'SUB-405', customer: 'Arjun Das', email: 'arjun.das@startup.io', plan: 'Coffee 10', creditsTotal: 10, creditsRemaining: 0, creditsUsed: 10, startsAt: 'Oct 15, 2026', expiresAt: 'Nov 14, 2026', status: 'EXPIRED' },
];

export default function AdminSubscriptionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-[#244832]">Customer Subscriptions</h1>
        <p className="text-xs text-[#6B5E55]">
          All active and expired member coffee passes across Bengaluru.
        </p>
      </div>

      <div className="rounded-3xl border border-[#E8E1D5] bg-[#FFFFFF] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F0E6] text-[#244832] font-serif uppercase tracking-wider text-[11px] border-b border-[#E8E1D5]">
              <tr>
                <th className="py-3 px-4 font-bold">Pass ID</th>
                <th className="py-3 px-4 font-bold">Customer</th>
                <th className="py-3 px-4 font-bold">Plan</th>
                <th className="py-3 px-4 font-bold">Credits Used / Total</th>
                <th className="py-3 px-4 font-bold">Starts At</th>
                <th className="py-3 px-4 font-bold">Expires At</th>
                <th className="py-3 px-4 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F0E6] text-[#49301F]">
              {SUBSCRIPTIONS.map((sub) => (
                <tr key={sub.id} className="hover:bg-[#F5F0E6]/30 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-semibold text-[#244832]">{sub.id}</td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-[#244832]">{sub.customer}</p>
                    <p className="text-[10px] text-[#A89F91]">{sub.email}</p>
                  </td>
                  <td className="py-3.5 px-4 font-semibold">{sub.plan}</td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-[#244832]">{sub.creditsUsed}</span> of {sub.creditsTotal} cups ({sub.creditsRemaining} remaining)
                  </td>
                  <td className="py-3.5 px-4 text-[#6B5E55]">{sub.startsAt}</td>
                  <td className="py-3.5 px-4 text-[#6B5E55]">{sub.expiresAt}</td>
                  <td className="py-3.5 px-4">
                    <Badge variant={sub.status === 'ACTIVE' ? 'success' : 'destructive'}>
                      {sub.status}
                    </Badge>
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
