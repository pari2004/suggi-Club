'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SupportPage() {
  const [submitted, setSubmitted] = useState(false);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('REDEMPTION');
  const [ticketMessage, setTicketMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-[#244832]">Member Support</h1>
        <p className="text-xs text-[#6B5E55]">
          Have an issue with a QR scan, cafe eligibility, or billing? We respond within 2 hours.
        </p>
      </div>

      {submitted ? (
        <div className="rounded-3xl border border-[#244832]/30 bg-[#244832]/10 p-8 text-center space-y-3">
          <span className="text-4xl">✅</span>
          <h2 className="font-serif text-xl font-bold text-[#244832]">Ticket Created: #SGC-4821</h2>
          <p className="text-xs text-[#6B5E55] max-w-sm mx-auto">
            Our Bengaluru support lead has received your request and will follow up via your registered email shortly.
          </p>
          <div className="pt-2">
            <Button variant="primary" size="sm" onClick={() => setSubmitted(false)}>
              Submit Another Inquiry
            </Button>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl border border-[#E8E1D5] bg-[#FFFFFF] p-6 space-y-6">
          <h2 className="font-serif text-lg font-bold text-[#244832]">Create Support Ticket</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#49301F] tracking-wide uppercase">
                Category
              </label>
              <select
                value={ticketCategory}
                onChange={(e) => setTicketCategory(e.target.value)}
                className="flex h-11 w-full rounded-lg border border-[#E8E1D5] bg-[#FFFFFF] px-3.5 py-2 text-sm text-[#49301F] focus:border-[#244832] focus:outline-none"
              >
                <option value="REDEMPTION">QR Scan / Counter Issue</option>
                <option value="SUBSCRIPTION">Plan Change / Credits Discrepancy</option>
                <option value="PAYMENT">Payment Verification / Refund Request</option>
                <option value="CAFE">Cafe Feedback / Drink Availability</option>
                <option value="OTHER">Other Query</option>
              </select>
            </div>

            <Input
              label="Subject"
              required
              value={ticketSubject}
              onChange={(e) => setTicketSubject(e.target.value)}
              placeholder="e.g. Barista had trouble scanning my QR at Indiranagar"
            />

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#49301F] tracking-wide uppercase">
                Detailed Message
              </label>
              <textarea
                rows={4}
                required
                value={ticketMessage}
                onChange={(e) => setTicketMessage(e.target.value)}
                className="flex w-full rounded-lg border border-[#E8E1D5] bg-[#FFFFFF] px-3.5 py-2 text-sm text-[#49301F] placeholder:text-[#A89F91] focus:border-[#244832] focus:outline-none"
                placeholder="Include the cafe name and time if applicable..."
              />
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full font-bold">
              Submit Ticket
            </Button>
          </form>

          {/* Quick Help Channels */}
          <div className="pt-4 border-t border-[#E8E1D5] space-y-2 text-xs text-[#6B5E55]">
            <p className="font-bold text-[#244832]">Direct Support Channels:</p>
            <p>📧 Email: support@club.suggiglobal.com</p>
            <p>⏱️ Hours: 8:00 AM – 8:00 PM (Everyday)</p>
          </div>
        </div>
      )}
    </div>
  );
}
