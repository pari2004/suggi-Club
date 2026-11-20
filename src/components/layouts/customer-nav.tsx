'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SessionUser } from '@/lib/auth';

interface CustomerNavProps {
  user: SessionUser;
  creditsRemaining?: number;
}

export function CustomerNav({ user, creditsRemaining = 7 }: CustomerNavProps) {
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/app', icon: '🏠' },
    { label: 'Explore', href: '/app/explore', icon: '🔍' },
    { label: 'My Pass', href: '/app/pass', icon: '☕', highlight: true },
    { label: 'History', href: '/app/history', icon: '📜' },
    { label: 'Profile', href: '/app/profile', icon: '👤' },
  ];

  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-30 border-b border-[#E8E1D5] bg-[#FFFEFA]/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6">
          <Link href="/app" className="flex items-center gap-2">
            <span className="font-serif text-xl font-bold tracking-tight text-[#244832]">
              SUGGI<span className="text-[#B99A61]"> CLUB</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/app/pass"
              className="inline-flex items-center gap-2 rounded-full border border-[#B99A61]/40 bg-[#F5F0E6] px-3 py-1 text-xs font-semibold text-[#244832] transition-colors hover:bg-[#B99A61]/20"
            >
              <span>☕</span>
              <span>{creditsRemaining} Credits</span>
            </Link>

            <Link
              href="/app/profile"
              className="h-8 w-8 rounded-full border border-[#B99A61] bg-[#244832] text-[#FFFEFA] text-xs font-bold flex items-center justify-center"
              title={user.name}
            >
              {user.name.charAt(0).toUpperCase()}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#E8E1D5] bg-[#FFFFFF] pb-safe sm:hidden">
        <div className="flex h-16 items-center justify-around px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center flex-1 py-1 text-[11px] font-medium transition-colors ${
                  item.highlight
                    ? 'text-[#244832]'
                    : isActive
                    ? 'text-[#244832] font-bold'
                    : 'text-[#6B5E55] hover:text-[#244832]'
                }`}
              >
                {item.highlight ? (
                  <div className="h-9 w-9 -mt-3 rounded-full bg-[#244832] text-[#FFFEFA] flex items-center justify-center shadow-md">
                    <span className="text-base">{item.icon}</span>
                  </div>
                ) : (
                  <span className="text-base leading-none mb-1">{item.icon}</span>
                )}
                <span className={item.highlight ? 'mt-1 text-[10px] font-bold text-[#244832]' : ''}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
