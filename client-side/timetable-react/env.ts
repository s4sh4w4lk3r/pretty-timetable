interface Api {
    readonly restUrl: string;
    readonly graphqlUrl: string;
}

interface Auth {
    readonly address: string;
    readonly realm: string;
    readonly clientId: string;
}

interface EnvConfig {
    readonly baseUrl: string;
    readonly api: Api;
    readonly auth: Auth;
}

export default <EnvConfig>{
    baseUrl: import.meta.env.VITE_baseUrl,

    api: {
        restUrl: `${import.meta.env.VITE_baseUrl}/api`,
        graphqlUrl: `${import.meta.env.VITE_baseUrl}/api/graphql`,
    },

    auth: {
        address: `${import.meta.env.VITE_baseUrl}/auth`,
        clientId: "react",
        realm: "timetable",
    },
};
