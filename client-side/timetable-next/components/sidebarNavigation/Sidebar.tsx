"use client";
import { Box, VStack, useColorModeValue } from "@chakra-ui/react";
import React, { useState } from "react";
import HamburgerMenuButton from "./HamburgerMenuButton";
import SidebarItem from "./SidebarItem";
import { InfoIcon } from "@chakra-ui/icons";

export default function Sidebar() {
    const [isCollapsed, setIsCopplapsed] = useState(true);
    const headerBgColor = useColorModeValue("whiteAlpha.800", "blackAlpha.700");
    const sideBarItems = (
        <SidebarItem
            icon={<InfoIcon color={"purple.500"} />}
            label="Главная"
            path="/da"
            isCollapsed={isCollapsed}
        />
    );
    return (
        <Box
            pos={"fixed"}
            h={"full"}
            w={isCollapsed ? 16 : 64}
            backdropFilter="saturate(180%) blur(5px)"
            bgColor={headerBgColor}
            zIndex={"200"}
            top={0}
            borderRightWidth={"2px"}
        >
            <HamburgerMenuButton
                onClick={() => {
                    setIsCopplapsed(!isCollapsed);
                }}
            />

            <VStack
                mt={14}
                w={"full"}
            >
                {sideBarItems}
            </VStack>
        </Box>
    );
}
