import { extendTheme, type ThemeConfig, type Theme } from "@chakra-ui/react";

const config: ThemeConfig = {
    initialColorMode: "system",
    useSystemColorMode: true,
};

const theme = extendTheme(<Theme>{
    config: config,
});

export default theme;
