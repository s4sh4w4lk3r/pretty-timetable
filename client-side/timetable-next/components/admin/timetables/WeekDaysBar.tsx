import { Button, StackDivider, VStack } from "@chakra-ui/react";
import React from "react";

export default function WeekDaysBar() {
    const arr: JSX.Element[] = [];
    for (let index = 0; index < 5; index++) {
        arr.push(
            <Button
                key={index}
                variant={"ghost"}
                colorScheme="purple"
            >
                День {index}
            </Button>
        );
    }
    return <VStack divider={<StackDivider />}> {arr}</VStack>;
}
