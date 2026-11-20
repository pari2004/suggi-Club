'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BENGALURU_CAFES, getAllNeighborhoods } from '@/lib/data/cafes';

export default function AppExplorePage() {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const neighborhoods = useMemo(() => ['All', ...getAllNeighborhoods()], []);

  const filteredCafes = useMemo(() => {
    return BENGALURU_CAFES.filter((cafe) => {
      const matchesArea =
        selectedNeighborhood === 'All' ||
        cafe.neighborhood.toLowerCase().includes(selectedNeighborhood.toLowerCase());

      const matchesSearch =
        searchQuery.trim() === '' ||
        cafe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cafe.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cafe.eligibleDrinks.some((d) => d.name.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesArea && matchesSearch;
    });
  }, [selectedNeighborhood, searchQuery]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-[#244832]">Find Partner Cafes</h1>
        <p className="text-xs text-[#6B5E55]">
          Select any verified specialty coffee roastery across Bengaluru.
        </p>
      </div>

      <div className="space-y-3">
        <Input
          placeholder="Search by cafe name, area or drink (e.g. Cold Smoke)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="flex flex-wrap gap-1.5 pt-1">
          {neighborhoods.map((area) => (
            <button
              key={area}
              onClick={() => setSelectedNeighborhood(area)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                selectedNeighborhood === area
                  ? 'bg-[#244832] text-[#FFFEFA]'
                  : 'bg-[#F5F0E6] text-[#49301F] hover:bg-[#E8E1D5]'
              }`}
            >
              {area}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredCafes.map((cafe) => (
          <Card key={cafe.id} className="hover:border-[#244832] transition-colors">
            <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cafe.coverImage}
                  alt={cafe.name}
                  className="h-20 w-20 rounded-2xl object-cover shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#244832]">
                      {cafe.name}
                    </h3>
                    <Badge variant="gold" className="text-[10px]">★ {cafe.rating}</Badge>
                  </div>
                  <p className="text-xs text-[#B99A61] font-semibold">{cafe.neighborhood}</p>
                  <p className="text-[11px] text-[#6B5E55] line-clamp-1">{cafe.description}</p>
                  <p className="text-[10px] text-[#244832] font-medium">
                    ✓ {cafe.eligibleDrinks.length} drinks valid with your pass
                  </p>
                </div>
              </div>

              <div className="flex w-full sm:w-auto items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#F5F0E6]">
                <Link href={`/app/cafes/${cafe.slug}`} className="flex-1 sm:flex-initial">
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    View Menu
                  </Button>
                </Link>
                <Link href="/app/pass" className="flex-1 sm:flex-initial">
                  <Button variant="primary" size="sm" className="w-full text-xs font-bold">
                    Redeem Pass
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
