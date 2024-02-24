import { Button } from "@chakra-ui/react";
import Link from "next/link";
import React, { ReactElement, ReactNode } from "react";

export default function SidebarItem({ icon, label, path, isCollapsed }: { icon: ReactNode; label: string; path: string; isCollapsed: boolean }) {
    const collapsedButton = <Button variant={"ghost"}>{icon}</Button>;
    const notCollapsedButton = (
        <Button
            leftIcon={icon as ReactElement}
            variant={"ghost"}
            w={"full"}
            justifyContent={"flex-start"}
        >
            {label}
        </Button>
    );

    return <Link href={path}>{isCollapsed ? collapsedButton : notCollapsedButton}</Link>;
}
