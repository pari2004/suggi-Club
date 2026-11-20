import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layouts/navbar';
import { Footer } from '@/components/layouts/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getCafeBySlug } from '@/lib/data/cafes';
import { getSession } from '@/lib/auth';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CafeDetailPage({ params }: Props) {
  const { slug } = await params;
  const cafe = getCafeBySlug(slug);
  const session = await getSession();

  if (!cafe) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFEFA]">
      <Navbar user={session} />

      <main className="flex-1">
        {/* Banner Image */}
        <div className="relative h-72 sm:h-96 w-full bg-[#244832]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cafe.coverImage}
            alt={cafe.name}
            className="h-full w-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#244832]/90 via-[#244832]/40 to-transparent" />
          
          <div className="absolute bottom-6 left-0 right-0">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-[#FFFEFA] space-y-2">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-[#B99A61] px-3 py-0.5 text-xs font-bold text-[#244832]">
                  ★ {cafe.rating} ({cafe.reviewsCount} reviews)
                </span>
                <span className="text-xs uppercase tracking-wider text-[#F5F0E6]">
                  {cafe.neighborhood} · Bengaluru
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
                {cafe.name}
              </h1>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Details & Menu */}
            <div className="lg:col-span-8 space-y-10">
              {/* About Cafe */}
              <div className="space-y-4">
                <h2 className="font-serif text-2xl font-bold text-[#244832]">About the Roastery</h2>
                <p className="text-base text-[#49301F] leading-relaxed">
                  {cafe.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {cafe.amenities.map((a, idx) => (
                    <span
                      key={idx}
                      className="rounded-lg border border-[#E8E1D5] bg-[#F5F0E6] px-3 py-1 text-xs font-medium text-[#244832]"
                    >
                      ✓ {a}
                    </span>
                  ))}
                </div>
              </div>

              {/* Eligible Drinks Menu */}
              <div className="space-y-6 pt-4 border-t border-[#E8E1D5]">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-[#244832]">
                      Eligible Subscription Drinks
                    </h2>
                    <p className="text-xs sm:text-sm text-[#6B5E55]">
                      Redeem any of these handcrafted items with exactly 1 SUGGI CLUB credit.
                    </p>
                  </div>
                  <Badge variant="success">All Valid on Pass</Badge>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {cafe.eligibleDrinks.map((drink, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-[#E8E1D5] bg-[#FFFFFF] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:border-[#B99A61]"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif text-lg font-bold text-[#244832]">
                            {drink.name}
                          </h4>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                              drink.tier === 'PREMIUM'
                                ? 'bg-[#B99A61]/20 text-[#9A7E4A]'
                                : 'bg-[#244832]/10 text-[#244832]'
                            }`}
                          >
                            {drink.tier}
                          </span>
                        </div>
                        <p className="text-xs text-[#6B5E55] max-w-md">{drink.description}</p>
                      </div>

                      <div className="text-right shrink-0">
                        <p className="text-xs line-through text-[#A89F91]">Retail: ₹{drink.retailPrice}</p>
                        <p className="text-sm font-bold text-[#244832]">1 Pass Credit</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Location & Hours & Pass Action */}
            <div className="lg:col-span-4 space-y-6">
              {/* Redeem / Subscribe Action Card */}
              <div className="rounded-2xl border border-[#B99A61]/40 bg-[#F5F0E6] p-6 space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#B99A61]">
                  Quick Redemption
                </span>
                <h3 className="font-serif text-xl font-bold text-[#244832]">
                  Visiting this cafe today?
                </h3>
                <p className="text-xs text-[#6B5E55] leading-relaxed">
                  Generate your instant QR pass at the counter to redeem your coffee in under 60 seconds.
                </p>
                <Link href="/app/pass" className="block pt-2">
                  <Button variant="primary" size="lg" className="w-full font-bold">
                    Open Digital Pass
                  </Button>
                </Link>
                <Link href="/plans" className="block text-center text-xs text-[#49301F] hover:underline">
                  Don&apos;t have a pass yet? View Subscription Plans
                </Link>
              </div>

              {/* Location & Contact Info */}
              <div className="rounded-2xl border border-[#E8E1D5] bg-[#FFFFFF] p-6 space-y-4 text-sm text-[#49301F]">
                <h4 className="font-serif text-base font-bold text-[#244832]">Location &amp; Timings</h4>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="font-semibold text-[#244832] block">Address:</span>
                    <p className="text-[#6B5E55] mt-0.5">{cafe.address}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-[#244832] block">Hours:</span>
                    <p className="text-[#6B5E55] mt-0.5">{cafe.openingHours}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-[#244832] block">Contact Phone:</span>
                    <p className="text-[#6B5E55] mt-0.5">{cafe.phone}</p>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(cafe.name + ' ' + cafe.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-center text-xs font-semibold text-[#244832] border border-[#244832]/20 rounded-lg py-2 hover:bg-[#F5F0E6] transition-colors"
                  >
                    Open in Google Maps ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
