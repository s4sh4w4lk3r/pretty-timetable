"use client";
import { groupsSchema } from "@/fetching/public/zodSchemas";
import { Button, HStack, Input, Td, Text, Th, Tr, VStack, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { z } from "zod";
import EditorModal from "../EditorModal";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import EditorTable from "../EditorTable";

type GroupType = z.infer<typeof groupsSchema.shape.data.shape.groups.element>;
export default function GroupEdtior({ groups, onGroupSelected }: { groups: GroupType[]; onGroupSelected: (groupId: number) => void }) {
    const [query, setQuery] = useState("");
    const [group, setGroup] = useState<GroupType>(groups[0] ? groups[0] : { id: 0, name: "" });
    const disclosure = useDisclosure();

    const localGroups = groups.filter(g => g.name.toLowerCase().includes(query.toLowerCase())).sort();

    const tableBody = localGroups.map(g => (
        <Tr
            key={g.id}
            _hover={{ cursor: "pointer", color: "purple.300" }}
            onClick={() => {
                setGroup({ id: g.id, name: g.name });
                onGroupSelected(g.id);
                disclosure.onClose();
            }}
        >
            <Td>{g.id}</Td>
            <Td>
                <HStack
                    w={"full"}
                    justifyContent={"space-between"}
                >
                    <Text>{g.name}</Text>
                    <Button
                        onClick={async e => {
                            e.stopPropagation();
                            // await deleteGroup();
                        }}
                        variant={"ghost"}
                        size={"xs"}
                    >
                        <CloseIcon
                            color="red.300"
                            boxSize={3}
                        />
                    </Button>
                </HStack>
            </Td>
        </Tr>
    ));

    return (
        <>
            <Text>Выбрана группа {group.name}</Text>
            <Button
                onClick={() => {
                    disclosure.onOpen();
                }}
            >
                Изменить
            </Button>

            <EditorModal
                {...disclosure}
                size={"xl"}
            >
                <HStack mb={2}>
                    <Input
                        placeholder="Поиск по группам или добавление"
                        onChange={e => {
                            setQuery(e.target.value);
                        }}
                    />

                    <Button
                        colorScheme="green"
                        size={"md"}
                        onClick={async () => {
                            // await putGroup();
                        }}
                    >
                        <AddIcon />
                    </Button>
                </HStack>

                <VStack>
                    <EditorTable tableHeaders={tableHeaders}>{tableBody}</EditorTable>
                </VStack>
            </EditorModal>
        </>
    );
}

const tableHeaders = (
    <>
        <Th>Id</Th>
        <Th>Название</Th>
    </>
);
