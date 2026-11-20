import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layouts/navbar';
import { Footer } from '@/components/layouts/footer';
import { Button } from '@/components/ui/button';
import { getSession } from '@/lib/auth';

export default async function HowItWorksPage() {
  const session = await getSession();

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFEFA]">
      <Navbar user={session} />

      <main className="flex-1 py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B99A61]">Step-by-Step Guide</span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#244832]">
              How Your SUGGI CLUB Pass Works
            </h1>
            <p className="text-base sm:text-lg text-[#6B5E55] max-w-2xl mx-auto">
              Everything you need to know about purchasing a subscription, finding eligible drinks, and redeeming cups at Bengaluru partner cafes.
            </p>
          </div>

          {/* Customer Journey */}
          <div className="space-y-8">
            <h2 className="font-serif text-2xl font-bold text-[#244832] border-b border-[#E8E1D5] pb-3">
              1. The Customer Experience
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="rounded-2xl border border-[#E8E1D5] bg-[#FFFFFF] p-8 space-y-4">
                <div className="h-10 w-10 rounded-full bg-[#244832] text-[#FFFEFA] font-bold flex items-center justify-center">
                  1
                </div>
                <h3 className="font-serif text-xl font-bold text-[#244832]">Choose and Activate a Plan</h3>
                <p className="text-sm text-[#6B5E55] leading-relaxed">
                  Select between Weekly Explorer (3 credits / 7 days), Coffee 10, or Coffee 15 plans. Complete the secure checkout. Your credits become instantly active on your account.
                </p>
              </div>

              <div className="rounded-2xl border border-[#E8E1D5] bg-[#FFFFFF] p-8 space-y-4">
                <div className="h-10 w-10 rounded-full bg-[#244832] text-[#FFFEFA] font-bold flex items-center justify-center">
                  2
                </div>
                <h3 className="font-serif text-xl font-bold text-[#244832]">Visit Any Approved Partner</h3>
                <p className="text-sm text-[#6B5E55] leading-relaxed">
                  Head to any partner cafe across Indiranagar, Koramangala, Ulsoor, Church Street, or HSR Layout. Check the cafe profile in your app to see the list of eligible coffees.
                </p>
              </div>

              <div className="rounded-2xl border border-[#E8E1D5] bg-[#FFFFFF] p-8 space-y-4">
                <div className="h-10 w-10 rounded-full bg-[#244832] text-[#FFFEFA] font-bold flex items-center justify-center">
                  3
                </div>
                <h3 className="font-serif text-xl font-bold text-[#244832]">Generate Single-Use QR Pass</h3>
                <p className="text-sm text-[#6B5E55] leading-relaxed">
                  Open your app at the counter and tap &apos;Generate Redemption QR&apos;. A cryptographically secure, 90-second single-use token is generated on the server.
                </p>
              </div>

              <div className="rounded-2xl border border-[#E8E1D5] bg-[#FFFFFF] p-8 space-y-4">
                <div className="h-10 w-10 rounded-full bg-[#244832] text-[#FFFEFA] font-bold flex items-center justify-center">
                  4
                </div>
                <h3 className="font-serif text-xl font-bold text-[#244832]">Barista Scans &amp; Serves</h3>
                <p className="text-sm text-[#6B5E55] leading-relaxed">
                  The cafe barista scans your QR on the partner portal, selects your drink, and verifies redemption. Exactly one credit is deducted and your fresh brew is prepared.
                </p>
              </div>
            </div>
          </div>

          {/* Cafe Partner Journey */}
          <div className="rounded-3xl border border-[#B99A61]/30 bg-[#244832] text-[#FFFEFA] p-8 sm:p-12 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B99A61]">For Cafe Partners</span>
            <h2 className="font-serif text-3xl font-bold">How Verification Works for Cafes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-sm text-[#F5F0E6]/90">
              <div className="space-y-2">
                <h4 className="font-bold text-[#FFFEFA]">Zero Hardware Required</h4>
                <p>Baristas use any smartphone or tablet to scan customer QR codes directly in the secure partner scanner.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-[#FFFEFA]">Fraud-Proof Validation</h4>
                <p>Every token is verified instantly on the backend with atomic concurrency locks. Tokens expire in 90 seconds and cannot be reused.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-[#FFFEFA]">Weekly Payout Reconciliation</h4>
                <p>Every redemption logs an audit record with snapshot payout rate. Cafes inspect live logs and receive direct bank payouts.</p>
              </div>
            </div>
            <div className="pt-4">
              <Link href="/partner/register">
                <Button variant="accent" size="md">
                  Apply as a Cafe Partner →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
