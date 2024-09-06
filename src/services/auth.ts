import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "./prisma"
import bcrypt from "bcrypt"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        senha: { label: "Senha", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const { email, senha } = credentials as { email: string; senha: string };
          const user = await prisma.user.findUnique({ where: { email } });
          if (!user || !(await bcrypt.compare(senha, user.senha))) return null

          // mock delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          return user
        } catch (e) {
          throw new Error((e as Error).message)
        }
      },
    }),
  ],
  trustHost: true,
  pages: {
    signIn: '/auth',
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
})