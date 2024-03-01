export interface LinkType {
    path: string;
    label: string;
}

export const adminLinks: LinkType[] = [
    {
        label: "Главная",
        path: "/admin",
    },
    {
        label: "Общая",
        path: "/",
    },
];
