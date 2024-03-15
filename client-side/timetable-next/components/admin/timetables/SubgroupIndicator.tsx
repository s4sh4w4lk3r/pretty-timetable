"use client";
import { subgroupsSchema } from "@/fetching/zodSchemas";
import { Box, useColorModeValue, VStack } from "@chakra-ui/react";
import { z } from "zod";

export default function SubgroupIndicator({ subgroup }: { subgroup: z.infer<typeof subgroupsSchema> }) {
    const purple = useColorModeValue("purple.500", "purple.400");
    const red = useColorModeValue("red", "red.400");
    const blue = useColorModeValue("blue.400", "blue.500");

    switch (subgroup) {
        case "ALL":
            return (
                <VStack>
                    <SubgroupIndicatorUnit color={purple} />
                    <SubgroupIndicatorUnit color={purple} />
                    <SubgroupIndicatorUnit color={purple} />
                </VStack>
            );

        case "FIRST_GROUP":
            return (
                <VStack>
                    <SubgroupIndicatorUnit color={red} />
                    <SubgroupIndicatorUnit color={red} />
                    <SubgroupIndicatorUnit color={red} />
                </VStack>
            );

        case "SECOND_GROUP":
            return (
                <VStack>
                    <SubgroupIndicatorUnit color={blue} />
                    <SubgroupIndicatorUnit color={blue} />
                    <SubgroupIndicatorUnit color={blue} />
                </VStack>
            );
    }
}

function SubgroupIndicatorUnit({ color }: { color: string }) {
    return (
        <Box
            h={"15px"}
            w={"5px"}
            bgColor={color}
        ></Box>
    );
}
