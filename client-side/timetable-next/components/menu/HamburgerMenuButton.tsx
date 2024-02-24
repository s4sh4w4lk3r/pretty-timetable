"use client";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import React from "react";

export default function HamburgerMenuButton() {
    return (
        <Button variant={"ghost"}>
            <HamburgerIcon boxSize={6}></HamburgerIcon>
        </Button>
    );
}
