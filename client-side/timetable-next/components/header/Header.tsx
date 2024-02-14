"use client";
import { Button, HStack, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { type LinkType } from "./links";
import { Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { usePathname } from "next/navigation";

export default function Nav({ links }: { links: LinkType[] }) {
    const { toggleColorMode } = useColorMode();
    const modeIcon = useColorModeValue(<MoonIcon />, <SunIcon />);
    const headerBgColor = useColorModeValue("whiteAlpha.800", "blackAlpha.700");

    const pathname = usePathname();

    const toggleThemeBtn = (
        <Button
            onClick={toggleColorMode}
            justifySelf={"flex-end"}
        >
            {modeIcon}
        </Button>
    );

    const linksElements = links.map(l => (
        <ChakraLink
            key={l.path}
            href={l.path}
            as={NextLink}
            color={l.path === pathname ? "purple.500" : ""}
        >
            {l.label}
        </ChakraLink>
    ));

    return (
        <>
            <HStack
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
                {linksElements}
                {toggleThemeBtn}
            </HStack>
        </>
    );
}
// FIXME: сделать навигацию на мобилках в выезжаеющем меню
