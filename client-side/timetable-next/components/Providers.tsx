"use client";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";

const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    uri: process.env.GRAPHQL_URL!,
});

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ApolloProvider client={apolloClient}>
                <ChakraProvider>{children}</ChakraProvider>
            </ApolloProvider>
        </SessionProvider>
    );
}
