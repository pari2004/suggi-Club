import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getSession } from '@/lib/auth';
import { BENGALURU_CAFES } from '@/lib/data/cafes';

export default async function CustomerDashboardPage() {
  const session = await getSession();
  const nearbyCafes = BENGALURU_CAFES.slice(0, 3);

  // Mock active subscription status
  const subscription = {
    planName: 'Coffee 10',
    creditsRemaining: 7,
    creditsTotal: 10,
    validityDaysLeft: 22,
    expiresAt: 'Dec 12, 2026',
    dailyCap: 2,
    redemptionsToday: 0,
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#244832]">
            Hello, {session?.name.split(' ')[0]} ☕
          </h1>
          <p className="text-xs sm:text-sm text-[#6B5E55]">
            Bengaluru · Ready for your daily specialty cup?
          </p>
        </div>
        <Link href="/app/subscription">
          <Badge variant="gold" className="cursor-pointer">
            Manage Plan
          </Badge>
        </Link>
      </div>

      {/* ACTIVE DIGITAL PASS CARD */}
      <div className="rounded-3xl border border-[#B99A61]/40 bg-gradient-to-br from-[#244832] to-[#193323] p-6 sm:p-8 text-[#FFFEFA] shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-[#B99A61]/10 pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex items-center justify-between border-b border-[#B99A61]/20 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#B99A61]">
                SUGGI CLUB MEMBER PASS
              </span>
              <h2 className="font-serif text-2xl font-bold">{subscription.planName}</h2>
            </div>
            <div className="text-right">
              <span className="inline-block rounded-full bg-[#B99A61]/20 px-3 py-1 text-xs font-semibold text-[#B99A61] border border-[#B99A61]/30">
                ACTIVE
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-[#FFFEFA]/5 rounded-2xl p-4 border border-[#FFFEFA]/10">
            <div>
              <p className="text-[11px] text-[#F5F0E6]/70">Remaining Credits</p>
              <p className="font-serif text-3xl font-bold text-[#FFFEFA]">
                {subscription.creditsRemaining}{' '}
                <span className="text-xs font-sans text-[#B99A61]">/ {subscription.creditsTotal}</span>
              </p>
            </div>
            <div>
              <p className="text-[11px] text-[#F5F0E6]/70">Days Left</p>
              <p className="font-serif text-2xl font-bold text-[#FFFEFA]">{subscription.validityDaysLeft}</p>
              <p className="text-[10px] text-[#F5F0E6]/60">Expires {subscription.expiresAt}</p>
            </div>
            <div className="col-span-2 sm:col-span-1 border-t sm:border-t-0 sm:border-l border-[#FFFEFA]/10 pt-2 sm:pt-0 sm:pl-4">
              <p className="text-[11px] text-[#F5F0E6]/70">Today&apos;s Allowance</p>
              <p className="text-sm font-bold text-[#B99A61]">
                {subscription.dailyCap - subscription.redemptionsToday} of {subscription.dailyCap} cups left
              </p>
            </div>
          </div>

          {/* Primary Action Button */}
          <div>
            <Link href="/app/pass" className="block">
              <Button
                variant="accent"
                size="lg"
                className="w-full font-bold shadow-lg text-[#244832] hover:scale-[1.01] transition-transform"
              >
                📱 Open QR Pass for Barista Scan
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Link href="/app/explore" className="block">
          <div className="rounded-xl border border-[#E8E1D5] bg-[#FFFFFF] p-4 text-center hover:border-[#244832] transition-colors">
            <span className="text-2xl block mb-1">📍</span>
            <span className="text-xs font-bold text-[#244832]">Find Cafes</span>
          </div>
        </Link>
        <Link href="/app/pass" className="block">
          <div className="rounded-xl border border-[#E8E1D5] bg-[#FFFFFF] p-4 text-center hover:border-[#244832] transition-colors">
            <span className="text-2xl block mb-1">🎟️</span>
            <span className="text-xs font-bold text-[#244832]">My QR Pass</span>
          </div>
        </Link>
        <Link href="/app/history" className="block">
          <div className="rounded-xl border border-[#E8E1D5] bg-[#FFFFFF] p-4 text-center hover:border-[#244832] transition-colors">
            <span className="text-2xl block mb-1">📜</span>
            <span className="text-xs font-bold text-[#244832]">History</span>
          </div>
        </Link>
        <Link href="/app/support" className="block">
          <div className="rounded-xl border border-[#E8E1D5] bg-[#FFFFFF] p-4 text-center hover:border-[#244832] transition-colors">
            <span className="text-2xl block mb-1">💬</span>
            <span className="text-xs font-bold text-[#244832]">Support</span>
          </div>
        </Link>
      </div>

      {/* NEARBY CAFES */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-lg font-bold text-[#244832]">Featured Cafes Nearby</h3>
          <Link href="/app/explore" className="text-xs font-semibold text-[#B99A61] hover:underline">
            View All ({BENGALURU_CAFES.length}) →
          </Link>
        </div>

        <div className="space-y-3">
          {nearbyCafes.map((cafe) => (
            <Link key={cafe.id} href={`/app/cafes/${cafe.slug}`} className="block">
              <Card className="hover:border-[#244832] transition-colors">
                <CardContent className="p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cafe.coverImage}
                      alt={cafe.name}
                      className="h-14 w-14 rounded-xl object-cover"
                    />
                    <div>
                      <h4 className="font-serif text-sm font-bold text-[#244832]">{cafe.name}</h4>
                      <p className="text-[11px] text-[#6B5E55]">{cafe.neighborhood}</p>
                      <span className="inline-block text-[10px] text-[#B99A61] font-semibold mt-0.5">
                        ★ {cafe.rating} · {cafe.eligibleDrinks.length} drinks on pass
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="shrink-0 text-xs">
                    Redeem →
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="rounded-2xl border border-[#E8E1D5] bg-[#FFFFFF] p-5 space-y-3">
        <h3 className="font-serif text-base font-bold text-[#244832]">Recent Coffee Redemptions</h3>
        <div className="space-y-2.5 text-xs text-[#49301F]">
          <div className="flex items-center justify-between py-2 border-b border-[#F5F0E6]">
            <div>
              <p className="font-semibold text-[#244832]">Flat White (Oat Milk)</p>
              <p className="text-[11px] text-[#6B5E55]">Maverick &amp; Farmer · Ulsoor</p>
            </div>
            <div className="text-right">
              <span className="font-bold text-[#244832]">-1 Credit</span>
              <p className="text-[10px] text-[#A89F91]">Yesterday, 10:14 AM</p>
            </div>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-[#F5F0E6]">
            <div>
              <p className="font-semibold text-[#244832]">Nitro Cold Brew</p>
              <p className="text-[11px] text-[#6B5E55]">Araku Coffee · Indiranagar</p>
            </div>
            <div className="text-right">
              <span className="font-bold text-[#244832]">-1 Credit</span>
              <p className="text-[10px] text-[#A89F91]">3 days ago, 4:30 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
