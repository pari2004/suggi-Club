import React from 'react';
import { Navbar } from '@/components/layouts/navbar';
import { Footer } from '@/components/layouts/footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFEFA]">
      <Navbar />

      <main className="flex-1 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8 text-[#49301F] text-sm leading-relaxed">
          <div className="border-b border-[#E8E1D5] pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B99A61]">Privacy</span>
            <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-[#244832]">
              Privacy Policy
            </h1>
            <p className="mt-2 text-xs text-[#6B5E55]">Last updated: November 2026 · SUGGI GLOBAL</p>
          </div>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#244832]">1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us when registering for an account, purchasing a coffee subscription pass, or registering as a cafe partner. This includes your name, email address, phone number, and transaction identifiers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#244832]">2. Payment Processing</h2>
            <p>
              SUGGI CLUB processes payments through regulated payment gateways (such as Razorpay). We never store or retain raw credit or debit card numbers, CVVs, or bank net banking credentials on our servers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#244832]">3. Use of Information</h2>
            <p>
              Your information is used solely to authenticate your identity, manage your coffee credits, authorize QR redemptions at partner cafes, calculate cafe partner payouts, and communicate transactional receipts or service updates. We do not sell your personal data to third parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#244832]">4. Data Security</h2>
            <p>
              All sessions are encrypted with secure HTTP-only cookies and cryptographic signatures. Passwords are irreversibly hashed using bcrypt. Sensitive partner bank details and payout records are restricted to authorized finance administrators.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
