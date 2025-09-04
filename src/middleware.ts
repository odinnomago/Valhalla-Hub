import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Paths that don't require authentication
const publicPaths = ['/', '/login', '/onboarding', '/ux-showcase'];

export function middleware(request: NextRequest) {
  // Get the pathname
  const pathname = request.nextUrl.pathname;
  
  // Check if the path is public
  const isPublicPath = publicPaths.includes(pathname);
  
  // Check if user is authenticated (simplified check)
  const isAuthenticated = request.cookies.has('user');
  
  // Redirect root path to dashboard if authenticated
  if (pathname === '/' && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // Redirect root path to onboarding if not authenticated
  if (pathname === '/' && !isAuthenticated) {
    return NextResponse.redirect(new URL('/onboarding', request.url));
  }
  
  // Redirect authenticated users away from public paths (except root)
  if (isAuthenticated && publicPaths.includes(pathname) && pathname !== '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // Redirect unauthenticated users to login for protected paths
  if (!isPublicPath && !isAuthenticated && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Allow access to all other routes
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};