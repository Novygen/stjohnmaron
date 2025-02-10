// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

class State {
  constructor(protected request: NextRequest) {}
  handle(): NextResponse | Promise<NextResponse> {
    throw new Error('Method not implemented.');
  }
}

class LoggedInState extends State {
  handle(): NextResponse | Promise<NextResponse> {
    console.log('LoggedInState');
    const { pathname } = this.request.nextUrl;
    const isAdminRoute = pathname.startsWith('/admin');
    const isAdminExact = pathname === '/admin';
    const isAdminMembers = pathname.includes('/admin/members');
    const isAdminRequests = pathname.includes('/admin/requests');
    const isAdminDashboard = pathname.includes('/admin/dashboard');
    const isAdminAPI = pathname.startsWith('/api/admin');
    const isAdminLogin = pathname.includes('/admin/login');

    if (isAdminRoute) {
      if (isAdminMembers || isAdminRequests || isAdminDashboard || isAdminAPI) {
        return NextResponse.next();
      } else if (isAdminLogin || isAdminExact) {
        return NextResponse.redirect(
          new URL('/admin/dashboard', this.request.url),
        );
      }
      return NextResponse.redirect(new URL('/admin/login', this.request.url));
    }

    return NextResponse.next();
  }
}

class LoggedOutState extends State {
  handle(): NextResponse | Promise<NextResponse> {
    console.log('LoggedOutState');
    const { pathname } = this.request.nextUrl;
    const isAdminRoute = pathname.startsWith('/admin');
    const isAdminAPI = pathname.startsWith('/api/admin');

    if (isAdminRoute || isAdminAPI) {
      return NextResponse.redirect(new URL('/admin/login', this.request.url));
    }

    return NextResponse.next();
  }
}

export async function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.has('user');
  console.log('isLoggedIn: ', isLoggedIn);
  const state = isLoggedIn
    ? new LoggedInState(request)
    : new LoggedOutState(request);
  return state.handle();
}

export const config = {
  matcher: [
    '/admin',
    '/admin/members/:path*',
    '/api/admin/:path*',
    '/admin/requests/:path*',
    '/admin/dashboard/:path*',
  ],
};
