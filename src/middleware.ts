import { NextResponse } from "next/server";
import { authConfig } from "~/server/auth/config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isAuth = !!req.auth;
  // Specific protection for Dashboard
  const isProtected = req.nextUrl.pathname.startsWith("/dashboard");

  if (isProtected && !isAuth) {
    const callbackUrl = encodeURIComponent(req.nextUrl.pathname);
    return NextResponse.redirect(new URL(`/api/auth/signin?callbackUrl=${callbackUrl}`, req.url));
  }

  return NextResponse.next();
});

export const config = {
  // Only run on dashboard routes
  matcher: ["/dashboard/:path*"],
};