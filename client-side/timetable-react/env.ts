type Api = {
    readonly restUrl: string;
    readonly graphqlUrl: string;
};

type Auth = {
    readonly address: string;
    readonly realm: string;
    readonly clientId: string;
};

type EnvConfig = {
    readonly api: Api;
    readonly auth: Auth;
};

export default <EnvConfig>{
    api: {
        restUrl: "http://localhost:5012",
        graphqlUrl: "http://localhost:5012/graphql",
    },

    auth: {
        address: "http://localhost:8080",
        clientId: "react",
        realm: "timetable",
    },
};
