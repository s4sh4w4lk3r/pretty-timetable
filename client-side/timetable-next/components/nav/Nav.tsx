import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function Nav({ children }: { children: ReactNode }) {
    return (
        <Flex
            h="70px"
            bgColor="goldenrod"
            gap="10px"
            justifyContent="center"
            alignItems="center"
        >
            {children}
        </Flex>
    );
}
