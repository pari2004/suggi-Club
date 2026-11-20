import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function OfflineFallbackPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFEFA] p-6 text-center text-[#49301F] space-y-5">
      <div className="h-20 w-20 rounded-full bg-[#F5F0E6] flex items-center justify-center text-4xl shadow-xs">
        ☕
      </div>

      <div className="space-y-2 max-w-sm">
        <h1 className="font-serif text-2xl font-bold text-[#244832]">You are Currently Offline</h1>
        <p className="text-xs text-[#6B5E55] leading-relaxed">
          SUGGI CLUB requires an active internet connection to securely generate single-use QR tokens and process coffee redemptions.
        </p>
      </div>

      <div className="pt-2">
        <Link href="/app">
          <Button variant="primary" size="md">
            Check Connection &amp; Retry
          </Button>
        </Link>
      </div>
    </div>
  );
}
