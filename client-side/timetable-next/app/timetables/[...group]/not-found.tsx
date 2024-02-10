import { Center, Text } from "@chakra-ui/react";
import React from "react";

export default function TimetableNotFound() {
    return (
        <Center mt={48}>
            <Text fontSize={["lg", "xl", "2xl", "3xl", "4xl", "6xl"]}>Страница не найдена :(</Text>
        </Center>
    );
}
