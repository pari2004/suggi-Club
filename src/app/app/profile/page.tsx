'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { logoutAction } from '@/server/actions/auth';

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-[#244832]">Member Profile</h1>
        <p className="text-xs text-[#6B5E55]">
          Manage your account information and preferences.
        </p>
      </div>

      {/* Profile Card */}
      <div className="rounded-3xl border border-[#E8E1D5] bg-[#FFFFFF] p-6 space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-[#244832] text-[#FFFEFA] font-serif text-2xl font-bold flex items-center justify-center border-2 border-[#B99A61]">
            R
          </div>
          <div>
            <h2 className="font-serif text-xl font-bold text-[#244832]">Rahul Sharma</h2>
            <p className="text-xs text-[#6B5E55]">rahul.customer@gmail.com</p>
            <span className="inline-block rounded-full bg-[#B99A61]/15 px-2.5 py-0.5 text-[10px] font-bold text-[#9A7E4A] mt-1">
              Active Member · Bengaluru
            </span>
          </div>
        </div>

        <div className="border-t border-[#E8E1D5] pt-4 space-y-3 text-xs text-[#49301F]">
          <div className="flex justify-between py-1.5 border-b border-[#F5F0E6]">
            <span className="text-[#6B5E55]">Phone:</span>
            <span className="font-semibold">+91 99887 76655</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-[#F5F0E6]">
            <span className="text-[#6B5E55]">City:</span>
            <span className="font-semibold">Bengaluru, Karnataka</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-[#F5F0E6]">
            <span className="text-[#6B5E55]">Current Plan:</span>
            <span className="font-semibold text-[#244832]">Coffee 10 (7 credits remaining)</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-[#F5F0E6]">
            <span className="text-[#6B5E55]">Member Since:</span>
            <span className="font-semibold">November 2026</span>
          </div>
        </div>

        {/* Preferences */}
        <div className="pt-2">
          <h3 className="font-serif text-sm font-bold text-[#244832] mb-2">Notification Preferences</h3>
          <div className="space-y-2 text-xs text-[#49301F]">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded text-[#244832]" />
              <span>Pass expiry and renewal alerts</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded text-[#244832]" />
              <span>New partner cafe announcements in Bengaluru</span>
            </label>
          </div>
        </div>

        {/* Sign Out Button */}
        <div className="pt-4 border-t border-[#E8E1D5]">
          <form action={logoutAction}>
            <Button variant="outline" size="md" className="w-full text-red-600 border-red-200 hover:bg-red-50">
              Sign Out of SUGGI CLUB
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
