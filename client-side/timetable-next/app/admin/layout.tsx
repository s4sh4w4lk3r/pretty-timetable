import Header from "@/components/header/Header";
import { adminLinks } from "@/components/header/links";
import { Box } from "@chakra-ui/react";
import React from "react";

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <Header links={adminLinks}></Header>
            <Box
                mt={16}
                as={"main"}
            >
                {children}
            </Box>
        </>
    );
}
