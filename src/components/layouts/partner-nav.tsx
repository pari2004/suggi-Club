'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SessionUser } from '@/lib/auth';
import { logoutAction } from '@/server/actions/auth';

interface PartnerNavProps {
  user: SessionUser;
}

export function PartnerNav({ user }: PartnerNavProps) {
  const pathname = usePathname();

  const navLinks = [
    { label: 'Dashboard', href: '/partner/dashboard', icon: '📊' },
    { label: 'QR Scanner', href: '/partner/scanner', icon: '📷', highlight: true },
    { label: 'Menu & Drinks', href: '/partner/menu', icon: '☕' },
    { label: 'Redemptions', href: '/partner/redemptions', icon: '📋' },
    { label: 'Payouts', href: '/partner/payouts', icon: '💰' },
    { label: 'Staff Accounts', href: '/partner/staff', icon: '👥' },
    { label: 'Cafe Settings', href: '/partner/settings', icon: '⚙️' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[#E8E1D5] bg-[#FFFFFF]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand & Cafe Name */}
        <div className="flex items-center gap-6">
          <Link href="/partner/dashboard" className="flex flex-col">
            <span className="font-serif text-lg font-bold tracking-tight text-[#244832]">
              SUGGI<span className="text-[#B99A61]"> PARTNER</span>
            </span>
            <span className="text-[10px] text-[#6B5E55] font-semibold truncate max-w-[180px] sm:max-w-none">
              {user.cafeName || 'Maverick & Farmer Coffee'}
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 text-xs font-semibold text-[#49301F]">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                    item.highlight
                      ? 'bg-[#244832] text-[#FFFEFA]'
                      : isActive
                      ? 'bg-[#F5F0E6] text-[#244832]'
                      : 'hover:bg-[#F5F0E6] text-[#49301F]'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Info & Actions */}
        <div className="flex items-center gap-3">
          <Link href="/partner/scanner" className="lg:hidden">
            <button className="rounded-lg bg-[#244832] px-3 py-1.5 text-xs font-bold text-[#FFFEFA] flex items-center gap-1">
              <span>📷</span>
              <span>Scan QR</span>
            </button>
          </Link>

          <div className="hidden sm:block text-right text-xs">
            <p className="font-semibold text-[#244832]">{user.name}</p>
            <p className="text-[10px] text-[#6B5E55]">{user.role}</p>
          </div>

          <form action={logoutAction}>
            <button
              type="submit"
              className="text-xs font-semibold text-red-600 hover:text-red-700 px-2 py-1 rounded-md hover:bg-red-50"
            >
              Sign Out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
