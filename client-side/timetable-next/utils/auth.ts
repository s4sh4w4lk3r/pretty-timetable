import { Session } from "next-auth";

export function hasUserRole(session: Session, role: string) {
    return session.roles?.includes(role) ? true : false;
}
