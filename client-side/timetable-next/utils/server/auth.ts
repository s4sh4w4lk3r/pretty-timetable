import config from "@/configs/config";
import { JWT } from "next-auth/jwt";
import "server-only";

export function requestRefreshOfAccessToken(token: JWT) {
    return fetch(`${config.auth.keycloak.issuer}/protocol/openid-connect/token`, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            client_id: config.auth.keycloak.clientId,
            client_secret: config.auth.keycloak.secret,
            grant_type: "refresh_token",
            refresh_token: token.refreshToken as string,
        }),
        method: "POST",
        cache: "no-store",
    });
}
