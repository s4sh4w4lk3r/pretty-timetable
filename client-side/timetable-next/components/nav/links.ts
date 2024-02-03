interface LinkType {
    path: string;
    label: string;
}

export const generalLinks: LinkType[] = [
    {
        label: "Расписание",
        path: "/",
    },

    {
        label: "Группы",
        path: "/groups",
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
