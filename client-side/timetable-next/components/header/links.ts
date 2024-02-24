export interface LinkType {
    path: string;
    label: string;
}

export const publicLinks: LinkType[] = [
    {
        label: "Главная",
        path: "/",
    },

    {
        label: "Расписание",
        path: "/timetables",
    },

    {
        label: "Расписание звонков",
        path: "/lessontimes",
    },
];

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
