import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Hardcoded for demo/preview as per user request
        if (
          credentials?.username === "admin" &&
          credentials?.password === "sowjanya2024"
        ) {
          return { id: "1", name: "Admin", email: "admin@sowjanyadental.in" };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "sowjanya_secret_123",
});

export { handler as GET, handler as POST };
