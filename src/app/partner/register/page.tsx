'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function PartnerRegisterPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F5F0E6]/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block">
            <span className="font-serif text-3xl font-bold tracking-tight text-[#244832]">
              SUGGI<span className="text-[#B99A61]"> CLUB</span>
            </span>
          </Link>
          <h1 className="font-serif text-3xl font-bold text-[#244832]">
            Partner Cafe Registration
          </h1>
          <p className="text-xs sm:text-sm text-[#6B5E55] max-w-md mx-auto">
            Join Bengaluru&apos;s curated specialty network. Attract regular coffee lovers and receive guaranteed weekly payouts.
          </p>
        </div>

        {submitted ? (
          <div className="rounded-3xl border border-[#244832]/30 bg-[#FFFFFF] p-8 sm:p-12 text-center space-y-4 shadow-lg">
            <span className="text-5xl block">🎉</span>
            <h2 className="font-serif text-2xl font-bold text-[#244832]">
              Application Submitted: PENDING_REVIEW
            </h2>
            <p className="text-xs sm:text-sm text-[#6B5E55] max-w-md mx-auto leading-relaxed">
              Thank you for applying to partner with SUGGI CLUB! Our Bengaluru partnerships team will review your coffee roastery credentials, schedule a brief tasting inspection, and activate your cafe portal within 24–48 hours.
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <Link href="/">
                <Button variant="outline" size="md">
                  Return to Homepage
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="primary" size="md">
                  Staff Login
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-[#E8E1D5] bg-[#FFFFFF] p-6 sm:p-10 shadow-lg space-y-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 1. Cafe Identity */}
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#244832] border-b border-[#E8E1D5] pb-2">
                  1. Cafe Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Cafe / Roastery Name" required placeholder="e.g. Copper Hill Coffee Roasters" />
                  <Input label="Neighborhood" required placeholder="e.g. Indiranagar, 12th Main" />
                </div>
                <Input label="Full Cafe Street Address" required placeholder="Shop 4, Ground Floor, 80 Feet Road, Bengaluru" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="City" defaultValue="Bengaluru" required readOnly />
                  <Input label="PIN / Postal Code" required placeholder="560038" />
                </div>
                <Input label="Opening Hours" required placeholder="e.g. 8:00 AM – 10:30 PM (Daily)" />
              </div>

              {/* 2. Business & Contact */}
              <div className="space-y-4 pt-2">
                <h3 className="font-serif text-lg font-bold text-[#244832] border-b border-[#E8E1D5] pb-2">
                  2. Owner &amp; Business Credentials
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Owner / Authorized Manager Name" required placeholder="e.g. Ashish D" />
                  <Input label="Contact Phone Number" type="tel" required placeholder="+91 98450 12345" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Business Email" type="email" required placeholder="partners@yourcafe.com" />
                  <Input label="FSSAI Registration Number" required placeholder="14-digit FSSAI number" />
                </div>
                <Input label="GSTIN (Optional / Where Applicable)" placeholder="29AAAAA0000A1Z5" />
              </div>

              {/* 3. Payout Bank Details */}
              <div className="space-y-4 pt-2">
                <h3 className="font-serif text-lg font-bold text-[#244832] border-b border-[#E8E1D5] pb-2">
                  3. Weekly Payout Bank Account
                </h3>
                <p className="text-xs text-[#6B5E55]">
                  All coffee redemptions are reconciled weekly and deposited directly into this account.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Bank Account Holder Name" required placeholder="Your Business Legal Name" />
                  <Input label="Bank Name" required placeholder="e.g. HDFC Bank, ICICI Bank" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Account Number" type="password" required placeholder="Bank Account Number" />
                  <Input label="IFSC Code" required placeholder="e.g. HDFC0000123" />
                </div>
              </div>

              {/* 4. Agreement */}
              <div className="space-y-3 pt-2">
                <label className="flex items-start gap-2 text-xs text-[#49301F] cursor-pointer">
                  <input type="checkbox" required className="mt-0.5 rounded text-[#244832]" />
                  <span>
                    I confirm that our cafe serves 100% specialty grade Arabica beans and agree to the{' '}
                    <Link href="/terms" className="font-bold text-[#244832] underline">
                      SUGGI CLUB Partner Commercial Terms
                    </Link>{' '}
                    and weekly payout schedule.
                  </span>
                </label>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full font-bold shadow-md"
                isLoading={isSubmitting}
              >
                Submit Cafe Partner Application
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
