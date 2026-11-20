'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BENGALURU_CAFES } from '@/lib/data/cafes';

export default function AdminCafesPage() {
  const [cafesList, setCafesList] = useState(
    BENGALURU_CAFES.map((c) => ({
      ...c,
      status: 'APPROVED',
      standardPayoutPaise: 5000,
      premiumPayoutPaise: 8000,
      totalRedemptions: Math.floor(Math.random() * 200) + 50,
    }))
  );

  const toggleStatus = (id: string) => {
    setCafesList((prev) =>
      prev.map((cafe) => {
        if (cafe.id === id) {
          const newStatus = cafe.status === 'APPROVED' ? 'SUSPENDED' : 'APPROVED';
          return { ...cafe, status: newStatus };
        }
        return cafe;
      })
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#244832]">Cafe Partner Management</h1>
          <p className="text-xs text-[#6B5E55]">
            Manage approved roasteries, adjust payout rates, and enforce partner compliance.
          </p>
        </div>

        <Link href="/admin/cafe-applications">
          <Button variant="primary" size="md">
            Review Applications (1)
          </Button>
        </Link>
      </div>

      <div className="rounded-3xl border border-[#E8E1D5] bg-[#FFFFFF] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F0E6] text-[#244832] font-serif uppercase tracking-wider text-[11px] border-b border-[#E8E1D5]">
              <tr>
                <th className="py-3 px-4 font-bold">Cafe Name</th>
                <th className="py-3 px-4 font-bold">Neighborhood</th>
                <th className="py-3 px-4 font-bold">Eligible Drinks</th>
                <th className="py-3 px-4 font-bold">Standard Payout</th>
                <th className="py-3 px-4 font-bold">Premium Payout</th>
                <th className="py-3 px-4 font-bold">Total Cups</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F0E6] text-[#49301F]">
              {cafesList.map((cafe) => (
                <tr key={cafe.id} className="hover:bg-[#F5F0E6]/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-[#244832] text-sm">{cafe.name}</p>
                    <p className="text-[10px] text-[#A89F91]">{cafe.slug}</p>
                  </td>
                  <td className="py-3.5 px-4 font-medium">{cafe.neighborhood}</td>
                  <td className="py-3.5 px-4">{cafe.eligibleDrinks.length} items</td>
                  <td className="py-3.5 px-4 font-bold text-[#244832]">
                    ₹{cafe.standardPayoutPaise / 100}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#244832]">
                    ₹{cafe.premiumPayoutPaise / 100}
                  </td>
                  <td className="py-3.5 px-4 font-semibold">{cafe.totalRedemptions} cups</td>
                  <td className="py-3.5 px-4">
                    <Badge variant={cafe.status === 'APPROVED' ? 'success' : 'destructive'}>
                      {cafe.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => toggleStatus(cafe.id)}
                      className={`text-[11px] font-bold underline cursor-pointer ${
                        cafe.status === 'APPROVED'
                          ? 'text-red-600 hover:text-red-700'
                          : 'text-green-700 hover:text-green-800'
                      }`}
                    >
                      {cafe.status === 'APPROVED' ? 'Suspend' : 'Re-Activate'}
                    </button>
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
