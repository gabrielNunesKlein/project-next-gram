import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";

import google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const config = {
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
              email: { label: "Email", type: "email" },
              password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
              if (!credentials?.email || !credentials?.password) {
                throw new Error("Preencha todos os campos.");
              }
      
              // Buscar usuário no banco
              const user = await prisma.user.findFirst({
                where: { email: credentials.email },
              });
      
              if (!user || !user.password) {
                throw new Error("Usuário não encontrado.");
              }
      
              // Comparar senha
              const isValid = await compare(String(credentials.password), String(user.password));
              if (!isValid) {
                throw new Error("Senha incorreta.");
              }
      
              return { id: user.id, name: user.name, email: user.email };
            },
          }),
        google],
    callbacks: {
        // authorized({ request, auth }) {
        //     const { pathname } = request.nextUrl

        //     if(pathname === "/middleware"){
        //         return !!auth
        //     }

        //     return true
        // }

        session({ session, token }){
            if(token.sub) session.user.userId = token.sub;
            return session
        }
    },
    // Config para customizar página de login
    pages: {
        signIn: "/signIn"
    }
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config)

interface ProviderWithId {
    id: string;
    name: string;
}

// Acessar os providers
export const providerMap = config.providers.map((provider) => {
    const typedProvider = provider as unknown as ProviderWithId;
    return { 
        id: typedProvider.id,
        name: typedProvider.name
    }
})