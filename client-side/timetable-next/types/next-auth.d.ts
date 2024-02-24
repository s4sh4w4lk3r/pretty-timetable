import NextAuth from "next-auth";
import { KeycloakProfile } from "next-auth/providers/keycloak";

declare module "next-auth" {
    interface Session {
        accessToken?: string;
        roles?: string[];
    }
}
