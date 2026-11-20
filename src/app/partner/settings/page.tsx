'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function PartnerSettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="font-serif text-2xl font-bold text-[#244832]">Cafe Settings &amp; Profile</h1>
        <p className="text-xs text-[#6B5E55]">
          Manage your public cafe profile, location details, and payout banking information.
        </p>
      </div>

      {saved && (
        <div className="rounded-2xl bg-green-50 border border-green-200 p-4 text-xs font-semibold text-green-800 animate-in fade-in">
          ✓ Cafe settings and bank payout details updated successfully.
        </div>
      )}

      <form onSubmit={handleSave} className="rounded-3xl border border-[#E8E1D5] bg-[#FFFFFF] p-6 sm:p-8 space-y-6 shadow-sm">
        {/* Profile Info */}
        <div className="space-y-4">
          <h2 className="font-serif text-lg font-bold text-[#244832] border-b border-[#E8E1D5] pb-2">
            Public Cafe Profile
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Cafe Name" defaultValue="Maverick & Farmer Coffee" required />
            <Input label="Neighborhood" defaultValue="Ulsoor / Halasuru" required />
          </div>
          <Input label="Full Address" defaultValue="82, Gangadhar Chetty Rd, Halasuru, Bengaluru, Karnataka 560042" required />
          <Input label="Opening Hours" defaultValue="8:00 AM – 10:30 PM (Daily)" required />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Contact Phone" defaultValue="+91 98450 12345" required />
            <Input label="Contact Email" defaultValue="owner@maverickcoffee.com" required />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#49301F] tracking-wide uppercase">
              Cafe Description
            </label>
            <textarea
              rows={3}
              defaultValue="Artisanal farm-to-cup roastery overlooking Ulsoor Lake, renowned for revolutionary experimental fermentations like Cold Smoke and Clarified Cappuccino."
              className="flex w-full rounded-lg border border-[#E8E1D5] bg-[#FFFFFF] px-3.5 py-2 text-sm text-[#49301F] focus:border-[#244832] focus:outline-none"
            />
          </div>
        </div>

        {/* Bank Account Details */}
        <div className="space-y-4 pt-4 border-t border-[#E8E1D5]">
          <h2 className="font-serif text-lg font-bold text-[#244832] border-b border-[#E8E1D5] pb-2">
            Bank Settlement Details (Restricted Access)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Account Holder" defaultValue="Maverick And Farmer Coffee Roasters LLP" required />
            <Input label="Bank Name" defaultValue="HDFC Bank" required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Account Number" type="password" defaultValue="50200012345678" required />
            <Input label="IFSC Code" defaultValue="HDFC0000123" required />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit" variant="primary" size="lg" className="font-bold">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
