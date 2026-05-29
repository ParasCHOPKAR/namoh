import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

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
      authorized: ({ token }) => !!token,
    },
    pages: {
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
    "/admin/:path*" 
    // Notice: /checkout is completely REMOVED from this list!
  ],
};