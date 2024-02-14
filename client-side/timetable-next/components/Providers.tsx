"use client";

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";

import theme from "@/configs/chakraTheme";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </SessionProvider>
    );
}
