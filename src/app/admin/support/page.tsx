'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Ticket {
  id: string;
  customer: string;
  email: string;
  category: string;
  subject: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
  createdAt: string;
}

const INITIAL_TICKETS: Ticket[] = [
  { id: 'TKT-4821', customer: 'Rahul Sharma', email: 'rahul.customer@gmail.com', category: 'REDEMPTION', subject: 'Barista had question about oat milk surcharge', status: 'OPEN', createdAt: 'Today, 11:20 AM' },
  { id: 'TKT-4820', customer: 'Deepak Patel', email: 'deepak.patel@gmail.com', category: 'SUBSCRIPTION', subject: 'Credits did not update immediately after test payment', status: 'RESOLVED', createdAt: 'Yesterday, 03:40 PM' },
  { id: 'TKT-4819', customer: 'Sana Shaikh', email: 'sana.shaikh@techcorp.in', category: 'CAFE', subject: 'Requesting partner roastery in Whitefield', status: 'RESOLVED', createdAt: 'Nov 18, 2026' },
];

export default function AdminSupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);

  const resolveTicket = (id: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'RESOLVED' } : t))
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-[#244832]">Member Support Queue</h1>
        <p className="text-xs text-[#6B5E55]">
          Manage and resolve member inquiries, counter redemption queries, and feedback.
        </p>
      </div>

      <div className="rounded-3xl border border-[#E8E1D5] bg-[#FFFFFF] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F0E6] text-[#244832] font-serif uppercase tracking-wider text-[11px] border-b border-[#E8E1D5]">
              <tr>
                <th className="py-3 px-4 font-bold">Ticket ID</th>
                <th className="py-3 px-4 font-bold">Customer</th>
                <th className="py-3 px-4 font-bold">Category</th>
                <th className="py-3 px-4 font-bold">Subject</th>
                <th className="py-3 px-4 font-bold">Logged At</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F0E6] text-[#49301F]">
              {tickets.map((t) => (
                <tr key={t.id} className="hover:bg-[#F5F0E6]/30 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#244832]">{t.id}</td>
                  <td className="py-3.5 px-4 font-bold">
                    <p>{t.customer}</p>
                    <p className="text-[10px] text-[#A89F91]">{t.email}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="rounded-md bg-[#F5F0E6] px-2 py-0.5 text-[10px] font-semibold text-[#244832]">
                      {t.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 max-w-xs">{t.subject}</td>
                  <td className="py-3.5 px-4 text-[#6B5E55]">{t.createdAt}</td>
                  <td className="py-3.5 px-4">
                    <Badge variant={t.status === 'RESOLVED' ? 'success' : 'warning'}>
                      {t.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4">
                    {t.status !== 'RESOLVED' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => resolveTicket(t.id)}
                        className="text-[11px]"
                      >
                        Mark Resolved
                      </Button>
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
