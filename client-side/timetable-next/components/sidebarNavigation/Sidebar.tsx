"use client";
import { Box, VStack, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import HamburgerMenuButton from "./HamburgerMenuButton";
import SidebarItem from "./SidebarItem";
import { LinkIcon, StarIcon, TimeIcon, WarningIcon } from "@chakra-ui/icons";
import { usePathname } from "next/navigation";

export default function Sidebar() {
    const [isCollapsed, setIsCopplapsed] = useState(true);
    const headerBgColor = useColorModeValue("whiteAlpha.800", "blackAlpha.700");
    const pathname = usePathname();
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        const handleWindowResize = () => setIsMobile(window.innerWidth < 768);
        handleWindowResize();
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);
    const sideBarItems = items.map(i => (
        <SidebarItem
            key={i.path}
            icon={i.icon}
            label={i.label}
            path={i.path}
            isCollapsed={isCollapsed}
            isActive={i.path === pathname}
            onClick={() => setIsCopplapsed(true)}
        />
    ));
    return (
        <Box
            pos={"fixed"}
            h={"full"}
            w={isCollapsed ? (isMobile ? 0 : 16) : 64}
            backdropFilter="saturate(180%) blur(5px)"
            bgColor={headerBgColor}
            zIndex={"200"}
            top={0}
            borderRightWidth={"2px"}
            as={"aside"}
        >
            <HamburgerMenuButton
                onClick={() => {
                    setIsCopplapsed(!isCollapsed);
                }}
            />

            <VStack
                hidden={isMobile && isCollapsed}
                mt={14}
                alignItems={isCollapsed ? "center" : "stretch"}
                px={2}
                as={"nav"}
            >
                {sideBarItems}
            </VStack>
        </Box>
    );
}

const items = [
    {
        label: "Главная",
        path: "/",
        icon: <StarIcon color={"purple.500"} />,
    },

    {
        label: "Расписание занятий",
        path: "/timetables",
        icon: <LinkIcon color={"purple.500"} />,
    },

    {
        label: "Расписание звонков",
        path: "/lessontimes",
        icon: <TimeIcon color={"purple.500"} />,
    },
    {
        label: "Админка",
        path: "/admin",
        icon: <WarningIcon color={"purple.500"} />,
    },
] satisfies { label: string; path: string; icon: React.JSX.Element }[];
