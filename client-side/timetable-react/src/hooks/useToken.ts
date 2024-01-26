import { useState } from "react";
import TokenPair from "../types/TokenPair";
import Cookies from "js-cookie";
import env from "../../env";
export default function useToken(): [tokenPair: TokenPair | null, (tokenPair: TokenPair) => void, () => void] {
    const [tokenPair, setTokenPair] = useState<TokenPair | null>(getCookies());

    function setToken(tokenPairArg: TokenPair) {
        const { accessExpiresIn, refreshExpiresIn, isHttps } = env.auth.cookie;

        Cookies.set(TokenDef.AccessToken, tokenPairArg.access, { expires: accessExpiresIn, secure: isHttps });
        Cookies.set(TokenDef.RefreshToken, tokenPairArg.refresh, { expires: refreshExpiresIn, secure: isHttps });
        setTokenPair(tokenPair);
    }

    function deleteToken() {
        Cookies.remove(TokenDef.AccessToken);
        Cookies.remove(TokenDef.RefreshToken);
        setTokenPair(null);
    }

    return [tokenPair, setToken, deleteToken];
}

function getCookies() {
    const cookies = Cookies.get();
    const accessTokenStr = cookies[TokenDef.AccessToken];
    const refreshTokenStr = cookies[TokenDef.RefreshToken];

    if (accessTokenStr && refreshTokenStr) {
        return { access: accessTokenStr, refresh: refreshTokenStr };
    }

    return null;
}

enum TokenDef {
    AccessToken = "accessToken",
    RefreshToken = "refreshToken",
}
