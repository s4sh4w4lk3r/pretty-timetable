import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { useSession } from "next-auth/react";

export default function Home() {
    getToken({});
    const { accessToken } = data;

    return <></>;
}
