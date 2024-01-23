import { useCookies } from "react-cookie";
import TokenPair from "../types/TokenPair";

export default function useToken() : [tokenPair: TokenPair | null, (tokenPair: TokenPair) => void,  () => void ] {
    const [cookie, setCookie, deleteCookie] = useCookies(["tonenPair"]);
    if (cookie.tonenPair)

}