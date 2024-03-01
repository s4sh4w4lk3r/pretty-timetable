import { NextAuthOptions, TokenSet } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import config from "./config";
import { JWT } from "next-auth/jwt";
import { requestRefreshOfAccessToken } from "@/utils/auth";

const authOptions: NextAuthOptions = {
    providers: [
        KeycloakProvider({
            clientId: config.auth.keycloak.clientId,
            clientSecret: config.auth.keycloak.secret,
            issuer: config.auth.keycloak.issuer,
        }),
    ],
    // TODO : сделать логаут сессии в kc

    session: { maxAge: 60 * 30 },

    callbacks: {
        async session({ session, token }) {
            session.accessToken = token.accessToken as string;

            if (session.accessToken) {
                const rolesFromToken = JSON.parse(Buffer.from(session.accessToken?.split(".")[1], "base64").toString()).realm_access.roles;
                session.roles = rolesFromToken;
                session.expires = new Date(token.expiresAt * 1000).toISOString();
            }

            return session;
        },

        async jwt({ token, account }) {
            if (account) {
                token.idToken = account.id_token!;
                token.accessToken = account.access_token!;
                token.refreshToken = account.refresh_token!;
                token.expiresAt = account.expires_at!;
                return token;
            }

            if (Date.now() < (token.expiresAt as number) * 1000 - 60 * 1000) {
                return token;
            } else {
                try {
                    const response = await requestRefreshOfAccessToken(token);

                    const tokens: TokenSet = await response.json();

                    if (!response.ok) throw tokens;

                    const updatedToken: JWT = {
                        ...token, // Keep the previous token properties
                        idToken: tokens.id_token!,
                        accessToken: tokens.access_token!,
                        expiresAt: Math.floor(Date.now() / 1000 + (tokens.expires_in as number)),
                        refreshToken: tokens.refresh_token ?? token.refreshToken,
                    };
                    return updatedToken;
                } catch (error) {
                    console.error("Error refreshing access token", error);
                    return { ...token, error: "RefreshAccessTokenError" };
                }
            }
        },
    },
};
export default authOptions;
