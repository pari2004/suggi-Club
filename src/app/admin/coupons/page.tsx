'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface CouponItem {
  id: string;
  code: string;
  discount: string;
  maxDiscount: string;
  minOrder: string;
  usedCount: number;
  limit: number;
  validUntil: string;
  status: 'ACTIVE' | 'EXPIRED';
}

const INITIAL_COUPONS: CouponItem[] = [
  { id: '1', code: 'BLRCOFFEE15', discount: '15% OFF', maxDiscount: '₹150', minOrder: '₹699', usedCount: 84, limit: 200, validUntil: 'Dec 31, 2026', status: 'ACTIVE' },
  { id: '2', code: 'INDIRANAGAR50', discount: '₹50 Flat', maxDiscount: '₹50', minOrder: '₹249', usedCount: 112, limit: 150, validUntil: 'Nov 30, 2026', status: 'ACTIVE' },
  { id: '3', code: 'EARLYBIRD', discount: '20% OFF', maxDiscount: '₹200', minOrder: '₹699', usedCount: 100, limit: 100, validUntil: 'Nov 15, 2026', status: 'EXPIRED' },
];

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<CouponItem[]>(INITIAL_COUPONS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [newDiscount, setNewDiscount] = useState('15% OFF');

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim()) return;

    setCoupons([
      ...coupons,
      {
        id: Date.now().toString(),
        code: newCode.trim().toUpperCase(),
        discount: newDiscount,
        maxDiscount: '₹150',
        minOrder: '₹249',
        usedCount: 0,
        limit: 100,
        validUntil: 'Dec 31, 2026',
        status: 'ACTIVE',
      },
    ]);

    setNewCode('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#244832]">Coupons &amp; Referrals</h1>
          <p className="text-xs text-[#6B5E55]">
            Create promotional discount codes and track member acquisition campaigns.
          </p>
        </div>

        <Button variant="primary" size="md" onClick={() => setShowAddModal(true)}>
          + Create New Coupon
        </Button>
      </div>

      <div className="rounded-3xl border border-[#E8E1D5] bg-[#FFFFFF] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F0E6] text-[#244832] font-serif uppercase tracking-wider text-[11px] border-b border-[#E8E1D5]">
              <tr>
                <th className="py-3 px-4 font-bold">Coupon Code</th>
                <th className="py-3 px-4 font-bold">Discount Value</th>
                <th className="py-3 px-4 font-bold">Max Discount</th>
                <th className="py-3 px-4 font-bold">Min Order</th>
                <th className="py-3 px-4 font-bold">Redemptions</th>
                <th className="py-3 px-4 font-bold">Validity</th>
                <th className="py-3 px-4 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F0E6] text-[#49301F]">
              {coupons.map((coupon) => (
                <tr key={coupon.id} className="hover:bg-[#F5F0E6]/30 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-sm text-[#244832]">{coupon.code}</td>
                  <td className="py-3.5 px-4 font-semibold">{coupon.discount}</td>
                  <td className="py-3.5 px-4 text-[#6B5E55]">{coupon.maxDiscount}</td>
                  <td className="py-3.5 px-4 text-[#6B5E55]">{coupon.minOrder}</td>
                  <td className="py-3.5 px-4 font-bold text-[#244832]">
                    {coupon.usedCount} / {coupon.limit}
                  </td>
                  <td className="py-3.5 px-4 text-[#6B5E55]">{coupon.validUntil}</td>
                  <td className="py-3.5 px-4">
                    <Badge variant={coupon.status === 'ACTIVE' ? 'success' : 'default'}>
                      {coupon.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#244832]/60 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-[#FFFFFF] p-6 shadow-2xl border border-[#E8E1D5] space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#244832]">Create New Promo Code</h3>
            <form onSubmit={handleCreateCoupon} className="space-y-4">
              <Input
                label="Coupon Code"
                required
                placeholder="e.g. KORAMANGALA20"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
              />
              <Input
                label="Discount Display"
                required
                placeholder="e.g. 20% OFF or ₹100 Flat"
                value={newDiscount}
                onChange={(e) => setNewDiscount(e.target.value)}
              />
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Create Coupon
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
