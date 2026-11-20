import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { AdminNav } from '@/components/layouts/admin-nav';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // Protect admin area
  if (!session) {
    redirect('/login?callbackUrl=/admin');
  }

  const adminRoles = ['SUPER_ADMIN', 'OPERATIONS_ADMIN', 'FINANCE_ADMIN'];
  if (!adminRoles.includes(session.role)) {
    redirect('/app');
  }

  return (
    <div className="min-h-screen bg-[#F5F0E6]/30 flex text-[#49301F]">
      <AdminNav user={session} />
      <main className="flex-1 overflow-y-auto px-6 py-8 lg:px-10 max-w-7xl">
        {children}
      </main>
    </div>
  );
}
