import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layouts/navbar';
import { Footer } from '@/components/layouts/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BENGALURU_CAFES } from '@/lib/data/cafes';
import { SUBSCRIPTION_PLANS } from '@/lib/data/plans';
import { getSession } from '@/lib/auth';

export default async function HomePage() {
  const session = await getSession();
  const featuredCafes = BENGALURU_CAFES.filter((c) => c.isFeatured).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFEFA]">
      <Navbar user={session} />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#F5F0E6]/60 via-[#FFFEFA] to-[#FFFEFA] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Headlines & CTA */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#B99A61]/30 bg-[#F5F0E6] px-3.5 py-1 text-xs font-semibold text-[#244832]">
                  <span className="h-2 w-2 rounded-full bg-[#B99A61] animate-pulse" />
                  Live in Bengaluru · Curated Specialty Cafes
                </div>

                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#244832] leading-[1.12]">
                  Discover Cafes. <br />
                  <span className="text-[#49301F] italic font-normal">Subscribe to Coffee.</span> <br />
                  Enjoy Every Day.
                </h1>

                <p className="max-w-xl text-lg text-[#6B5E55] leading-relaxed">
                  Join Bengaluru&apos;s premier specialty coffee membership. Redeem fresh espresso, silky flat whites, and cold brews at the city&apos;s most loved roasteries starting at just <strong className="text-[#244832]">₹66 per cup</strong>.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                  <Link href="/plans">
                    <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-md">
                      Get Your Coffee Pass
                    </Button>
                  </Link>
                  <Link href="/cafes">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      Explore 30+ Partner Cafes
                    </Button>
                  </Link>
                </div>

                {/* Micro Proof Points */}
                <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#E8E1D5] max-w-lg">
                  <div>
                    <p className="font-serif text-2xl font-bold text-[#244832]">40%+</p>
                    <p className="text-xs text-[#6B5E55]">Avg. Member Savings</p>
                  </div>
                  <div>
                    <p className="font-serif text-2xl font-bold text-[#244832]">100%</p>
                    <p className="text-xs text-[#6B5E55]">Specialty Grade Arabica</p>
                  </div>
                  <div>
                    <p className="font-serif text-2xl font-bold text-[#244832]">60 Sec</p>
                    <p className="text-xs text-[#6B5E55]">Instant QR Barista Scan</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Visual Showcase */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-sm rounded-3xl bg-[#244832] p-4 shadow-2xl text-[#FFFEFA]">
                  {/* Digital Pass Preview Card */}
                  <div className="rounded-2xl border border-[#B99A61]/30 bg-[#193323] p-6 space-y-5">
                    <div className="flex items-center justify-between border-b border-[#B99A61]/20 pb-4">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#B99A61] font-semibold">SUGGI CLUB PASS</span>
                        <h4 className="font-serif text-lg font-bold">Coffee 10 Member</h4>
                      </div>
                      <Badge variant="gold">Active</Badge>
                    </div>

                    <div className="flex items-center justify-between bg-[#244832]/60 rounded-xl p-4">
                      <div>
                        <p className="text-xs text-[#F5F0E6]/70">Remaining Credits</p>
                        <p className="font-serif text-3xl font-bold text-[#FFFEFA]">7 <span className="text-sm font-sans text-[#B99A61]">/ 10 cups</span></p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-[#F5F0E6]/70">Validity</p>
                        <p className="text-sm font-semibold text-[#FFFEFA]">21 Days Left</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-[#FFFEFA]/10 rounded-xl p-3 text-xs text-[#F5F0E6]">
                      <div className="h-8 w-8 rounded-lg bg-[#B99A61] flex items-center justify-center font-bold text-[#244832]">
                        ☕
                      </div>
                      <div>
                        <p className="font-semibold text-[#FFFEFA]">Last Redeemed: Flat White</p>
                        <p className="text-[11px] text-[#F5F0E6]/60">Maverick & Farmer, Ulsoor · Yesterday</p>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Link href="/plans" className="block">
                        <Button variant="accent" size="md" className="w-full font-bold">
                          Get Instant Coffee Pass
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-20 bg-[#F5F0E6]/40 border-y border-[#E8E1D5]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B99A61]">Seamless Experience</span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-[#244832]">
              How SUGGI CLUB Works
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-sm sm:text-base text-[#6B5E55]">
              Three simple steps to enjoy the best cups Bengaluru has to offer.
            </p>

            <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="rounded-2xl border border-[#E8E1D5] bg-[#FFFFFF] p-8 shadow-xs relative">
                <div className="h-12 w-12 rounded-xl bg-[#244832] text-[#FFFEFA] font-serif text-xl font-bold flex items-center justify-center mb-6">
                  01
                </div>
                <h3 className="text-xl font-bold text-[#244832]">Pick Your Plan</h3>
                <p className="mt-2 text-sm text-[#6B5E55] leading-relaxed">
                  Choose Weekly Explorer (3 cups) or Monthly Coffee 10 / Coffee 15 plans. No surprise auto-renewals without your consent.
                </p>
              </div>

              <div className="rounded-2xl border border-[#E8E1D5] bg-[#FFFFFF] p-8 shadow-xs relative">
                <div className="h-12 w-12 rounded-xl bg-[#B99A61] text-[#244832] font-serif text-xl font-bold flex items-center justify-center mb-6">
                  02
                </div>
                <h3 className="text-xl font-bold text-[#244832]">Explore Bengaluru Cafes</h3>
                <p className="mt-2 text-sm text-[#6B5E55] leading-relaxed">
                  Browse participating specialty roasteries in Indiranagar, Koramangala, Church Street and beyond. Discover drink eligibility in one tap.
                </p>
              </div>

              <div className="rounded-2xl border border-[#E8E1D5] bg-[#FFFFFF] p-8 shadow-xs relative">
                <div className="h-12 w-12 rounded-xl bg-[#49301F] text-[#F5F0E6] font-serif text-xl font-bold flex items-center justify-center mb-6">
                  03
                </div>
                <h3 className="text-xl font-bold text-[#244832]">1-Tap QR Barista Scan</h3>
                <p className="mt-2 text-sm text-[#6B5E55] leading-relaxed">
                  Generate your secure single-use digital pass. Show it to the cafe barista at checkout. Credit is instantly verified and your coffee is served.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED CAFES */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#B99A61]">Curated Partners</span>
                <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-[#244832]">
                  Bengaluru&apos;s Finest Specialty Cafes
                </h2>
                <p className="mt-2 text-sm text-[#6B5E55]">
                  Every partner is vetted for bean sourcing, roast freshness, and barista expertise.
                </p>
              </div>
              <Link href="/cafes" className="mt-4 md:mt-0 inline-flex items-center font-semibold text-[#244832] hover:text-[#B99A61] transition-colors">
                View all cafes →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCafes.map((cafe) => (
                <Link key={cafe.id} href={`/cafes/${cafe.slug}`} className="group block">
                  <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div className="relative h-48 w-full overflow-hidden bg-[#F5F0E6]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={cafe.coverImage}
                        alt={cafe.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 right-3">
                        <Badge variant="gold">★ {cafe.rating}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <p className="text-xs font-semibold uppercase text-[#B99A61] tracking-wider">
                        {cafe.neighborhood}
                      </p>
                      <h3 className="mt-1 font-serif text-lg font-bold text-[#244832] group-hover:text-[#49301F] transition-colors">
                        {cafe.name}
                      </h3>
                      <p className="mt-2 text-xs text-[#6B5E55] line-clamp-2">
                        {cafe.description}
                      </p>
                      <div className="mt-4 pt-4 border-t border-[#E8E1D5] flex items-center justify-between text-xs text-[#49301F]">
                        <span className="font-medium">{cafe.eligibleDrinks.length} drinks eligible</span>
                        <span className="font-semibold text-[#244832]">View Menu →</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING PLANS */}
        <section className="py-20 bg-[#F5F0E6]/30 border-t border-[#E8E1D5]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B99A61]">Transparent Pricing</span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-[#244832]">
              Choose Your Coffee Pass
            </h2>
            <p className="mt-2 max-w-2xl mx-auto text-sm text-[#6B5E55]">
              No hidden fees. Manual renewal when you decide. Valid at all approved cafes across Bengaluru.
            </p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              {SUBSCRIPTION_PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative rounded-2xl bg-[#FFFFFF] p-6 border shadow-sm transition-all hover:shadow-md flex flex-col justify-between ${
                    plan.isPopular ? 'border-2 border-[#244832]' : 'border-[#E8E1D5]'
                  }`}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge variant="success">★ Most Popular</Badge>
                    </div>
                  )}

                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#244832]">{plan.name}</h3>
                    <p className="mt-1 text-xs text-[#6B5E55]">{plan.tagline}</p>

                    <div className="mt-4 mb-4 pb-4 border-b border-[#E8E1D5]">
                      <span className="text-3xl font-serif font-bold text-[#244832]">₹{plan.priceDisplay}</span>
                      <span className="text-xs text-[#6B5E55]"> / {plan.validityDays} days</span>
                      <p className="mt-1 text-xs font-medium text-[#B99A61]">
                        Just ₹{plan.costPerCup} per coffee redemption
                      </p>
                    </div>

                    <ul className="space-y-2 text-xs text-[#49301F]">
                      {plan.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-[#244832] font-bold">✓</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4">
                    <Link href={`/login?redirect=/app/subscription&plan=${plan.slug}`} className="block">
                      <Button
                        variant={plan.isPopular ? 'primary' : 'outline'}
                        size="md"
                        className="w-full"
                      >
                        Subscribe Now
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PARENT BRAND BANNER */}
        <section className="bg-[#244832] text-[#FFFEFA] py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B99A61]">
              SUGGI GLOBAL INITIATIVE
            </span>
            <h2 className="font-serif text-3xl font-bold tracking-tight">
              Bridging Specialty Coffee Roasters & City Coffee Lovers
            </h2>
            <p className="max-w-2xl mx-auto text-sm text-[#F5F0E6]/80 leading-relaxed">
              SUGGI CLUB is built by SUGGI GLOBAL to celebrate and support independent Indian coffee plantations, roasters, and local cafe culture.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link href="/about">
                <Button variant="accent" size="md">
                  Read Our Story
                </Button>
              </Link>
              <Link href="/partner/register">
                <Button variant="outline" size="md" className="border-[#F5F0E6] text-[#F5F0E6] hover:bg-[#F5F0E6]/10">
                  Register Your Cafe
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
