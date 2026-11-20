import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { PartnerNav } from '@/components/layouts/partner-nav';

export default async function PartnerPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // Route protection
  if (!session) {
    redirect('/login?callbackUrl=/partner/dashboard');
  }

  const allowedRoles = ['CAFE_OWNER', 'CAFE_MANAGER', 'CAFE_STAFF', 'SUPER_ADMIN'];
  if (!allowedRoles.includes(session.role)) {
    redirect('/app');
  }

  return (
    <div className="min-h-screen bg-[#F5F0E6]/30 text-[#49301F]">
      <PartnerNav user={session} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
