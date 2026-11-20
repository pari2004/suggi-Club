'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import QRCode from 'qrcode';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { generateRedemptionToken } from '@/lib/redemption/engine';

export default function DigitalCoffeePassPage() {
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(90);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Generate new token and render QR
  const fetchNewToken = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await generateRedemptionToken({
        userId: 'demo-customer-id',
        subscriptionId: 'demo-subscription-id',
        ttlSeconds: 90,
      });

      if (!res.success || !res.data) {
        setError(res.error || 'Failed to generate token');
        setIsLoading(false);
        return;
      }

      setTimeLeft(res.data.expiresInSeconds);

      // Generate QR Code image data URL
      const dataUrl = await QRCode.toDataURL(res.data.token, {
        width: 320,
        margin: 2,
        color: {
          dark: '#244832', // Forest green
          light: '#FFFEFA', // Off-white
        },
      });

      setQrDataUrl(dataUrl);
    } catch (err: unknown) {
      console.error('QR generation error:', err);
      setError('Unable to render QR pass. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial token load
  useEffect(() => {
    fetchNewToken();
  }, [fetchNewToken]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const isExpired = timeLeft === 0;

  return (
    <div className="mx-auto max-w-md space-y-6 text-center">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#B99A61]">
          INSTANT COUNTER REDEMPTION
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#244832]">
          Digital Coffee Pass
        </h1>
        <p className="mt-1 text-xs text-[#6B5E55]">
          Present this dynamic QR code to the barista at the counter.
        </p>
      </div>

      {/* Main Pass Container */}
      <div className="rounded-3xl border border-[#B99A61]/40 bg-[#FFFFFF] p-6 shadow-xl space-y-5">
        <div className="flex items-center justify-between border-b border-[#E8E1D5] pb-3 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-[#244832]">
            <span>☕</span>
            <span>7 Credits Available</span>
          </div>
          <Badge variant={isExpired ? 'destructive' : 'success'}>
            {isExpired ? 'Expired' : `${timeLeft}s Remaining`}
          </Badge>
        </div>

        {/* QR Display Area */}
        <div className="relative mx-auto flex h-72 w-72 items-center justify-center rounded-2xl border-2 border-dashed border-[#B99A61]/30 bg-[#FFFEFA] p-3 overflow-hidden">
          {isLoading ? (
            <div className="space-y-3 text-center">
              <div className="h-10 w-10 mx-auto animate-spin rounded-full border-4 border-[#244832] border-t-transparent" />
              <p className="text-xs text-[#6B5E55]">Generating secure token...</p>
            </div>
          ) : error ? (
            <div className="space-y-3 p-4 text-center">
              <span className="text-3xl">⚠️</span>
              <p className="text-xs font-semibold text-red-600">{error}</p>
              <Button variant="primary" size="sm" onClick={fetchNewToken}>
                Retry
              </Button>
            </div>
          ) : qrDataUrl ? (
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qrDataUrl}
                alt="SUGGI CLUB Redemption QR"
                className={`h-64 w-64 object-contain transition-opacity duration-300 ${
                  isExpired ? 'opacity-20 blur-xs' : 'opacity-100'
                }`}
              />

              {isExpired && (
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 bg-[#FFFEFA]/80 p-4">
                  <span className="text-2xl">⏳</span>
                  <p className="text-xs font-bold text-[#244832]">Pass Expired for Security</p>
                  <p className="text-[10px] text-[#6B5E55]">
                    Tokens refresh automatically to protect your credits.
                  </p>
                  <Button variant="primary" size="sm" onClick={fetchNewToken}>
                    Generate New QR
                  </Button>
                </div>
              )}
            </div>
          ) : null}
        </div>

        {/* Dynamic Countdown Bar */}
        {!isExpired && !isLoading && !error && (
          <div className="space-y-1.5">
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#F5F0E6]">
              <div
                className="h-full bg-[#244832] transition-all duration-1000 ease-linear"
                style={{ width: `${(timeLeft / 90) * 100}%` }}
              />
            </div>
            <p className="text-[10px] text-[#A89F91]">
              Single-use cryptographic token · Refreshes every 90 seconds
            </p>
          </div>
        )}

        {/* Barista Instructions */}
        <div className="rounded-xl bg-[#F5F0E6] p-3 text-left text-xs text-[#49301F] space-y-1">
          <p className="font-semibold text-[#244832]">Instructions for Barista:</p>
          <ol className="list-decimal list-inside space-y-0.5 text-[11px] text-[#6B5E55]">
            <li>Open the SUGGI Partner Scanner on your device</li>
            <li>Scan this customer pass</li>
            <li>Select the prepared eligible drink to deduct 1 credit</li>
          </ol>
        </div>

        {/* Refresh Pass Button */}
        <div>
          <Button
            variant="outline"
            size="md"
            className="w-full text-xs"
            onClick={fetchNewToken}
            disabled={isLoading}
          >
            🔄 Refresh QR Pass Now
          </Button>
        </div>
      </div>

      <div className="text-center">
        <Link href="/app" className="text-xs font-semibold text-[#244832] hover:underline">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
