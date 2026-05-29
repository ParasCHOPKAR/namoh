// lib/authOptions.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/db";
import User from "@/lib/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "OTP",
      credentials: { email: { label: "Email", type: "email" } },
      async authorize(credentials) {
        if (!credentials?.email) return null;
        await connectDB();
        const user = await User.findOne({ email: credentials.email });
        if (user) {
          return { id: user._id.toString(), email: user.email, name: user.name, role: user.role };
        }
        return null;
      }
    })
  ],
  session: { strategy: "jwt" },
callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Tell TypeScript to treat user as 'any' to bypass the strict check
        token.role = (user as any).role; 
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).role = token.role;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};