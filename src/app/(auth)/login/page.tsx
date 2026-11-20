'use client';

import React, { useActionState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { loginAction, demoLoginAction, AuthState } from '@/server/actions/auth';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState<AuthState, FormData>(
    loginAction,
    {}
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-bold text-[#244832]">Welcome back</h2>
        <p className="mt-1 text-xs text-[#6B5E55]">
          Sign in to access your digital coffee pass and member credits.
        </p>
      </div>

      {state?.error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-xs text-red-700 font-medium">
          ⚠️ {state.error}
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          name="email"
          required
          placeholder="e.g. rahul@example.com"
        />

        <Input
          label="Password"
          type="password"
          name="password"
          required
          placeholder="••••••••"
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full font-bold"
          isLoading={isPending}
        >
          Sign In
        </Button>
      </form>

      {/* Quick Demo Switcher for Evaluation */}
      <div className="pt-4 border-t border-[#E8E1D5] space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#A89F91] text-center">
          ⚡ Quick Demo Login (One-Click)
        </p>
        <div className="grid grid-cols-3 gap-2">
          <form action={() => demoLoginAction('customer')}>
            <button
              type="submit"
              className="w-full rounded-md border border-[#244832]/20 bg-[#F5F0E6] py-1.5 text-[11px] font-medium text-[#244832] hover:bg-[#244832] hover:text-[#FFFEFA] transition-colors cursor-pointer"
            >
              Customer
            </button>
          </form>
          <form action={() => demoLoginAction('partner')}>
            <button
              type="submit"
              className="w-full rounded-md border border-[#B99A61]/30 bg-[#F5F0E6] py-1.5 text-[11px] font-medium text-[#B99A61] hover:bg-[#B99A61] hover:text-[#244832] transition-colors cursor-pointer"
            >
              Cafe Staff
            </button>
          </form>
          <form action={() => demoLoginAction('admin')}>
            <button
              type="submit"
              className="w-full rounded-md border border-[#49301F]/20 bg-[#F5F0E6] py-1.5 text-[11px] font-medium text-[#49301F] hover:bg-[#49301F] hover:text-[#F5F0E6] transition-colors cursor-pointer"
            >
              Admin
            </button>
          </form>
        </div>
      </div>

      <div className="text-center pt-2">
        <p className="text-xs text-[#6B5E55]">
          Don&apos;t have a pass yet?{' '}
          <Link href="/register" className="font-bold text-[#244832] hover:underline">
            Register as Customer
          </Link>
        </p>
        <p className="mt-2 text-xs text-[#A89F91]">
          Are you a cafe owner?{' '}
          <Link href="/partner/register" className="font-semibold text-[#B99A61] hover:underline">
            Apply as Cafe Partner
          </Link>
        </p>
      </div>
    </div>
  );
}
