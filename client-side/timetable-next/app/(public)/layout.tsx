import Header from "@/components/header/Header";
import { generalLinks } from "@/components/header/links";
import { Box } from "@chakra-ui/react";

export default function PublicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <Header links={generalLinks} />

            <Box
                mt={16}
                as={"main"}
            >
                {children}
            </Box>
        </>
    );
}
