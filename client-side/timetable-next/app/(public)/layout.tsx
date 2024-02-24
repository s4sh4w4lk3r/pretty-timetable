import HamburgerMenuButton from "@/components/menu/HamburgerMenuButton";
import Header from "@/components/header/Header";
import HeaderLink from "@/components/header/HeaderLink";
import ThemeSwitchButton from "@/components/header/ThemeSwitchButton";
import { publicLinks } from "@/components/header/links";
import { Box, HStack } from "@chakra-ui/react";

export default function PublicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const linksElement = publicLinks.map(l => (
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
                    <Box
                        pos={"fixed"}
                        left={3}
                    >
                        <HamburgerMenuButton />
                    </Box>

                    <Box
                        pos={"fixed"}
                        right={3}
                    >
                        <ThemeSwitchButton />
                    </Box>
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
