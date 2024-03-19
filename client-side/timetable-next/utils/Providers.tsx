"use client";

import { ChakraProvider } from "@chakra-ui/react";

import theme from "@/configs/chakraTheme";
import { TimetableContext, TimetableContextType } from "./client/contexts/TimetableContext";

export default function Providers({ children }: { children: React.ReactNode }) {
    return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}

export function AdminProviders({ children, value }: { children: React.ReactNode; value: TimetableContextType }) {
    return <TimetableContext.Provider value={value}>{children}</TimetableContext.Provider>;
}
