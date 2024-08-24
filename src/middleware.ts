import { clerkMiddleware } from "@clerk/nextjs/server";

// Ensure the Clerk publishable key is loaded from the environment variables
const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error(
    "Missing Clerk publishable key. Please add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY to your environment variables."
  );
}

export default clerkMiddleware({
  publishableKey,
});

export const config = {
  matcher: [
    // Exclude sign-in and sign-up routes from Clerk middleware
    "/((?!_next|sign-in|sign-up|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
