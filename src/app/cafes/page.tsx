'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layouts/navbar';
import { Footer } from '@/components/layouts/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { BENGALURU_CAFES, getAllNeighborhoods } from '@/lib/data/cafes';

export default function CafesDirectoryPage() {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const neighborhoods = useMemo(() => ['All', ...getAllNeighborhoods()], []);

  const filteredCafes = useMemo(() => {
    return BENGALURU_CAFES.filter((cafe) => {
      const matchesNeighborhood =
        selectedNeighborhood === 'All' ||
        cafe.neighborhood.toLowerCase().includes(selectedNeighborhood.toLowerCase());

      const matchesSearch =
        searchQuery.trim() === '' ||
        cafe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cafe.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cafe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cafe.eligibleDrinks.some((d) => d.name.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesNeighborhood && matchesSearch;
    });
  }, [selectedNeighborhood, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFEFA]">
      <Navbar />

      <main className="flex-1 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#B99A61]/30 bg-[#F5F0E6] px-3.5 py-1 text-xs font-semibold text-[#244832]">
              📍 Bengaluru Specialty Network
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#244832]">
              Explore Partner Cafes
            </h1>
            <p className="text-base text-[#6B5E55] max-w-2xl">
              Discover approved roasteries and cafes where your SUGGI CLUB credits can be redeemed for freshly brewed specialty coffee.
            </p>
          </div>

          {/* Search & Filters */}
          <div className="space-y-4 pt-2">
            <div className="max-w-md">
              <Input
                placeholder="Search cafes, drinks, or areas (e.g. Indiranagar, Flat White)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Neighborhood Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs font-semibold uppercase text-[#6B5E55] mr-2">Neighborhoods:</span>
              {neighborhoods.map((area) => (
                <button
                  key={area}
                  onClick={() => setSelectedNeighborhood(area)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
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

          {/* Cafe Cards Grid */}
          {filteredCafes.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#E8E1D5] bg-[#F5F0E6]/30 p-12 text-center space-y-3">
              <p className="text-base font-semibold text-[#244832]">No cafes found matching your criteria</p>
              <p className="text-xs text-[#6B5E55]">Try clearing your search query or selecting &apos;All&apos; neighborhoods.</p>
              <button
                onClick={() => {
                  setSelectedNeighborhood('All');
                  setSearchQuery('');
                }}
                className="text-xs font-bold text-[#B99A61] underline cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCafes.map((cafe) => (
                <Link key={cafe.id} href={`/cafes/${cafe.slug}`} className="group block">
                  <Card className="h-full flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div>
                      <div className="relative h-56 w-full overflow-hidden bg-[#F5F0E6]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={cafe.coverImage}
                          alt={cafe.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-3 right-3 flex gap-2">
                          <Badge variant="gold">★ {cafe.rating}</Badge>
                        </div>
                        <div className="absolute bottom-3 left-3">
                          <span className="rounded-md bg-[#244832]/85 backdrop-blur-xs px-2.5 py-1 text-[11px] font-semibold text-[#FFFEFA]">
                            {cafe.neighborhood}
                          </span>
                        </div>
                      </div>

                      <CardContent className="p-6 space-y-3">
                        <h3 className="font-serif text-xl font-bold text-[#244832] group-hover:text-[#49301F] transition-colors">
                          {cafe.name}
                        </h3>
                        <p className="text-xs text-[#6B5E55] line-clamp-2 leading-relaxed">
                          {cafe.description}
                        </p>

                        {/* Amenities preview */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {cafe.amenities.slice(0, 3).map((amenity, idx) => (
                            <span
                              key={idx}
                              className="rounded-md bg-[#F5F0E6] px-2 py-0.5 text-[10px] text-[#49301F]"
                            >
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </div>

                    <div className="p-6 pt-0 border-t border-[#E8E1D5] flex items-center justify-between text-xs text-[#49301F]">
                      <span className="font-medium text-[#244832]">
                        {cafe.eligibleDrinks.length} drinks on pass
                      </span>
                      <span className="font-bold text-[#B99A61] group-hover:underline">
                        View Details &amp; Menu →
                      </span>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
