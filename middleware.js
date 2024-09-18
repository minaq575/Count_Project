// src/middleware.js
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  // Define protected paths
  const protectedPaths = ['/count', '/faculty', '/round'];
  
  // Check if the path is protected and if the user is not authenticated
  const isProtectedPath = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path));

  if (isProtectedPath && !token) {
    // Redirect to login if not authenticated
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/count', '/faculty', '/round', '/report'], // Specify paths for middleware
};