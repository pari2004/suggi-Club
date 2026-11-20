import React from 'react';
import { Navbar } from '@/components/layouts/navbar';
import { Footer } from '@/components/layouts/footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFEFA]">
      <Navbar />

      <main className="flex-1 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8 text-[#49301F] text-sm leading-relaxed">
          <div className="border-b border-[#E8E1D5] pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B99A61]">Legal</span>
            <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-[#244832]">
              Terms of Service
            </h1>
            <p className="mt-2 text-xs text-[#6B5E55]">Last updated: November 2026 · SUGGI GLOBAL</p>
          </div>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#244832]">1. Acceptance of Terms</h2>
            <p>
              By accessing or using SUGGI CLUB (club.suggiglobal.com), a platform operated under SUGGI GLOBAL (OPC) PRIVATE LIMITED (&quot;SUGGI&quot;, &quot;we&quot;, &quot;us&quot;), you agree to be bound by these Terms of Service. If you do not agree, do not purchase or use our subscription services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#244832]">2. Subscriptions &amp; Credits</h2>
            <p>
              SUGGI CLUB offers prepaid coffee subscriptions (Weekly Explorer, Coffee 10, Coffee 15, and Premium Club). Each subscription allocates a specified number of digital credits valid for a defined duration (7 or 30 days) from the moment payment is verified.
            </p>
            <p>
              Credits are strictly non-transferable, single-use, and expire automatically at the conclusion of the validity period. We do not automatically bill or recharge payment cards upon expiration.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#244832]">3. QR Redemption Rules</h2>
            <p>
              Digital QR redemption tokens are generated dynamically on our secure servers and carry an approximate 60–90 second lifespan. Displaying, scanning, or sharing fraudulent or unauthorized screenshots of expired tokens is strictly prohibited. Exactly one credit is deducted per verified redemption. Daily redemption caps apply as designated by your chosen plan.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#244832]">4. Cafe Partners &amp; Menu Eligibility</h2>
            <p>
              Participating cafes are independent third-party businesses. While we curate quality standards, menu availability of specific beans or items remains subject to cafe opening hours, inventory, and operational discretion.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#244832]">5. Refunds and Cancellations</h2>
            <p>
              Unused subscriptions may be cancelled within 48 hours of purchase for a full refund if zero credits have been consumed. Once a credit is redeemed, subscriptions become non-refundable for that active billing cycle.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
