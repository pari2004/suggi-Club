import React from 'react';
import { Navbar } from '@/components/layouts/navbar';
import { Footer } from '@/components/layouts/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getSession } from '@/lib/auth';

export default async function ContactPage() {
  const session = await getSession();

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFEFA]">
      <Navbar user={session} />

      <main className="flex-1 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B99A61]">Reach Out</span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#244832]">
              Contact SUGGI CLUB
            </h1>
            <p className="text-base text-[#6B5E55] max-w-xl mx-auto">
              We&apos;re here to assist subscribers, cafe partners, and specialty coffee enthusiasts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Contact Details */}
            <div className="md:col-span-5 space-y-6">
              <div className="rounded-2xl border border-[#E8E1D5] bg-[#F5F0E6] p-6 space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#244832]">Bengaluru Office</h3>
                <p className="text-xs text-[#49301F] leading-relaxed">
                  SUGGI GLOBAL (OPC) PRIVATE LIMITED<br />
                  Specialty Operations &amp; Cafe Partnerships<br />
                  Indiranagar, Bengaluru, Karnataka 560038, India
                </p>

                <div className="pt-2 border-t border-[#E8E1D5] space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-[#244832]">Support Email:</span>
                    <p className="text-[#6B5E55]">support@club.suggiglobal.com</p>
                  </div>
                  <div>
                    <span className="font-bold text-[#244832]">Partner Desk:</span>
                    <p className="text-[#6B5E55]">partners@club.suggiglobal.com</p>
                  </div>
                  <div>
                    <span className="font-bold text-[#244832]">Website:</span>
                    <p className="text-[#6B5E55]">https://club.suggiglobal.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-7 rounded-2xl border border-[#E8E1D5] bg-[#FFFFFF] p-8 space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#244832]">Send Us a Message</h3>
              <form className="space-y-4">
                <Input label="Your Name" placeholder="e.g. Rahul Sharma" required />
                <Input label="Email Address" type="email" placeholder="rahul@example.com" required />
                <Input label="Subject" placeholder="How can we help?" required />
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#49301F] tracking-wide uppercase">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="flex w-full rounded-lg border border-[#E8E1D5] bg-[#FFFFFF] px-3.5 py-2 text-sm text-[#49301F] placeholder:text-[#A89F91] focus:border-[#244832] focus:outline-none focus:ring-2 focus:ring-[#244832]/20"
                    placeholder="Tell us what you need assistance with..."
                    required
                  />
                </div>
                <Button variant="primary" size="lg" className="w-full">
                  Submit Inquiry
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
