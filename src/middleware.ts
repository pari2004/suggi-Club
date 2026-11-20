import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('suggi_session')?.value;

  // Public partner route: registration
  if (pathname === '/partner/register') {
    return NextResponse.next();
  }

  // Parse session token payload without full crypto inside edge if needed, or decode base64
  let userRole: string | null = null;
  if (sessionCookie) {
    try {
      const [payloadB64] = sessionCookie.split('.');
      if (payloadB64) {
        const decoded = JSON.parse(
          Buffer.from(payloadB64, 'base64url').toString('utf8')
        );
        if (decoded && decoded.exp && Date.now() / 1000 < decoded.exp) {
          userRole = decoded.role;
        }
      }
    } catch {
      userRole = null;
    }
  }

  const isCustomerRoute = pathname.startsWith('/app');
  const isPartnerRoute = pathname.startsWith('/partner');
  const isAdminRoute = pathname.startsWith('/admin');

  // Customer routes protection
  if (isCustomerRoute) {
    if (!sessionCookie || !userRole) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Partner portal protection
  if (isPartnerRoute) {
    if (!sessionCookie || !userRole) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    const partnerRoles = ['CAFE_OWNER', 'CAFE_MANAGER', 'CAFE_STAFF', 'SUPER_ADMIN'];
    if (!partnerRoles.includes(userRole)) {
      // Forbidden or redirect to unauthorized
      return NextResponse.redirect(new URL('/app', request.url));
    }
  }

  // Admin routes protection
  if (isAdminRoute) {
    if (!sessionCookie || !userRole) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    const adminRoles = ['SUPER_ADMIN', 'OPERATIONS_ADMIN', 'FINANCE_ADMIN'];
    if (!adminRoles.includes(userRole)) {
      return NextResponse.redirect(new URL('/app', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/app/:path*', '/partner/:path*', '/admin/:path*'],
};
