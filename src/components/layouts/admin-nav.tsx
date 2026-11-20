'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SessionUser } from '@/lib/auth';
import { logoutAction } from '@/server/actions/auth';

interface AdminNavProps {
  user: SessionUser;
}

export function AdminNav({ user }: AdminNavProps) {
  const pathname = usePathname();

  const navSections = [
    {
      group: 'Core Management',
      items: [
        { label: 'Overview', href: '/admin', icon: '📊' },
        { label: 'Customers', href: '/admin/customers', icon: '👤' },
        { label: 'Cafes', href: '/admin/cafes', icon: '☕' },
        { label: 'Cafe Applications', href: '/admin/cafe-applications', icon: '📝', badge: '1' },
      ],
    },
    {
      group: 'Subscriptions & Pass',
      items: [
        { label: 'Plans & Pricing', href: '/admin/plans', icon: '🏷️' },
        { label: 'Subscriptions', href: '/admin/subscriptions', icon: '🎟️' },
        { label: 'Redemptions', href: '/admin/redemptions', icon: '📱' },
      ],
    },
    {
      group: 'Financial Operations',
      items: [
        { label: 'Payments', href: '/admin/payments', icon: '💳' },
        { label: 'Refund Requests', href: '/admin/refunds', icon: '↩️' },
        { label: 'Partner Payouts', href: '/admin/payouts', icon: '🏦' },
        { label: 'Coupons & Promos', href: '/admin/coupons', icon: '🎁' },
        { label: 'Unit Economics', href: '/admin/reports', icon: '📈' },
      ],
    },
    {
      group: 'Support & Security',
      items: [
        { label: 'Support Tickets', href: '/admin/support', icon: '💬' },
        { label: 'Audit Logs', href: '/admin/audit-logs', icon: '🛡️' },
        { label: 'Platform Settings', href: '/admin/settings', icon: '⚙️' },
      ],
    },
  ];

  return (
    <aside className="w-64 shrink-0 border-r border-[#E8E1D5] bg-[#FFFFFF] flex flex-col justify-between min-h-screen">
      <div className="p-5 space-y-6">
        {/* Brand */}
        <div>
          <Link href="/admin" className="flex flex-col">
            <span className="font-serif text-xl font-bold tracking-tight text-[#244832]">
              SUGGI<span className="text-[#B99A61]"> ADMIN</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#6B5E55]">
              SUGGI GLOBAL Operations
            </span>
          </Link>
        </div>

        {/* Navigation Sections */}
        <div className="space-y-6">
          {navSections.map((section, idx) => (
            <div key={idx} className="space-y-1.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#A89F91] px-2.5">
                {section.group}
              </p>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                        isActive
                          ? 'bg-[#244832] text-[#FFFEFA]'
                          : 'text-[#49301F] hover:bg-[#F5F0E6] hover:text-[#244832]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-sm">{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`rounded-full px-2 py-0.2 text-[10px] font-bold ${
                            isActive ? 'bg-[#B99A61] text-[#244832]' : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Admin User Info & Logout */}
      <div className="p-4 border-t border-[#E8E1D5] bg-[#F5F0E6]/40 flex items-center justify-between">
        <div className="text-xs truncate mr-2">
          <p className="font-bold text-[#244832] truncate">{user.name}</p>
          <p className="text-[10px] text-[#6B5E55]">{user.role}</p>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="text-[11px] font-bold text-red-600 hover:text-red-700 hover:underline cursor-pointer"
          >
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  );
}
