'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  user?: {
    name: string;
    role: string;
  } | null;
}

export function Navbar({ user }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E8E1D5] bg-[#FFFEFA]/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-8">
          <Link href="/" className="group flex flex-col">
            <span className="font-serif text-2xl font-bold tracking-tight text-[#244832] transition-colors group-hover:text-[#193323]">
              SUGGI<span className="text-[#B99A61]"> CLUB</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#6B5E55]">
              By SUGGI GLOBAL · Bengaluru
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-[#49301F]">
            <Link href="/cafes" className="hover:text-[#244832] transition-colors">
              Discover Cafes
            </Link>
            <Link href="/plans" className="hover:text-[#244832] transition-colors">
              Plans & Pricing
            </Link>
            <Link href="/how-it-works" className="hover:text-[#244832] transition-colors">
              How It Works
            </Link>
            <Link href="/about" className="hover:text-[#244832] transition-colors">
              About Us
            </Link>
          </nav>
        </div>

        {/* Desktop CTA actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="/partner/register"
            className="text-xs font-semibold uppercase tracking-wider text-[#B99A61] hover:text-[#9A7E4A] transition-colors px-3 py-1.5 rounded-md hover:bg-[#F5F0E6]"
          >
            Partner Cafe Login
          </Link>

          {user ? (
            <Link href={user.role.includes('ADMIN') ? '/admin' : user.role.includes('CAFE') ? '/partner/dashboard' : '/app'}>
              <Button variant="primary" size="md">
                Open {user.role.includes('ADMIN') ? 'Admin' : user.role.includes('CAFE') ? 'Partner Portal' : 'My Pass'}
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="md">
                  Log In
                </Button>
              </Link>
              <Link href="/plans">
                <Button variant="primary" size="md" className="shadow-sm">
                  Get Coffee Pass
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#49301F] hover:bg-[#F5F0E6] rounded-lg transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E8E1D5] bg-[#FFFEFA] px-6 py-6 space-y-4 animate-in slide-in-from-top-4">
          <nav className="flex flex-col space-y-3 text-base font-medium text-[#49301F]">
            <Link
              href="/cafes"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#244832] border-b border-[#F5F0E6]"
            >
              Discover Cafes
            </Link>
            <Link
              href="/plans"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#244832] border-b border-[#F5F0E6]"
            >
              Subscription Plans
            </Link>
            <Link
              href="/how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#244832] border-b border-[#F5F0E6]"
            >
              How It Works
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#244832] border-b border-[#F5F0E6]"
            >
              About SUGGI CLUB
            </Link>
            <Link
              href="/partner/register"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-[#B99A61] font-semibold"
            >
              Join as Cafe Partner
            </Link>
          </nav>

          <div className="pt-4 flex flex-col space-y-2">
            {user ? (
              <Link href="/app" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" size="lg" className="w-full">
                  Go to Coffee Pass
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" size="lg" className="w-full">
                    Log In
                  </Button>
                </Link>
                <Link href="/plans" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" size="lg" className="w-full">
                    Join SUGGI CLUB
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
