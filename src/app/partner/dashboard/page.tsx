import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getSession } from '@/lib/auth';

export default async function PartnerDashboardPage() {
  const session = await getSession();

  // Metrics snapshot for this cafe
  const stats = {
    todayRedemptions: 14,
    weekRedemptions: 68,
    estimatedPayoutPaise: 340000, // ₹3,400.00
    payoutRate: '₹50.00 / cup',
    activeMenuItems: 5,
    status: 'APPROVED',
  };

  const recentRedemptions = [
    { customer: 'Rahul S.', drink: 'Flat White with Oat Milk', time: '12 mins ago', amount: '₹50.00' },
    { customer: 'Ananya M.', drink: 'Cold Smoke Nitro Brew', time: '35 mins ago', amount: '₹50.00' },
    { customer: 'Karthik V.', drink: 'Classic Cortado', time: '1 hour ago', amount: '₹50.00' },
    { customer: 'Priya K.', drink: 'Pour Over (Orange Blossom)', time: '2 hours ago', amount: '₹80.00' },
  ];

  return (
    <div className="space-y-8">
      {/* Cafe Header & Barista Scanner CTA */}
      <div className="rounded-3xl border border-[#B99A61]/30 bg-gradient-to-r from-[#244832] to-[#193323] p-6 sm:p-8 text-[#FFFEFA] shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="gold">★ PARTNER VERIFIED</Badge>
            <span className="text-xs text-[#F5F0E6]/70">Ulsoor, Bengaluru</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold">
            {session?.cafeName || 'Maverick & Farmer Coffee'}
          </h1>
          <p className="text-xs text-[#F5F0E6]/80 mt-1">
            Logged in as {session?.name} ({session?.role})
          </p>
        </div>

        <div className="shrink-0">
          <Link href="/partner/scanner">
            <Button
              variant="accent"
              size="lg"
              className="w-full sm:w-auto font-bold shadow-lg text-[#244832] hover:scale-[1.02] transition-transform"
            >
              📷 Open Barista QR Scanner
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI METRICS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-5 space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#6B5E55]">Today&apos;s Cups</p>
            <p className="font-serif text-3xl font-bold text-[#244832]">{stats.todayRedemptions}</p>
            <p className="text-[11px] text-[#B99A61] font-medium">+4 vs yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#6B5E55]">This Week</p>
            <p className="font-serif text-3xl font-bold text-[#244832]">{stats.weekRedemptions}</p>
            <p className="text-[11px] text-[#6B5E55]">Mon – Sun cycle</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#6B5E55]">Pending Payout</p>
            <p className="font-serif text-3xl font-bold text-[#244832]">₹{stats.estimatedPayoutPaise / 100}</p>
            <p className="text-[11px] text-green-700 font-medium">Reconciling this Monday</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#6B5E55]">Payout Rate</p>
            <p className="font-serif text-3xl font-bold text-[#244832]">₹50</p>
            <p className="text-[11px] text-[#6B5E55]">Standard / ₹80 Premium</p>
          </CardContent>
        </Card>
      </div>

      {/* QUICK SHORTCUTS & RECENT REDEMPTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Recent Activity */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold text-[#244832]">Today&apos;s Customer Redemptions</h2>
            <Link href="/partner/redemptions" className="text-xs font-semibold text-[#B99A61] hover:underline">
              View All History →
            </Link>
          </div>

          <div className="rounded-2xl border border-[#E8E1D5] bg-[#FFFFFF] divide-y divide-[#F5F0E6] overflow-hidden">
            {recentRedemptions.map((item, idx) => (
              <div key={idx} className="p-4 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <p className="font-bold text-[#244832] text-sm">{item.drink}</p>
                  <p className="text-[#6B5E55]">Customer: {item.customer} · {item.time}</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-[#244832] text-sm">+{item.amount}</span>
                  <p className="text-[10px] text-green-700 font-semibold">Verified</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Quick Tools */}
        <div className="lg:col-span-4 space-y-4">
          <h2 className="font-serif text-xl font-bold text-[#244832]">Cafe Tools</h2>

          <div className="space-y-3">
            <Link href="/partner/scanner" className="block">
              <div className="rounded-2xl border border-[#244832] bg-[#244832]/5 p-4 hover:bg-[#244832]/10 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📷</span>
                  <div>
                    <h4 className="font-bold text-sm text-[#244832]">QR Counter Scanner</h4>
                    <p className="text-xs text-[#6B5E55]">Scan and validate customer coffee pass</p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/partner/menu" className="block">
              <div className="rounded-2xl border border-[#E8E1D5] bg-[#FFFFFF] p-4 hover:border-[#244832] transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">☕</span>
                  <div>
                    <h4 className="font-bold text-sm text-[#244832]">Menu &amp; Drink Availability</h4>
                    <p className="text-xs text-[#6B5E55]">5 eligible drinks active</p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/partner/payouts" className="block">
              <div className="rounded-2xl border border-[#E8E1D5] bg-[#FFFFFF] p-4 hover:border-[#244832] transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏦</span>
                  <div>
                    <h4 className="font-bold text-sm text-[#244832]">Weekly Bank Settlements</h4>
                    <p className="text-xs text-[#6B5E55]">View reconciled payout reports</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
