type EnvType = {
    /**
     * Адрес до сервера API с указанем протокола. Пример: http://localhost:80.
     */
    readonly apiAddress: string;

    /**
     * Адрес до сервера безопасности с указанем протокола. Пример: http://localhost:8080.
     */
    readonly authAddress: string;
}

export default <EnvType>{
    apiAddress: "http://localhost:5012",
    authAddress: "http://localhost:9090"
}
