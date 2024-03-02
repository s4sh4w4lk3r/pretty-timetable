"use client";
import { Center, Input } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useImmer } from "use-immer";
import { z } from "zod";
import { roomsSchema } from "@/fetching/admin/zodSchemas";
import genericSort from "@/utils/genericSort";

type RoomType = z.infer<typeof roomsSchema.shape.data.shape.rooms.element>;
type SortingType = {
    searchQuery: string;
    isAsc: boolean;
    sortingField: keyof RoomType;
};

export default function EditorList({ rooms }: { rooms: RoomType[] }) {
    const [sorting, setSorting] = useImmer<SortingType>({ isAsc: true, searchQuery: "", sortingField: "id" });

    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => inputRef.current?.focus(), []);

    const localRooms = rooms
        .filter(r => `${r.address} + ${r.ascId} + ${r.fullName} + ${r.id} + ${r.number} +`.toUpperCase().includes(sorting.searchQuery.toUpperCase()))
        .sort((a, b) => genericSort<RoomType>(sorting.sortingField, sorting.isAsc, a, b));

    const trElements = localRooms.map(r => (
        <Tr
            key={r.id}
            _hover={{ cursor: "pointer", color: "purple.300" }}
        >
            <Td>{r.id}</Td>
            <Td>{r.number}</Td>
            <Td>{r.fullName}</Td>
        </Tr>
    ));

    return (
        <>
            <Center>
                <Input
                    onChange={e => setSorting(draft => void (draft.searchQuery = e.target.value))}
                    mt={3}
                    w={["300px", null, "600px", null, null]}
                    placeholder="Поиск по всем полям"
                    ref={inputRef}
                ></Input>
            </Center>

            <TableContainer>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th
                                _hover={{ cursor: "pointer", color: "purple.300" }}
                                onClick={() =>
                                    setSorting(draft => {
                                        draft.sortingField = "id";
                                        draft.isAsc = !draft.isAsc;
                                    })
                                }
                            >
                                Id
                            </Th>
                            <Th
                                _hover={{ cursor: "pointer", color: "purple.300" }}
                                onClick={() =>
                                    setSorting(draft => {
                                        draft.sortingField = "number";
                                        draft.isAsc = !draft.isAsc;
                                    })
                                }
                            >
                                Краткое имя
                            </Th>
                            <Th
                                _hover={{ cursor: "pointer", color: "purple.300" }}
                                onClick={() =>
                                    setSorting(draft => {
                                        draft.sortingField = "fullName";
                                        draft.isAsc = !draft.isAsc;
                                    })
                                }
                            >
                                Полное имя
                            </Th>
                        </Tr>
                    </Thead>

                    <Tbody>{trElements}</Tbody>
                </Table>
            </TableContainer>
        </>
    );
}
