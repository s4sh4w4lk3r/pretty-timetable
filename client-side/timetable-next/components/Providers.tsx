"use client";

import { ApolloProvider } from "@apollo/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";

import apolloClient from "@/configs/apolloClient";
import theme from "@/configs/chakraTheme";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ApolloProvider client={apolloClient}>
                <ChakraProvider theme={theme}>{children}</ChakraProvider>
            </ApolloProvider>
        </SessionProvider>
    );
}
