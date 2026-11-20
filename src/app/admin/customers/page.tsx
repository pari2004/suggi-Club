import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const CUSTOMERS = [
  { id: 'usr-1', name: 'Rahul Sharma', email: 'rahul.customer@gmail.com', phone: '+91 99887 76655', plan: 'Coffee 10', creditsRemaining: 7, creditsUsed: 3, joined: 'Nov 02, 2026', status: 'ACTIVE' },
  { id: 'usr-2', name: 'Neha Venkatesh', email: 'neha.v@outlook.com', phone: '+91 98450 11223', plan: 'Weekly Explorer', creditsRemaining: 2, creditsUsed: 1, joined: 'Nov 18, 2026', status: 'ACTIVE' },
  { id: 'usr-3', name: 'Kunal Singhania', email: 'kunal.s@gmail.com', phone: '+91 97410 44556', plan: 'Coffee 15', creditsRemaining: 11, creditsUsed: 4, joined: 'Oct 28, 2026', status: 'ACTIVE' },
  { id: 'usr-4', name: 'Sana Shaikh', email: 'sana.shaikh@techcorp.in', phone: '+91 98860 33445', plan: 'Premium Club', creditsRemaining: 14, creditsUsed: 1, joined: 'Nov 15, 2026', status: 'ACTIVE' },
  { id: 'usr-5', name: 'Arjun Das', email: 'arjun.das@startup.io', phone: '+91 99001 22334', plan: 'Coffee 10', creditsRemaining: 0, creditsUsed: 10, joined: 'Oct 15, 2026', status: 'EXPIRED' },
];

export default function AdminCustomersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#244832]">Customer Management</h1>
          <p className="text-xs text-[#6B5E55]">
            412 registered members across Bengaluru.
          </p>
        </div>

        <div className="w-full sm:w-72">
          <Input placeholder="Search by name, email or phone..." />
        </div>
      </div>

      <div className="rounded-3xl border border-[#E8E1D5] bg-[#FFFFFF] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F0E6] text-[#244832] font-serif uppercase tracking-wider text-[11px] border-b border-[#E8E1D5]">
              <tr>
                <th className="py-3 px-4 font-bold">Customer</th>
                <th className="py-3 px-4 font-bold">Contact</th>
                <th className="py-3 px-4 font-bold">Active Pass</th>
                <th className="py-3 px-4 font-bold">Remaining Credits</th>
                <th className="py-3 px-4 font-bold">Total Redeemed</th>
                <th className="py-3 px-4 font-bold">Joined Date</th>
                <th className="py-3 px-4 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F0E6] text-[#49301F]">
              {CUSTOMERS.map((customer) => (
                <tr key={customer.id} className="hover:bg-[#F5F0E6]/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-[#244832]">{customer.name}</p>
                    <p className="text-[10px] text-[#A89F91]">{customer.id}</p>
                  </td>
                  <td className="py-3.5 px-4 text-[#6B5E55]">
                    <p>{customer.email}</p>
                    <p>{customer.phone}</p>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-[#244832]">{customer.plan}</td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-[#244832] text-sm">
                      {customer.creditsRemaining}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-medium">{customer.creditsUsed} cups</td>
                  <td className="py-3.5 px-4 text-[#6B5E55]">{customer.joined}</td>
                  <td className="py-3.5 px-4">
                    <Badge variant={customer.status === 'ACTIVE' ? 'success' : 'destructive'}>
                      {customer.status}
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
