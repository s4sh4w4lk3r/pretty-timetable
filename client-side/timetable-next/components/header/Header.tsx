"use client";
import { Button, HStack, useColorMode, useColorModeValue, Box, Flex, Grid } from "@chakra-ui/react";
import { generalLinks } from "./links";
import { Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { usePathname } from "next/navigation";
export default function Nav() {
    const { toggleColorMode } = useColorMode();
    const modeIcon = useColorModeValue(<MoonIcon />, <SunIcon />);
    const pathname = usePathname();

    const toggleThemeBtn = (
        <Button
            onClick={toggleColorMode}
            justifySelf={"flex-end"}
        >
            {modeIcon}
        </Button>
    );

    const linksElements = generalLinks.map(l => (
        <ChakraLink
            key={l.path}
            href={l.path}
            as={NextLink}
            color={l.path === pathname ? "purple.600" : "white.500"}
        >
            {l.label}
        </ChakraLink>
    ));

    return (
        <HStack
            bgColor="purple.300"
            h={"70px"}
            justifyContent={"center"}
        >
            {linksElements}
            {toggleThemeBtn}
        </HStack>
    );
}
