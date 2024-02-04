import { Card as ChakraCard, Tag, VStack } from "@chakra-ui/react";
import React, { ReactNode } from "react";
type Props = {
    dayOfWeek: string;
    doesHighlight: boolean;
    children: ReactNode[];
};
export default function CardBox(props: Props) {
    const { children, dayOfWeek, doesHighlight } = props;
    return (
        <ChakraCard
            maxH={"750px"}
            maxW={"360px"}
            p={"8px"}
            borderWidth={"2px"}
            borderColor={doesHighlight ? "red.300" : "gray.500"}
        >
            <VStack gap={"10px"}>
                <Tag size="lg">{dayOfWeek}</Tag>
                {children}
            </VStack>
        </ChakraCard>
    );
}
