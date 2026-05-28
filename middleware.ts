import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// This is the default configuration for NextAuth middleware
export default withAuth(
  // `withAuth` augments your Request with the user's token.
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Example of Role-Based Access (Optional, but good to have)
    // If a normal user tries to access /admin, redirect them to the homepage
    if (path.startsWith("/admin") && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      // This function determines if the middleware should run.
      // If it returns true, the user is considered "authorized".
      // If it returns false, they are redirected to the signIn page.
      authorized: ({ token }) => !!token,
    },
    pages: {
      // Tells NextAuth where to redirect unauthenticated users
      signIn: "/login",
    },
  }
);

// The 'matcher' array defines exactly which routes should be protected
export const config = {
  matcher: [
    "/profile/:path*",
    "/orders/:path*",
    // "/cart/:path*", <-- Removed! Cart is now public.
    "/wishlist/:path*",
    "/checkout/:path*",
    "/admin/:path*" // If you build an admin dashboard later
  ],
};