"use client";
import React from "react";
import { LinkType } from "./links";
import Link from "next/link";
import { Text } from "@chakra-ui/react";
import { usePathname } from "next/navigation";

export default function HeaderLink({ label, path }: LinkType) {
    const pathname = usePathname();
    return (
        <Link href={path}>
            <Text
                color={path === pathname ? "purple.500" : ""}
                _hover={{ color: "purple.400" }}
            >
                {label}
            </Text>
        </Link>
    );
}
