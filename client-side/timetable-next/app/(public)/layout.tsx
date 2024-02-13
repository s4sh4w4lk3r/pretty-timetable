import Header from "@/components/header/Header";
import { Box } from "@chakra-ui/react";

export default function PublicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <Header />

            <Box
                mt={16}
                as={"main"}
            >
                {children}
            </Box>
        </>
    );
}
