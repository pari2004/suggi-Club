import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { CustomerNav } from '@/components/layouts/customer-nav';

export default async function CustomerAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect('/login?callbackUrl=/app');
  }

  return (
    <div className="min-h-screen bg-[#FFFEFA] pb-20 sm:pb-12 text-[#49301F]">
      <CustomerNav user={session} creditsRemaining={7} />
      <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6">{children}</main>
    </div>
  );
}
