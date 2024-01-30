import type { AuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

export const authConfig: AuthOptions = {
    providers: [
        KeycloakProvider({
            clientId: process.env.KEYCLOAK_CLIENT_ID!,
            clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
            issuer: process.env.KEYCLOAK_ISSUER!,
        }),
    ],

    callbacks: {
        async jwt({ token, account }) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            user.accessToken = token.accessToken;
            user.
            return session;
        },
    },

    session: {
        strategy: "jwt",
    },
};
