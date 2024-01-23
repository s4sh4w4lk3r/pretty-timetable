import { useRef } from "react";
import Keycloak from "keycloak-js";
import env from "../../env";
import { useCookies } from "react-cookie";

export default function useAuth() {
    const { address, clientId, realm } = env.auth;
    const kc = useRef(new Keycloak({ clientId: clientId, realm: realm, url: address }));
}
