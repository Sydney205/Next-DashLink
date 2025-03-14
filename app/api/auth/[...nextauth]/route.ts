import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "@/models/User"; 
import { connectDB } from "@/lib/db";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({ email: credentials?.email }).select("+password");

        if (!user || !(await bcrypt.compare(credentials?.password, user.password))) {
          throw new Error("Invalid credentials");
        }

        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      await connectDB();

      // Check if the user already exists
      let existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        // Create new user in the database
        existingUser = new User({
          name: user.name,
          email: user.email,
          image: user.image,  // Store Google/GitHub profile picture
          provider: account?.provider, // Store the provider (Google/GitHub)
        });

        await existingUser.save();
      }

      return true; // Allow sign-in
    },
    async session({ session }) {
      await connectDB();

      const dbUser = await User.findOne({ email: session.user.email });

      if (dbUser) {
        session.user.id = dbUser._id;
        session.user.image = dbUser.image;
        session.user.provider = dbUser.provider;
      }

      return session;
    },
    async redirect({ url }) {
      const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
      return `${baseUrl}/dashboard/home`; // Redirect user to the dashboard
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
export const GET = handler;
export const POST = handler;
