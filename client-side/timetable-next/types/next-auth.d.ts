import NextAuth, { JWT } from "next-auth";
import { KeycloakProfile } from "next-auth/providers/keycloak";

declare module "next-auth" {
    interface Session {
        accessToken: string;
        roles?: string[];
        error?: "RefreshAccessTokenError" | any;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        idToken: string;
        accessToken: string;
        refreshToken: string;
        expiresAt: number;
    }
}
