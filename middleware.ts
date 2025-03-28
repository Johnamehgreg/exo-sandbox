import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { routes } from './lib/routes';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const { pathname, origin, search } = req.nextUrl;
  // Redirect to login page if the user is not authenticated and trying to access the root page
  if (pathname === '/') {
    const redirectUrl = new URL(routes.auth.login, req.url);
    return NextResponse.redirect(redirectUrl);
  }

  const token = await getToken({ req, secret });
  const isAuthenticated = !!token;
  const isAuthPage = pathname.startsWith('/auth');

  // If the user is authenticated and trying to access an auth page, redirect them
  if (isAuthenticated && isAuthPage) {
    const redirectUrl = new URL(routes.app.dashoard, req.url); // Redirect to dashboard
    return NextResponse.redirect(redirectUrl);
  }

  // If the user is not authenticated and trying to access a protected page, redirect them to login
  if (!isAuthenticated && !isAuthPage) {
    const callbackUrl = encodeURIComponent(`${origin}${pathname}${search}`);
    return NextResponse.redirect(
      new URL(`${routes.auth.login}?callbackUrl=${callbackUrl}`, req.url)
    ); // Redirect to login
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Matcher configuration
export const config = {
  matcher: ['/app/:path*', '/auth/:path*', '/'], // Match all routes under /app and /auth
};
