"use client";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function Nav({ children }: { children?: ReactNode | ReactNode[] }) {
    const headerBgColor = useColorModeValue("whiteAlpha.800", "blackAlpha.700");

    return (
        <Box
            bgColor={headerBgColor}
            h={16}
            justifyContent={"center"}
            as={"header"}
            pos={"fixed"}
            w={"100%"}
            zIndex={"200"}
            backdropFilter="saturate(180%) blur(5px)"
            top={0}
            borderBottomWidth={"2px"}
        >
            {children}
        </Box>
    );
}
