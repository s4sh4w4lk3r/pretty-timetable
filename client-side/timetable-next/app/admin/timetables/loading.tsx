import { HStack, Skeleton, StackDivider, VStack } from "@chakra-ui/react";
import React from "react";

export default function LoadingTimetable() {
    const cardSkeleton = (
        <Skeleton
            height={"70px"}
            w={"350px"}
        ></Skeleton>
    );

    const dayOfWeelSkeleton = (
        <Skeleton
            height={"50px"}
            w={"350px"}
        ></Skeleton>
    );
    return (
        <HStack
            divider={<StackDivider />}
            h={"600px"}
            w={"1000px"}
            justifyContent={"space-evenly"}
        >
            <VStack
                h={"full"}
                alignItems={"flex-start"}
                justifyContent={"center"}
                gap={10}
            >
                {dayOfWeelSkeleton}
                {dayOfWeelSkeleton}
                {dayOfWeelSkeleton}
                {dayOfWeelSkeleton}
                {dayOfWeelSkeleton}
            </VStack>

            <VStack
                gap={4}
                w={"500px"}
            >
                {cardSkeleton}
                {cardSkeleton}
                {cardSkeleton}
                {cardSkeleton}
            </VStack>
        </HStack>
    );
}
