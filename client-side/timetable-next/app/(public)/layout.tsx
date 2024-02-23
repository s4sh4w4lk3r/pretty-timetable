import Header from "@/components/header/Header";
import HeaderLink from "@/components/header/HeaderLink";
import ThemeSwitchBtn from "@/components/header/ThemeSwitchBtn";
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
                    <HStack ml={"auto"}>{linksElement}</HStack>
                    <ThemeSwitchBtn />
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
