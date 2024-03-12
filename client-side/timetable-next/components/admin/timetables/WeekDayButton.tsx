"use client";
import { Button } from "@chakra-ui/react";
import React from "react";

export function WeekDayButton({ name, onClick }: { name: string; onClick: () => void }) {
    return (
        <Button
            variant={"ghost"}
            colorScheme={"purple"}
            onClick={onClick}
        >
            {name}
        </Button>
    );
}
