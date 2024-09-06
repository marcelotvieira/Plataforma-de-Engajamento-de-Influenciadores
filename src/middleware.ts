import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from "next-auth/jwt";
import { getSession } from 'next-auth/react';
import getUrl from './lib/get-url';


const SECRET = process.env.NEXTAUTH_SECRET as string;

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('__Secure-authjs.session-token') || req.cookies.get('authjs.session-token')
  const pathname = req.nextUrl.pathname;
  console.log(pathname)
  if (pathname === "/auth" && token) {
    return NextResponse.redirect(new URL(getUrl("/panel/influencers")))
  }

  if (pathname.includes("panel") && !token) {
    return NextResponse.redirect(new URL(getUrl("/auth")))
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/auth',
    '/panel/:path*',
  ],
};