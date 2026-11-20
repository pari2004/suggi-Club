'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="font-serif text-2xl font-bold text-[#244832]">Platform Settings</h1>
        <p className="text-xs text-[#6B5E55]">
          Manage global SUGGI CLUB configurations, pilot launch city parameters, and financial defaults.
        </p>
      </div>

      {saved && (
        <div className="rounded-2xl bg-green-50 border border-green-200 p-4 text-xs font-semibold text-green-800 animate-in fade-in">
          ✓ Platform settings saved successfully.
        </div>
      )}

      <form onSubmit={handleSave} className="rounded-3xl border border-[#E8E1D5] bg-[#FFFFFF] p-6 sm:p-8 space-y-6 shadow-sm">
        {/* Brand & Domain */}
        <div className="space-y-4">
          <h2 className="font-serif text-lg font-bold text-[#244832] border-b border-[#E8E1D5] pb-2">
            Brand &amp; Domain Setup
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Platform Name" defaultValue="SUGGI CLUB" required />
            <Input label="Parent Brand" defaultValue="SUGGI GLOBAL" required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="App Domain" defaultValue="https://club.suggiglobal.com" required />
            <Input label="Parent Website" defaultValue="https://suggiglobal.com" required />
          </div>
        </div>

        {/* Launch City */}
        <div className="space-y-4 pt-2 border-t border-[#E8E1D5]">
          <h2 className="font-serif text-lg font-bold text-[#244832] border-b border-[#E8E1D5] pb-2">
            Pilot Location &amp; Launch Configuration
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Launch City" defaultValue="Bengaluru" required />
            <Input label="State" defaultValue="Karnataka" required />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#49301F] uppercase">Active Neighborhoods</label>
            <p className="text-xs text-[#6B5E55]">
              Indiranagar, Koramangala, Ulsoor, Church Street, HSR Layout, Whitefield
            </p>
          </div>
        </div>

        {/* Financial Assumptions */}
        <div className="space-y-4 pt-2 border-t border-[#E8E1D5]">
          <h2 className="font-serif text-lg font-bold text-[#244832] border-b border-[#E8E1D5] pb-2">
            Financial &amp; Payout Defaults
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Standard Cafe Payout Rate (₹)" defaultValue="50.00" required />
            <Input label="Premium Cafe Payout Rate (₹)" defaultValue="80.00" required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Default Daily Redemption Cap" defaultValue="2" required />
            <Input label="QR Token Lifespan (Seconds)" defaultValue="90" required />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit" variant="primary" size="lg" className="font-bold">
            Update Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
