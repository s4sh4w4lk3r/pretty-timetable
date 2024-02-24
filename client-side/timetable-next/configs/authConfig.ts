import { NextAuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

const authOptions: NextAuthOptions = {
    providers: [
        KeycloakProvider({
            clientId: process.env.KEYCLOAK_CLIENT_ID!,
            clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
            issuer: process.env.KEYCLOAK_ISSUER!,
        }),
    ],
    // TODO : сделать логаут сессии в kc

    callbacks: {
        async session({ session, token }) {
            session.accessToken = token.accessToken as string;

            if (session.accessToken) {
                const rolesFromToken = JSON.parse(Buffer.from(session.accessToken?.split(".")[1], "base64").toString()).realm_access.roles;
                session.roles = rolesFromToken;
            }

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
export default authOptions;
