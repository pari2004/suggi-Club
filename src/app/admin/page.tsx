import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function AdminOverviewPage() {
  const kpis = [
    { label: 'Registered Customers', value: '412', change: '+38 this week', icon: '👤', color: 'text-[#244832]' },
    { label: 'Active Subscribers', value: '286', change: '69.4% active rate', icon: '🎟️', color: 'text-[#244832]' },
    { label: 'Approved Cafes', value: '5', change: 'Bengaluru Core', icon: '☕', color: 'text-[#244832]' },
    { label: 'Pending Applications', value: '1', change: 'Humble Bean (HSR)', icon: '📝', color: 'text-amber-800', highlight: true },
    { label: 'Subscription Revenue', value: '₹2,48,600', change: 'Nov 2026 MTD', icon: '💳', color: 'text-[#244832]' },
    { label: 'Verified Redemptions', value: '1,842', change: '~6.4 cups/member', icon: '📱', color: 'text-[#244832]' },
    { label: 'Pending Partner Payouts', value: '₹92,100', change: 'Cycle Mon Nov 24', icon: '🏦', color: 'text-[#244832]' },
    { label: 'Refund Requests', value: '0', change: '100% satisfaction', icon: '↩️', color: 'text-green-800' },
  ];

  const recentTransactions = [
    { id: 'TXN-9021', customer: 'Rahul Sharma', plan: 'Coffee 10', amount: '₹699', method: 'UPI (Razorpay)', status: 'SUCCESS', time: '14 mins ago' },
    { id: 'TXN-9020', customer: 'Neha Venkatesh', plan: 'Weekly Explorer', amount: '₹249', method: 'Card (Razorpay)', status: 'SUCCESS', time: '48 mins ago' },
    { id: 'TXN-9019', customer: 'Kunal Singhania', plan: 'Coffee 15', amount: '₹999', method: 'NetBanking', status: 'SUCCESS', time: '2 hours ago' },
    { id: 'TXN-9018', customer: 'Sana Shaikh', plan: 'Premium Club', amount: '₹1,499', method: 'UPI (Razorpay)', status: 'SUCCESS', time: '3 hours ago' },
  ];

  return (
    <div className="space-y-8">
      {/* Top Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#B99A61]">
            SUGGI GLOBAL OPERATIONS
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#244832]">Platform Overview</h1>
          <p className="text-xs text-[#6B5E55]">
            Real-time subscriber metrics, partner cafe operations, and Bengaluru financial health.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/payouts">
            <Button variant="outline" size="sm">
              Reconcile Payouts
            </Button>
          </Link>
          <Link href="/admin/cafe-applications">
            <Button variant="primary" size="sm">
              Review Applications (1)
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <Card key={idx} className={kpi.highlight ? 'border-amber-300 bg-amber-50/50' : ''}>
            <CardContent className="p-5 space-y-1">
              <div className="flex items-center justify-between text-[#A89F91]">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#6B5E55]">
                  {kpi.label}
                </span>
                <span className="text-base">{kpi.icon}</span>
              </div>
              <p className={`font-serif text-2xl sm:text-3xl font-bold ${kpi.color}`}>
                {kpi.value}
              </p>
              <p className="text-[11px] text-[#6B5E55] font-medium">{kpi.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* RECENT PAYMENTS & PENDING ACTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Subscriptions Table */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold text-[#244832]">Recent Subscription Payments</h2>
            <Link href="/admin/payments" className="text-xs font-semibold text-[#B99A61] hover:underline">
              View All Payments →
            </Link>
          </div>

          <div className="rounded-3xl border border-[#E8E1D5] bg-[#FFFFFF] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F5F0E6] text-[#244832] font-serif uppercase tracking-wider text-[11px] border-b border-[#E8E1D5]">
                  <tr>
                    <th className="py-3 px-4 font-bold">Transaction</th>
                    <th className="py-3 px-4 font-bold">Customer</th>
                    <th className="py-3 px-4 font-bold">Plan</th>
                    <th className="py-3 px-4 font-bold">Amount</th>
                    <th className="py-3 px-4 font-bold">Method</th>
                    <th className="py-3 px-4 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5F0E6] text-[#49301F]">
                  {recentTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-[#F5F0E6]/30 transition-colors">
                      <td className="py-3.5 px-4 font-mono text-[11px] text-[#A89F91]">{tx.id}</td>
                      <td className="py-3.5 px-4 font-bold text-[#244832]">{tx.customer}</td>
                      <td className="py-3.5 px-4">{tx.plan}</td>
                      <td className="py-3.5 px-4 font-bold">{tx.amount}</td>
                      <td className="py-3.5 px-4 text-[#6B5E55]">{tx.method}</td>
                      <td className="py-3.5 px-4">
                        <Badge variant="success">✓ {tx.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Operations Actions */}
        <div className="lg:col-span-4 space-y-4">
          <h2 className="font-serif text-xl font-bold text-[#244832]">Operations Actions</h2>

          <div className="space-y-3">
            <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-900">1 Pending Cafe Review</span>
                <Badge variant="warning">ACTION NEEDED</Badge>
              </div>
              <p className="text-xs text-amber-800">
                Humble Bean Coffee (HSR Layout) submitted FSSAI &amp; bank credentials.
              </p>
              <Link href="/admin/cafe-applications" className="block pt-1">
                <Button variant="primary" size="sm" className="w-full text-xs">
                  Review &amp; Approve Cafe
                </Button>
              </Link>
            </div>

            <div className="rounded-2xl border border-[#E8E1D5] bg-[#FFFFFF] p-4 space-y-2">
              <h4 className="font-bold text-xs text-[#244832]">Weekly Partner Reconciliation</h4>
              <p className="text-xs text-[#6B5E55]">
                1,842 redemptions ready to settle across 5 active cafes.
              </p>
              <Link href="/admin/payouts" className="block pt-1">
                <Button variant="outline" size="sm" className="w-full text-xs">
                  Generate Settlement Batch
                </Button>
              </Link>
            </div>

            <div className="rounded-2xl border border-[#E8E1D5] bg-[#FFFFFF] p-4 space-y-2">
              <h4 className="font-bold text-xs text-[#244832]">Unit Economics Analyzer</h4>
              <p className="text-xs text-[#6B5E55]">
                Simulate margins at 75%, 85%, and 100% redemption rate assumptions.
              </p>
              <Link href="/admin/reports" className="block pt-1">
                <Button variant="outline" size="sm" className="w-full text-xs">
                  Open Economics Calculator →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
