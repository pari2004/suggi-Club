import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layouts/navbar';
import { Footer } from '@/components/layouts/footer';
import { Button } from '@/components/ui/button';
import { getSession } from '@/lib/auth';

const FAQS = [
  {
    q: 'How does the digital coffee pass work at the cafe?',
    a: 'When you are at the cafe counter, open your SUGGI CLUB app and tap "Generate QR". A dynamic 90-second single-use token will appear on your screen. The barista scans it using the partner scanner, confirms your eligible drink, and 1 credit is deducted.',
  },
  {
    q: 'Which cafes in Bengaluru are currently participating?',
    a: 'We have launched our pilot with top specialty roasters across Indiranagar, Koramangala, Ulsoor, Church Street, and HSR Layout, including Maverick & Farmer, Araku Coffee, Blue Tokai, Third Wave Coffee, and Paper & Pie.',
  },
  {
    q: 'Can I redeem multiple coffees in a single day?',
    a: 'Standard plans allow up to 2 coffee redemptions per day, while the Premium Club allows up to 3 redemptions per day. This ensures fresh daily consumption and sustainable cafe operations.',
  },
  {
    q: 'What drinks are eligible under the pass?',
    a: 'Each cafe curates a selection of standard specialty drinks (Espresso, Americano, Cappuccino, Flat White, Latte, Cold Brew). Premium Club members also enjoy access to single-origin manual pour-overs, nitro brews, and signature creations.',
  },
  {
    q: 'Will my credit card be automatically charged every month?',
    a: 'No. In alignment with our customer-first transparency principles, SUGGI CLUB does not silently auto-renew your subscription. When your pass expires or credits run out, you will receive a reminder to manually renew if you enjoyed the service.',
  },
  {
    q: 'What happens if a cafe is unable to scan my QR?',
    a: 'Our partner scanner works directly in the mobile browser of any phone or tablet. In the rare event of a network glitch, our in-app member support team can resolve issues immediately or issue a credit adjustment.',
  },
  {
    q: 'Can I get a refund if I do not use all my credits?',
    a: 'If you have not used any credits and request a cancellation within 48 hours of purchase, we offer a 100% full refund. For partially used passes, credits remain valid until your plan expiration date.',
  },
];

export default async function FAQPage() {
  const session = await getSession();

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFEFA]">
      <Navbar user={session} />

      <main className="flex-1 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B99A61]">Answers & Clarity</span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#244832]">
              Frequently Asked Questions
            </h1>
            <p className="text-base text-[#6B5E55] max-w-xl mx-auto">
              Got questions about subscriptions, QR redemptions, or cafe eligibility? Here are the most common questions answered.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl border border-[#E8E1D5] bg-[#FFFFFF] p-6 shadow-xs space-y-2"
              >
                <h3 className="font-serif text-lg font-bold text-[#244832]">{faq.q}</h3>
                <p className="text-sm text-[#49301F] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-[#E8E1D5] bg-[#F5F0E6] p-8 text-center space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#244832]">Still have questions?</h3>
            <p className="text-xs text-[#6B5E55]">
              Our Bengaluru community support team is available everyday from 8:00 AM to 8:00 PM.
            </p>
            <div className="pt-2">
              <Link href="/contact">
                <Button variant="primary" size="md">
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
