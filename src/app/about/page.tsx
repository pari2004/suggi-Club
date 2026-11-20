import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layouts/navbar';
import { Footer } from '@/components/layouts/footer';
import { Button } from '@/components/ui/button';
import { getSession } from '@/lib/auth';

export default async function AboutPage() {
  const session = await getSession();

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFEFA]">
      <Navbar user={session} />

      <main className="flex-1 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B99A61]">Our Story</span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#244832]">
              Brewed in Bengaluru, Backed by SUGGI GLOBAL
            </h1>
            <p className="text-lg text-[#6B5E55] max-w-2xl mx-auto leading-relaxed">
              We connect passionate coffee consumers with independent specialty cafes through a sustainable subscription model.
            </p>
          </div>

          {/* Mission */}
          <div className="rounded-3xl border border-[#E8E1D5] bg-[#F5F0E6]/50 p-8 sm:p-12 space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#244832]">
              Why SUGGI CLUB Exists
            </h2>
            <p className="text-base text-[#49301F] leading-relaxed">
              India produces some of the finest Arabicas and specialty coffees in the world, nurtured in the hills of Coorg, Chikmagalur, Wayanad, and the Araku Valley. Yet, discovering genuine specialty cafes and enjoying premium roasts regularly has historically meant steep daily retail prices and fragmented discovery.
            </p>
            <p className="text-base text-[#49301F] leading-relaxed">
              SUGGI CLUB transforms this dynamic. By uniting independent roasters under one curated subscription pass, coffee enthusiasts save over 40% on their routine daily brews, while cafe partners enjoy steady customer footfall and guaranteed weekly payouts.
            </p>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-[#E8E1D5] bg-[#FFFFFF] p-6 space-y-3">
              <h3 className="font-serif text-xl font-bold text-[#244832]">Fair Partner Payouts</h3>
              <p className="text-sm text-[#6B5E55]">
                We believe in transparent unit economics. Every coffee redemption directly compensates the partner cafe at pre-agreed rates with zero delayed settlements.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E8E1D5] bg-[#FFFFFF] p-6 space-y-3">
              <h3 className="font-serif text-xl font-bold text-[#244832]">Specialty Quality Only</h3>
              <p className="text-sm text-[#6B5E55]">
                No instant powders, no synthetic syrups. Every participating cafe is verified for estate beans, calibrated equipment, and skilled baristas.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E8E1D5] bg-[#FFFFFF] p-6 space-y-3">
              <h3 className="font-serif text-xl font-bold text-[#244832]">Parent Ecosystem</h3>
              <p className="text-sm text-[#6B5E55]">
                Supported by SUGGI GLOBAL (<a href="https://suggiglobal.com" target="_blank" rel="noreferrer" className="text-[#B99A61] underline">suggiglobal.com</a>), committed to conscious agribusiness, fair trade and regional innovation.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center pt-8 space-y-4">
            <h3 className="font-serif text-2xl font-bold text-[#244832]">
              Ready to explore Bengaluru&apos;s coffee landscape?
            </h3>
            <div className="flex justify-center gap-4">
              <Link href="/plans">
                <Button variant="primary" size="lg">
                  Explore Coffee Plans
                </Button>
              </Link>
              <Link href="/cafes">
                <Button variant="outline" size="lg">
                  Browse Cafes
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
