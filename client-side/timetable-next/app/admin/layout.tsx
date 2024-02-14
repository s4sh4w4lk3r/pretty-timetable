import Header from "@/components/header/Header";
import { Box } from "@chakra-ui/react";
import React from "react";

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <Header links={[]}></Header>
            <Box
                mt={16}
                as={"main"}
            >
                {children}
            </Box>
        </>
    );
}

// TODO: попробовать сделать переиспользуемые адмнинские компоненеты.
