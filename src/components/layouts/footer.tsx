import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-[#E8E1D5] bg-[#F5F0E6] text-[#49301F]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl font-bold tracking-tight text-[#244832]">
                SUGGI<span className="text-[#B99A61]"> CLUB</span>
              </span>
            </Link>
            <p className="text-sm text-[#6B5E55] leading-relaxed">
              Discover Bengaluru&apos;s best specialty cafes. Subscribe to fresh coffee. Enjoy every day with a single digital pass.
            </p>
            <div className="pt-2 text-xs text-[#6B5E55]">
              <p className="font-medium text-[#244832]">A Product of SUGGI GLOBAL</p>
              <a
                href="https://suggiglobal.com"
                target="_blank"
                rel="noreferrer"
                className="text-[#B99A61] hover:underline"
              >
                https://suggiglobal.com
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#244832]">Explore</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/cafes" className="hover:text-[#244832] transition-colors">
                  Bengaluru Cafes
                </Link>
              </li>
              <li>
                <Link href="/plans" className="hover:text-[#244832] transition-colors">
                  Subscription Plans
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-[#244832] transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#244832] transition-colors">
                  About Our Brand
                </Link>
              </li>
            </ul>
          </div>

          {/* Partner & Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#244832]">Partners & Support</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/partner/register" className="text-[#B99A61] font-semibold hover:underline">
                  Cafe Partner Program
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#244832] transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#244832] transition-colors">
                  Help & Contact Us
                </Link>
              </li>
              <li>
                <Link href="/app/support" className="hover:text-[#244832] transition-colors">
                  Member Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Launch City */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#244832]">Pilot Location</h4>
            <p className="mt-4 text-sm text-[#6B5E55]">
              📍 Bengaluru, Karnataka, India
            </p>
            <p className="mt-1 text-xs text-[#A89F91]">
              Indiranagar · Koramangala · Church Street · Ulsoor · HSR Layout
            </p>

            <div className="mt-6 space-y-2 text-xs text-[#6B5E55]">
              <div className="flex gap-4">
                <Link href="/terms" className="hover:underline">
                  Terms of Service
                </Link>
                <span>·</span>
                <Link href="/privacy" className="hover:underline">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-[#E8E1D5] pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#6B5E55]">
          <p>© {new Date().getFullYear()} SUGGI GLOBAL (OPC) PRIVATE LIMITED. All rights reserved.</p>
          <p className="mt-2 md:mt-0 font-medium text-[#244832]">
            Crafted for Bengaluru&apos;s coffee culture ☕
          </p>
        </div>
      </div>
    </footer>
  );
}
