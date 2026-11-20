import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getCafeBySlug } from '@/lib/data/cafes';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function AppCafeDetailPage({ params }: Props) {
  const { slug } = await params;
  const cafe = getCafeBySlug(slug);

  if (!cafe) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Top Cafe Header */}
      <div className="relative h-48 sm:h-64 rounded-3xl overflow-hidden bg-[#244832]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cafe.coverImage}
          alt={cafe.name}
          className="h-full w-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#244832]/90 via-[#244832]/30 to-transparent" />

        <div className="absolute bottom-4 left-4 right-4 text-[#FFFEFA]">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="gold">★ {cafe.rating}</Badge>
            <span className="text-xs text-[#F5F0E6]">{cafe.neighborhood}</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold">{cafe.name}</h1>
        </div>
      </div>

      {/* Counter Action Banner */}
      <div className="rounded-2xl border border-[#B99A61]/30 bg-[#F5F0E6] p-4 flex items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-sm font-bold text-[#244832]">Ready to order at the counter?</h3>
          <p className="text-xs text-[#6B5E55]">Show your digital QR code to the barista.</p>
        </div>
        <Link href="/app/pass" className="shrink-0">
          <Button variant="primary" size="md" className="font-bold text-xs">
            Open QR Pass →
          </Button>
        </Link>
      </div>

      {/* Eligible Menu List */}
      <div className="space-y-4">
        <h2 className="font-serif text-lg font-bold text-[#244832]">
          Eligible Drinks Menu at this Cafe
        </h2>

        <div className="space-y-3">
          {cafe.eligibleDrinks.map((drink, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-[#E8E1D5] bg-[#FFFFFF] p-4 flex items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-serif text-base font-bold text-[#244832]">{drink.name}</h4>
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
                <p className="text-xs text-[#6B5E55]">{drink.description}</p>
              </div>

              <div className="text-right shrink-0">
                <p className="text-xs line-through text-[#A89F91]">₹{drink.retailPrice}</p>
                <Badge variant="success">1 Credit</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cafe Timings & Address */}
      <div className="rounded-2xl border border-[#E8E1D5] bg-[#FFFFFF] p-5 space-y-2 text-xs text-[#49301F]">
        <h3 className="font-serif text-sm font-bold text-[#244832]">Cafe Location</h3>
        <p className="text-[#6B5E55]">{cafe.address}</p>
        <p className="text-[#6B5E55]"><strong>Hours:</strong> {cafe.openingHours}</p>
        <div className="pt-2">
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(cafe.name + ' ' + cafe.address)}`}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-semibold text-[#244832] underline"
          >
            Open in Google Maps ↗
          </a>
        </div>
      </div>
    </div>
  );
}
