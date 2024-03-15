"use client";
import { Button, HStack, Text, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { z } from "zod";
import { usePathname } from "next/navigation";
import { getAllGroupsSchema } from "@/fetching/zodSchemas";
import GroupModal from "./GroupModal";

type GroupType = z.infer<typeof getAllGroupsSchema.shape.data.shape.groups.element>;
export default function GroupEdtior({ groups }: { groups: GroupType[] }) {
    const disclosure = useDisclosure();

    const groupIdFromPath: number = Number.parseInt(usePathname().split("/")[3]);
    const groupFromPath = groupIdFromPath ? groups.find(g => g.id === groupIdFromPath) : undefined;
    const [selectedGroup, setSelectedGroup] = useState<GroupType>(groupFromPath ? groupFromPath : { id: 0, name: "", modifiedAt: new Date() });

    return (
        <>
            <HStack
                w={"full"}
                justifyContent={"center"}
                mb={2}
            >
                <Text fontSize={"xl"}>{selectedGroup.name ? selectedGroup.name : "Группа не выбрана"}</Text>
                <Button
                    colorScheme="purple"
                    onClick={() => {
                        disclosure.onOpen();
                    }}
                >
                    Изменить
                </Button>
            </HStack>
            <GroupModal
                groups={groups}
                disclosure={disclosure}
                onGroupSelected={setSelectedGroup}
            />
        </>
    );
}
