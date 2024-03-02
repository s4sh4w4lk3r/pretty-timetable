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
        label: "Кабинеты",
        path: "/admin/rooms",
    },
    {
        label: "Преподы",
        path: "/admin/teachers",
    },
    {
        label: "Предметы",
        path: "/admin/subjects",
    },
    {
        label: "Расписание",
        path: "/admin/timetables",
    },
];
