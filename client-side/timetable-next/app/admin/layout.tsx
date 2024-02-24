import LoginButton from "@/components/admin/LoginButtonHeader";
import Header from "@/components/header/Header";
import HeaderLink from "@/components/header/HeaderLink";
import ThemeSwitchButton from "@/components/header/ThemeSwitchButton";
import { adminLinks } from "@/components/header/links";
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
        <>
            <Header>
                <HStack
                    h={"full"}
                    justifyContent={"center"}
                    p={5}
                >
                    {adminLinksElement}
                    <HStack
                        pos={"fixed"}
                        right={3}
                    >
                        <ThemeSwitchButton />
                        <LoginButton />
                    </HStack>
                </HStack>
            </Header>
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
