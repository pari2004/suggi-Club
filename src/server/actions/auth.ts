'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { db } from '@/lib/db';
import * as schema from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { hashPassword, verifyPassword, setSessionCookie, clearSessionCookie, SessionUser } from '@/lib/auth';
import { UserRole } from '@/lib/auth/permissions';

const RegisterSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid 10-digit phone number'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const LoginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export interface AuthState {
  error?: string;
  success?: boolean;
}

export async function registerAction(prevState: AuthState | null, formData: FormData): Promise<AuthState> {
  const rawData = {
    name: formData.get('name') as string,
    email: (formData.get('email') as string)?.toLowerCase().trim(),
    phone: formData.get('phone') as string,
    password: formData.get('password') as string,
  };

  const parsed = RegisterSchema.safeParse(rawData);
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  const { name, email, phone, password } = parsed.data;

  try {
    const userRole: UserRole = 'CUSTOMER';
    let userId = 'user-' + Math.random().toString(36).substring(2, 9);

    if (db) {
      // Check if user already exists
      const existing = await db.query.users.findFirst({
        where: eq(schema.users.email, email),
      });

      if (existing) {
        return { error: 'An account with this email already exists. Please log in.' };
      }

      const passwordHash = await hashPassword(password);

      const [newUser] = await db
        .insert(schema.users)
        .values({
          name,
          email,
          phone,
          passwordHash,
          isEmailVerified: false,
          isActive: true,
        })
        .returning();

      userId = newUser.id;

      // Assign default CUSTOMER role
      await db.insert(schema.userRoles).values({
        userId: newUser.id,
        role: 'CUSTOMER',
      });
    }

    const sessionUser: SessionUser = {
      id: userId,
      name,
      email,
      role: userRole,
    };

    await setSessionCookie(sessionUser);
  } catch (err: unknown) {
    console.error('Registration error:', err);
    return { error: 'Failed to create account. Please try again.' };
  }

  redirect('/app');
}

export async function loginAction(prevState: AuthState | null, formData: FormData): Promise<AuthState> {
  const rawData = {
    email: (formData.get('email') as string)?.toLowerCase().trim(),
    password: formData.get('password') as string,
  };

  const parsed = LoginSchema.safeParse(rawData);
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  const { email, password } = parsed.data;

  try {
    let sessionUser: SessionUser | null = null;

    if (db) {
      const user = await db.query.users.findFirst({
        where: eq(schema.users.email, email),
        with: {
          roles: true,
        },
      });

      if (!user || !user.passwordHash) {
        return { error: 'Invalid email or password' };
      }

      const isValid = await verifyPassword(password, user.passwordHash);
      if (!isValid) {
        return { error: 'Invalid email or password' };
      }

      const primaryRole = (user.roles?.[0]?.role as UserRole) || 'CUSTOMER';

      // Check if user is staff of any cafe
      const staffRecord = await db.query.cafeStaff.findFirst({
        where: eq(schema.cafeStaff.userId, user.id),
        with: {
          cafe: true,
        },
      });

      sessionUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: primaryRole,
        cafeId: staffRecord?.cafeId || null,
        cafeName: staffRecord?.cafe?.name || null,
        cafeSlug: staffRecord?.cafe?.slug || null,
      };
    } else {
      // Demo fallback when DB is not connected
      if (email.includes('admin')) {
        sessionUser = { id: 'admin-1', name: 'SUGGI Admin', email, role: 'SUPER_ADMIN' };
      } else if (email.includes('partner') || email.includes('maverick') || email.includes('staff')) {
        sessionUser = {
          id: 'partner-1',
          name: 'Ashish (Maverick & Farmer)',
          email,
          role: 'CAFE_OWNER',
          cafeId: 'cafe-1',
          cafeName: 'Maverick & Farmer Coffee',
          cafeSlug: 'maverick-and-farmer',
        };
      } else {
        sessionUser = { id: 'cust-1', name: email.split('@')[0], email, role: 'CUSTOMER' };
      }
    }

    if (!sessionUser) {
      return { error: 'Invalid credentials' };
    }

    await setSessionCookie(sessionUser);

    // Smart redirect based on role
    if (sessionUser.role === 'SUPER_ADMIN' || sessionUser.role === 'OPERATIONS_ADMIN' || sessionUser.role === 'FINANCE_ADMIN') {
      redirect('/admin');
    } else if (sessionUser.role === 'CAFE_OWNER' || sessionUser.role === 'CAFE_MANAGER' || sessionUser.role === 'CAFE_STAFF') {
      redirect('/partner/dashboard');
    } else {
      redirect('/app');
    }
  } catch (err: unknown) {
    // Re-throw redirect error
    if (err instanceof Error && err.message === 'NEXT_REDIRECT') {
      throw err;
    }
    console.error('Login error:', err);
    return { error: 'Authentication failed. Please verify credentials.' };
  }
}

export async function demoLoginAction(role: 'admin' | 'partner' | 'customer') {
  let sessionUser: SessionUser;

  if (role === 'admin') {
    sessionUser = {
      id: 'demo-admin-id',
      name: 'SUGGI Admin',
      email: 'admin@suggiglobal.com',
      role: 'SUPER_ADMIN',
    };
    await setSessionCookie(sessionUser);
    redirect('/admin');
  } else if (role === 'partner') {
    sessionUser = {
      id: 'demo-partner-id',
      name: 'Ashish D (Cafe Owner)',
      email: 'owner@maverickcoffee.com',
      role: 'CAFE_OWNER',
      cafeId: 'cafe-1',
      cafeName: 'Maverick & Farmer Coffee',
      cafeSlug: 'maverick-and-farmer',
    };
    await setSessionCookie(sessionUser);
    redirect('/partner/dashboard');
  } else {
    sessionUser = {
      id: 'demo-customer-id',
      name: 'Rahul Sharma',
      email: 'rahul.customer@gmail.com',
      role: 'CUSTOMER',
    };
    await setSessionCookie(sessionUser);
    redirect('/app');
  }
}

export async function logoutAction() {
  await clearSessionCookie();
  redirect('/login');
}
