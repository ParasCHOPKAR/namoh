import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// This is the default configuration for NextAuth middleware
export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Example of Role-Based Access: Redirect non-admins away from /admin
    if (path.startsWith("/admin") && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      // Returns true if authorized, false if they need to log in
      authorized: ({ token }) => !!token,
    },
    pages: {
      // Tells NextAuth exactly where your custom login page is
      signIn: "/login",
    },
  }
);

// The 'matcher' array defines exactly which routes MUST require a login.
export const config = {
  matcher: [
    "/profile/:path*",
    "/orders/:path*",
    "/wishlist/:path*",
    "/checkout/:path*", // <-- Checkout is protected!
    "/admin/:path*" 
  ],
};