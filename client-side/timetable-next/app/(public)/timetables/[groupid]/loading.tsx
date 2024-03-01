import React from "react";
import { Card, SimpleGrid, Skeleton, Stack } from "@chakra-ui/react";

export default function TimetablesSkeleton() {
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
                my={2.5}
                rowGap={6}
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
