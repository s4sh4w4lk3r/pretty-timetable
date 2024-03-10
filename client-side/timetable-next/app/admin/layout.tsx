import AccountButton from "@/components/admin/AccountButton";
import Header from "@/components/header/Header";
import HeaderLink from "@/components/header/HeaderLink";
import ThemeSwitchButton from "@/components/header/ThemeSwitchButton";
import { adminLinks } from "@/components/header/links";
import AuthProvider from "@/utils/AuthProvider";
import { Box, HStack } from "@chakra-ui/react";
import React from "react";

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const adminLinksElement = adminLinks.map(l => (
        <HeaderLink
            key={l.label}
            {...l}
        />
    ));
    return (
        <AuthProvider>
            <Header>
                <HStack
                    h={"full"}
                    justifyContent={"center"}
                    p={5}
                    as={"nav"}
                >
                    {adminLinksElement}
                    <HStack
                        pos={"fixed"}
                        right={3}
                    >
                        <ThemeSwitchButton />
                        <AccountButton />
                    </HStack>
                </HStack>
            </Header>
            <Box
                mt={16}
                as={"main"}
            >
                {children}
            </Box>
        </AuthProvider>
    );
}
