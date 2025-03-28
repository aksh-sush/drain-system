import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname === '/dashboard') {
      return NextResponse.next(); // Don't redirect if already on /dashboard
    }
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  