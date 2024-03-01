import { Session } from "next-auth";
import { signOut } from "next-auth/react";

export function hasUserRole(session: Session, role: string) {
    return session.roles?.includes(role) ? true : false;
}

export async function federatedLogout() {
    try {
        const response = await fetch("/api/auth/federated-logout", { cache: "no-store" });
        const data = await response.json();
        if (response.ok) {
            await signOut({ redirect: false });
            window.location.href = data.url;
            return;
        }
        throw new Error(data.error);
    } catch (error) {
        console.log(error);
        alert(error);
        await signOut({ redirect: false });
        window.location.href = "/";
    }
}
