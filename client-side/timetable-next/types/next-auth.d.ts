import NextAuth from "next-auth";
import { KeycloakProfile } from "next-auth/providers/keycloak";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        accessToken: string;
    }
}
