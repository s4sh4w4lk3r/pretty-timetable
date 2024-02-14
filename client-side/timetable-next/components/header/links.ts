export interface LinkType {
    path: string;
    label: string;
}

export const generalLinks: LinkType[] = [
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

export const loginLink: LinkType = {
    label: "Войти",
    path: "/api/auth/signin",
};

export const logoutLink: LinkType = {
    label: "Выйти",
    path: "/api/auth/signout",
};
