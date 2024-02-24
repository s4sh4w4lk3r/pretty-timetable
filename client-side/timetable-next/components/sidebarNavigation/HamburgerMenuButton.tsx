"use client";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import React from "react";

export default function HamburgerMenuButton({ onClick }: { onClick: () => void }) {
    return (
        <Button
            variant={"ghost"}
            onClick={onClick}
            pos={"fixed"}
            left={2}
            top={2}
            px={3}
        >
            <HamburgerIcon boxSize={6}></HamburgerIcon>
        </Button>
    );
}
