export { default } from "next-auth/middleware";

export const config = {
    // matcher: ["/admin/:path*"],
    matcher: ["/admin/groups", "/admin/rooms", "/admin/subjects", "/admin/teachers", "/admin/timetables"],
    // FIXME: сделать как-нибудь, чтобы /admin пускало всех, а на эндпоинты только админов одним реджексом
};
