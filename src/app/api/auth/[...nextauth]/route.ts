import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "../../../../generated/prisma";
import { compare } from "bcrypt";

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Cerca l'utente nel database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user) return null;

        // Confronta la password hashata
        const isValid = await compare(credentials.password, user.password);
        if (!isValid) return null;

        // Restituisci i dati utente (senza password)
        return { id: user.id, email: user.email };
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET || "XC6AH/5VF7GPn1oG0m0HRGqEyywWavl6cD3FDsFZOEQ=",
  pages: {
    signIn: "/admin/login"
  }
});

export { handler as GET, handler as POST }; 