import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layouts/navbar';
import { Footer } from '@/components/layouts/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SUBSCRIPTION_PLANS } from '@/lib/data/plans';
import { getSession } from '@/lib/auth';

export default async function PlansPage() {
  const session = await getSession();

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFEFA]">
      <Navbar user={session} />

      <main className="flex-1 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B99A61]">
              Flexible Coffee Memberships
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#244832]">
              Transparent Plans for Every Coffee Lover
            </h1>
            <p className="text-base sm:text-lg text-[#6B5E55] leading-relaxed">
              No hidden fees, no lock-in, and absolutely no surprise auto-deductions. Pick the plan that fits your routine and redeem across Bengaluru&apos;s best specialty cafes.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SUBSCRIPTION_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-3xl bg-[#FFFFFF] p-8 border shadow-sm transition-all duration-300 hover:shadow-xl flex flex-col justify-between ${
                  plan.isPopular ? 'border-2 border-[#244832] ring-4 ring-[#244832]/5' : 'border-[#E8E1D5]'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <Badge variant="success" className="px-3 py-1 font-bold text-xs uppercase tracking-wide">
                      ★ Most Popular
                    </Badge>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#B99A61]">
                      {plan.badge}
                    </span>
                    <span className="text-xs font-medium text-[#6B5E55]">{plan.validityDays} Days</span>
                  </div>

                  <h3 className="mt-2 font-serif text-2xl font-bold text-[#244832]">{plan.name}</h3>
                  <p className="mt-1 text-xs text-[#6B5E55] leading-relaxed">{plan.tagline}</p>

                  <div className="mt-6 mb-6 pb-6 border-b border-[#E8E1D5]">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-serif font-bold text-[#244832]">₹{plan.priceDisplay}</span>
                      <span className="text-xs text-[#6B5E55]">/ period</span>
                    </div>
                    <p className="mt-2 text-xs font-bold text-[#B99A61]">
                      ≈ ₹{plan.costPerCup} per specialty cup (save ~40%)
                    </p>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#49301F]">What&apos;s Included:</p>
                    <ul className="space-y-2.5 text-xs text-[#49301F]">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#244832] font-bold text-sm leading-none">✓</span>
                          <span className="leading-tight">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-10 pt-4">
                  <Link
                    href={
                      session
                        ? `/app/subscription?plan=${plan.slug}`
                        : `/login?callbackUrl=/app/subscription?plan=${plan.slug}`
                    }
                    className="block"
                  >
                    <Button
                      variant={plan.isPopular ? 'primary' : 'outline'}
                      size="lg"
                      className="w-full font-bold shadow-xs"
                    >
                      Choose {plan.name}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Unit Economics & Transparency Card */}
          <div className="rounded-3xl border border-[#E8E1D5] bg-[#F5F0E6]/50 p-8 sm:p-12 space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#244832]">
              Why We Are Transparent About Our Economics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-[#49301F] leading-relaxed">
              <div>
                <h4 className="font-bold text-[#244832] mb-1">Zero Hidden Markups</h4>
                <p>Retail specialty coffees in Bengaluru range from ₹180 to ₹280. We pool subscription volume so you pay ₹66–₹83 while the cafe receives a guaranteed payout per cup.</p>
              </div>
              <div>
                <h4 className="font-bold text-[#244832] mb-1">Sustainable Roaster Support</h4>
                <p>Partner cafes receive direct bank payouts every week for all cups poured. No credit vouchers or delayed vendor settlements.</p>
              </div>
              <div>
                <h4 className="font-bold text-[#244832] mb-1">No Auto-Billing Trap</h4>
                <p>Subscriptions expire cleanly at the end of their validity window. You choose when and if you wish to renew your pass.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
