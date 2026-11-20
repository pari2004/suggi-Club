'use client';

import React, { useActionState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { registerAction, AuthState } from '@/server/actions/auth';

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState<AuthState, FormData>(
    registerAction,
    {}
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-bold text-[#244832]">Create Your Account</h2>
        <p className="mt-1 text-xs text-[#6B5E55]">
          Join SUGGI CLUB to start discovering and redeeming specialty coffee across Bengaluru.
        </p>
      </div>

      {state?.error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-xs text-red-700 font-medium">
          ⚠️ {state.error}
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <Input
          label="Full Name"
          name="name"
          required
          placeholder="e.g. Rahul Sharma"
        />

        <Input
          label="Email Address"
          type="email"
          name="email"
          required
          placeholder="rahul@example.com"
        />

        <Input
          label="Phone Number"
          type="tel"
          name="phone"
          required
          placeholder="e.g. 9876543210"
          helperText="Used for barista verification and instant pass notifications."
        />

        <Input
          label="Create Password"
          type="password"
          name="password"
          required
          placeholder="••••••••"
          helperText="Minimum 6 characters"
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full font-bold shadow-md"
          isLoading={isPending}
        >
          Create Member Account
        </Button>
      </form>

      <div className="text-center pt-2">
        <p className="text-xs text-[#6B5E55]">
          Already registered?{' '}
          <Link href="/login" className="font-bold text-[#244832] hover:underline">
            Sign In Here
          </Link>
        </p>
      </div>
    </div>
  );
}
