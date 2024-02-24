"use client";
import { Button, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import React, { ReactElement, ReactNode } from "react";

type Props = {
    icon: ReactNode;
    label: string;
    path: string;
    isCollapsed: boolean;
    isActive: boolean;
    onClick: () => void;
};
export default function SidebarItem({ icon, label, path, isCollapsed, isActive, onClick }: Props) {
    const activeBgColor = useColorModeValue("purple.100", "purple.200");
    const bgColor = isActive ? activeBgColor : "";

    const collapsedButton = (
        <Button
            variant={"ghost"}
            bgColor={bgColor}
        >
            {icon}
        </Button>
    );
    const notCollapsedButton = (
        <Button
            leftIcon={icon as ReactElement}
            variant={"ghost"}
            w={"full"}
            justifyContent={"flex-start"}
            bgColor={bgColor}
            onClick={onClick}
        >
            {label}
        </Button>
    );

    return <Link href={path}>{isCollapsed ? collapsedButton : notCollapsedButton}</Link>;
}
