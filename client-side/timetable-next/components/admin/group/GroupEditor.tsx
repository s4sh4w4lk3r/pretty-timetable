"use client";
import { Button, HStack, Input, Td, Text, Th, Tr, VStack, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { z } from "zod";
import EditorModal from "../EditorModal";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import EditorTable from "../EditorTable";
import { usePathname, useRouter } from "next/navigation";
import { deleteGroup, putGroup } from "@/server-actions/groupActions";
import useToasts from "@/utils/client/useToasts";
import { getAllGroupsSchema } from "@/fetching/zodSchemas";

type GroupType = z.infer<typeof getAllGroupsSchema.shape.data.shape.groups.element>;
export default function GroupEdtior({ groups }: { groups: GroupType[] }) {
    const [query, setQuery] = useState("");
    const disclosure = useDisclosure();
    const router = useRouter();
    const groupIdFromPath: number = Number.parseInt(usePathname().split("/")[3]);
    const groupFromPath = groupIdFromPath ? groups.find(g => g.id === groupIdFromPath) : undefined;
    const [group, setGroup] = useState<GroupType>(groupFromPath ? groupFromPath : { id: 0, name: "", modifiedAt: new Date() });
    const { toast, successfulToast, failedToast, loadingToast } = useToasts();

    const localGroups = groups.filter(g => g.name.toLowerCase().includes(query.toLowerCase())).sort();

    const tableBody = localGroups.map(g => (
        <Tr
            key={g.id}
            _hover={{ cursor: "pointer", color: "purple.300" }}
            onClick={() => {
                setGroup(g);
                disclosure.onClose();
                router.push(`/admin/timetables/${g.id}/actual`);
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
                            const toastId = loadingToast("Сохранение...");
                            const res = await deleteGroup({ id: g.id });
                            res.success ? successfulToast(res.message) : failedToast(res.message);
                            toast.close(toastId);
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
            <HStack
                w={"full"}
                justifyContent={"center"}
                mb={2}
            >
                <Text fontSize={"xl"}>{group.name ? group.name : "Группа не выбрана"}</Text>
                <Button
                    colorScheme="purple"
                    onClick={() => {
                        disclosure.onOpen();
                    }}
                >
                    Изменить
                </Button>
            </HStack>

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
                            const toastId = loadingToast("Сохранение...");
                            const res = await putGroup({ name: query });
                            res.success ? successfulToast(res.message) : failedToast(res.message);
                            toast.close(toastId);
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
