import React from "react";
import { Card, SimpleGrid, Skeleton, Stack } from "@chakra-ui/react";

export default function CardBoxesSkeleton() {
    const skeleton = (
        <Card width={"320px"}>
            <Stack>
                <Skeleton height={"70px"}></Skeleton>
                <Skeleton height={"70px"}></Skeleton>
                <Skeleton height={"70px"}></Skeleton>
                <Skeleton height={"70px"}></Skeleton>
                <Skeleton height={"70px"}></Skeleton>
            </Stack>
        </Card>
    );
    return (
        <>
            <SimpleGrid
                minChildWidth="380px"
                justifyItems={"center"}
                my={"10px"}
                rowGap={"25px"}
            >
                {skeleton}
                {skeleton}
                {skeleton}
                {skeleton}
                {skeleton}
            </SimpleGrid>
        </>
    );
}
