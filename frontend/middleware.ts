import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { OnboardingRoutes, PublicRoutes } from "./route";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(PublicRoutes);
const isOnboardingRoute = createRouteMatcher(OnboardingRoutes);

export default clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl;
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", pathname);

  const { userId, sessionClaims, redirectToSignIn } = await auth();

  const isPublic = isPublicRoute(req);
  const isOnboarding = isOnboardingRoute(req);
  const isOnboardingComplete = sessionClaims?.metadata.onboardingComplete;

  if (isOnboarding && !userId) {
    // Handle onboarding route logic
    return redirectToSignIn();
  }

  if (isOnboarding && isOnboardingComplete) {
    // Redirect to home if onboarding is complete
    return NextResponse.redirect(new URL("/home", req.url));
  }

  if (!userId && !isPublic) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  if (!isPublic && !isOnboarding && !isOnboardingComplete) {
    // Redirect to onboarding if not complete
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
