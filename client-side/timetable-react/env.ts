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
    readonly api: Api;
    readonly auth: Auth;
}

const baseUrl = import.meta.env.VITE_baseUrl;
export default <EnvConfig>{
    api: {
        restUrl: `${baseUrl}/api`,
        graphqlUrl: `${baseUrl}/api/graphql`,
    },

    auth: {
        address: `${baseUrl}/auth`,
        clientId: "react",
        realm: "timetable",
    },
};
