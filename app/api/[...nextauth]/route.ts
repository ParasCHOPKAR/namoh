// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/db";
import User from "@/lib/models/User";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "OTP",
      credentials: {
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;
        
        await connectDB();
        // Since verify-otp already checks the OTP, this just finds the user
        const user = await User.findOne({ email: credentials.email });

        // If the user exists, return them to NextAuth
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
        // @ts-ignore - NextAuth User type doesn't include custom 'role' property
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        // @ts-ignore
        (session.user as any).role = token.role;
      }
      return session;
    }
  }, // <--- THIS COMMA WAS MISSING!
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };