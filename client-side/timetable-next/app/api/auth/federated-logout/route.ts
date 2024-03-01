import config from "@/configs/config";
import { JWT, getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function logoutParams(token: JWT): Record<string, string> {
    return {
        id_token_hint: token.idToken as string,
        post_logout_redirect_uri: config.auth.next.baseUrl,
    };
}

function handleEmptyToken() {
    const response = { error: "Получен пустой токен." };
    const responseHeaders = { status: 400 };
    return NextResponse.json(response, responseHeaders);
}

function sendEndSessionEndpointToURL(token: JWT) {
    const endSessionEndPoint = new URL(`${config.auth.keycloak.issuer}/protocol/openid-connect/logout`);
    const params: Record<string, string> = logoutParams(token);
    const endSessionParams = new URLSearchParams(params);
    const response = { url: `${endSessionEndPoint.href}/?${endSessionParams}` };
    return NextResponse.json(response);
}

export async function GET(req: NextRequest) {
    try {
        const token = await getToken({ req });
        if (token) {
            return sendEndSessionEndpointToURL(token);
        }
        return handleEmptyToken();
    } catch (error) {
        console.error(error);
        const response = {
            error: "Не получилось завершить сессию.",
        };
        const responseHeaders = {
            status: 500,
        };
        return NextResponse.json(response, responseHeaders);
    }
}
