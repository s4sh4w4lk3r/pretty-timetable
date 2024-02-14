"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";

import theme from "@/configs/chakraTheme";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </SessionProvider>
    );
}
