import { NextResponse } from "next/server";
import { authConfig } from "~/server/auth/config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

const REQUIRED_ONBOARDING_VERSION = 1;

export default auth((req) => {
  const isAuth = !!req.auth;
  const onboardingStatus = req.auth?.user?.onboardingStatus;
  const onboardingVersion = req.auth?.user?.onboardingVersion || 0;

  const isDashboard = req.nextUrl.pathname.startsWith("/dashboard");
  const isOnboarding = req.nextUrl.pathname.startsWith("/onboarding");

  // 1. Rediriger vers Sign-in si non authentifié sur Dashboard ou Onboarding
  if ((isDashboard || isOnboarding) && !isAuth) {
    const callbackUrl = encodeURIComponent(req.nextUrl.pathname);
    return NextResponse.redirect(new URL(`/api/auth/signin?callbackUrl=${callbackUrl}`, req.url));
  }

  // 2. Rediriger vers Onboarding si authentifié mais profil incomplet ou version obsolète
  if (isDashboard && isAuth) {
    if (onboardingStatus !== "COMPLETED" || onboardingVersion < REQUIRED_ONBOARDING_VERSION) {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }
  }

  // 3. Rediriger vers Dashboard si déjà Onboardé sur la page /onboarding
  if (isOnboarding && isAuth) {
    if (onboardingStatus === "COMPLETED" && onboardingVersion >= REQUIRED_ONBOARDING_VERSION) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  // Run on dashboard, onboarding, and admin routes
  matcher: ["/dashboard/:path*", "/onboarding/:path*", "/admin/:path*"],
};