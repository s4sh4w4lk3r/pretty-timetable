"use client";
import { Button } from "@chakra-ui/react";
import React from "react";

export function WeekDayButton({ name, onClick, isActive }: { name: string; onClick: () => void; isActive: boolean }) {
    return (
        <Button
            variant={"ghost"}
            colorScheme={"purple"}
            onClick={onClick}
            isActive={isActive}
        >
            {name}
        </Button>
    );
}
