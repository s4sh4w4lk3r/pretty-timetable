"use client";
import { deleteGroup, putGroup } from "@/server-actions/groupActions";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { HStack, Input, Button, VStack, Td, Th, Tr, UseDisclosureReturn, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import EditorModal from "../EditorModal";
import EditorTable from "../EditorTable";
import { getAllGroupsSchema } from "@/fetching/zodSchemas";
import { z } from "zod";
import useToasts from "@/utils/client/useToasts";
import { useRouter } from "next/navigation";

type GroupType = z.infer<typeof getAllGroupsSchema.shape.data.shape.groups.element>;
type Props = {
    groups: GroupType[];
    disclosure: UseDisclosureReturn;
    onGroupSelected: (group: GroupType) => void;
};

export default function GroupModal({ groups, disclosure, onGroupSelected }: Props) {
    const [query, setQuery] = useState("");
    const router = useRouter();
    const { toast, successfulToast, failedToast, loadingToast } = useToasts();

    const localGroups = groups.filter(g => g.name.toLowerCase().includes(query.toLowerCase())).sort();
    const tableBody = localGroups.map(g => (
        <Tr
            key={g.id}
            _hover={{ cursor: "pointer", color: "purple.300" }}
            onClick={() => {
                onGroupSelected(g);
                setQuery("");
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
                    type="search"
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
    );
}

const tableHeaders = (
    <>
        <Th>Id</Th>
        <Th>Название</Th>
    </>
);
