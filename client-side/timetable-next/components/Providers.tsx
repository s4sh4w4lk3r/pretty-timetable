"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";

type Props = { children: React.ReactNode };
export default function Providers(props: Props) {
    const { children } = props;
    return (
        <SessionProvider>
            <ChakraProvider>{children}</ChakraProvider>
        </SessionProvider>
    );
}
