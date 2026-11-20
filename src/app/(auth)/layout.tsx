import React from 'react';
import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col justify-center bg-[#F5F0E6]/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <Link href="/" className="inline-block">
          <span className="font-serif text-3xl font-bold tracking-tight text-[#244832]">
            SUGGI<span className="text-[#B99A61]"> CLUB</span>
          </span>
        </Link>
        <p className="mt-1 text-xs uppercase tracking-widest text-[#6B5E55]">
          Specialty Coffee Subscription · Bengaluru
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#FFFFFF] py-8 px-6 shadow-xl border border-[#E8E1D5] rounded-3xl sm:px-10">
          {children}
        </div>
      </div>
    </div>
  );
}
