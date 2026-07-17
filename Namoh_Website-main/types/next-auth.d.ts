import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

// 1. Extend the built-in session/user types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string; // Add your custom role here
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: string;
  }
}

// 2. Extend the built-in JWT types
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}   