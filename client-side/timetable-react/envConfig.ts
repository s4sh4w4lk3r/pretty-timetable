type Api = {
    readonly address: string
}

type Auth = {
    readonly address: string,
    readonly realm: string,
    readonly clientId: string
}

type EnvConfig = {
    readonly api: Api,
    readonly auth: Auth
}

export default <EnvConfig>{
    api: {
        address: "http://localhost:5012"
    },

    auth: {
        address: "http://localhost:8080",
        clientId: "react",
        realm: "timetable"
    }
}