import Header from "@/components/header/Header";
import ThemeSwitchButton from "@/components/header/ThemeSwitchButton";
import Sidebar from "@/components/sidebarNavigation/Sidebar";
import { Box, HStack } from "@chakra-ui/react";

export default function PublicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
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
                        right={3}
                    >
                        <ThemeSwitchButton />
                    </Box>
                </HStack>
            </Header>
            <Sidebar />

            <Box
                mt={16}
                ml={16}
                as={"main"}
            >
                {children}
            </Box>
        </>
    );
}
