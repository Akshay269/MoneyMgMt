// root-proxy: proxy.ts (or proxy.js)
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// define protected routes
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/account(.*)",
  "/transaction(.*)",
]);

// Export the Clerk-wrapped proxy handler
export default clerkMiddleware(async (auth, req) => {
  // auth is a helper supplied by Clerk
  // Use the matcher by passing `req` so it can inspect the request path
  if (isProtectedRoute(req)) {
    // If the route is protected, ensure the user is authenticated.
    // `auth.protect()` will redirect to sign in if not signed in.
    await auth.protect();
  }

  // If not a protected route, do nothing (allow request to continue)
  return;
});

// same matcher you already used — keeps proxy running only where needed
export const config = {
  matcher: [
    // Skip Next internals & static assets (same as your original)
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
