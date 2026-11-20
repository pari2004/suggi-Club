import React from 'react';
import { Badge } from '@/components/ui/badge';

const REDEMPTION_LOGS = [
  { id: 'rdm-9821', customer: 'Rahul Sharma', drink: 'Flat White with Oat Milk', time: 'Today, 10:14 AM', barista: 'Rohan', payout: '₹50.00', status: 'COMPLETED' },
  { id: 'rdm-9820', customer: 'Ananya Mehra', drink: 'Cold Smoke Nitro Brew', time: 'Today, 09:35 AM', barista: 'Rohan', payout: '₹50.00', status: 'COMPLETED' },
  { id: 'rdm-9819', customer: 'Karthik Varma', drink: 'Classic Cortado', time: 'Today, 08:50 AM', barista: 'Rohan', payout: '₹50.00', status: 'COMPLETED' },
  { id: 'rdm-9818', customer: 'Priya Kulkarni', drink: 'Pour Over (Orange Blossom)', time: 'Yesterday, 04:30 PM', barista: 'Ashish', payout: '₹80.00', status: 'COMPLETED' },
  { id: 'rdm-9817', customer: 'Deepak Patel', drink: 'Flat White with Oat Milk', time: 'Yesterday, 02:15 PM', barista: 'Ashish', payout: '₹50.00', status: 'COMPLETED' },
  { id: 'rdm-9816', customer: 'Siddharth Rao', drink: 'Clarified Cappuccino', time: 'Yesterday, 11:20 AM', barista: 'Rohan', payout: '₹80.00', status: 'COMPLETED' },
];

export default function PartnerRedemptionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-[#244832]">Redemption Transaction Log</h1>
        <p className="text-xs text-[#6B5E55]">
          Audit records of all customer passes scanned and validated at this cafe.
        </p>
      </div>

      <div className="rounded-3xl border border-[#E8E1D5] bg-[#FFFFFF] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F0E6] text-[#244832] font-serif uppercase tracking-wider text-[11px] border-b border-[#E8E1D5]">
              <tr>
                <th className="py-3 px-4 font-bold">Transaction ID</th>
                <th className="py-3 px-4 font-bold">Customer Name</th>
                <th className="py-3 px-4 font-bold">Drink Prepared</th>
                <th className="py-3 px-4 font-bold">Timestamp</th>
                <th className="py-3 px-4 font-bold">Barista</th>
                <th className="py-3 px-4 font-bold">Payout Snapshot</th>
                <th className="py-3 px-4 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F0E6] text-[#49301F]">
              {REDEMPTION_LOGS.map((log) => (
                <tr key={log.id} className="hover:bg-[#F5F0E6]/30 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-[11px] text-[#A89F91]">{log.id}</td>
                  <td className="py-3.5 px-4 font-bold text-[#244832]">{log.customer}</td>
                  <td className="py-3.5 px-4 font-medium">{log.drink}</td>
                  <td className="py-3.5 px-4 text-[#6B5E55]">{log.time}</td>
                  <td className="py-3.5 px-4">{log.barista}</td>
                  <td className="py-3.5 px-4 font-bold text-[#244832]">{log.payout}</td>
                  <td className="py-3.5 px-4">
                    <Badge variant="success">✓ {log.status}</Badge>
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
