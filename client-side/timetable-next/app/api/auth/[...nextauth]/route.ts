import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import KeycloakProvider from "next-auth/providers/keycloak";

const authConfig: NextAuthOptions = {
    providers: [
        KeycloakProvider({
            clientId: process.env.KEYCLOAK_CLIENT_ID!,
            clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
            issuer: process.env.KEYCLOAK_ISSUER!,
        }),
    ],
    // TODO : добавить роли в сессию
    // TODO : сделать логаут сессии в kc

    callbacks: {
        async session({ session, token }) {
            session.accessToken = token.accessToken as string;
            return session;
        },
        async jwt({ token, account }) {
            if (account && account.access_token) {
                token.accessToken = account.access_token;
            }
            return token;
        },
    },
};

const handler = NextAuth(authConfig);
export { handler as GET, handler as POST };
