"use client";
import { Button, HStack, VStack, useDisclosure } from "@chakra-ui/react";
import { Tr, Th, Td } from "@chakra-ui/react";
import { useState } from "react";
import { useImmer } from "use-immer";
import { z } from "zod";
import { roomsSchema } from "@/fetching/admin/zodSchemas";
import genericSort from "@/utils/genericSort";
import EditorTable from "../EditorTable";
import SearchBar from "../SearchBar";
import RoomModal from "./RoomModal";

type RoomType = z.infer<typeof roomsSchema.shape.data.shape.rooms.element>;
type SortingType = {
    searchQuery: string;
    isAsc: boolean;
    sortingField: keyof RoomType;
};
const hover = { cursor: "pointer", color: "purple.300" };

export default function EditorList({ rooms }: { rooms: RoomType[] }) {
    const [sorting, setSorting] = useImmer<SortingType>({ isAsc: true, searchQuery: "", sortingField: "id" });
    const initialRoom = { id: 0, address: "", fullName: "", number: "", ascId: "", modifiedAt: new Date() };
    const [selectedRoom, setSelectedRoom] = useState<RoomType>(initialRoom);
    const disclosure = useDisclosure();

    const localRooms = rooms
        .filter(r => `${r.address} + ${r.ascId} + ${r.fullName} + ${r.id} + ${r.number} +`.toUpperCase().includes(sorting.searchQuery.toUpperCase()))
        .sort((a, b) => genericSort(sorting.sortingField, sorting.isAsc, a, b));

    const tableHeaders = (
        <>
            <Th
                _hover={hover}
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
                _hover={hover}
                onClick={() =>
                    setSorting(draft => {
                        draft.sortingField = "fullName";
                        draft.isAsc = !draft.isAsc;
                    })
                }
            >
                Корпус
            </Th>

            <Th
                _hover={hover}
                onClick={() =>
                    setSorting(draft => {
                        draft.sortingField = "number";
                        draft.isAsc = !draft.isAsc;
                    })
                }
            >
                Номер кабинета
            </Th>

            <Th
                _hover={hover}
                onClick={() =>
                    setSorting(draft => {
                        draft.sortingField = "number";
                        draft.isAsc = !draft.isAsc;
                    })
                }
            >
                Последнее изменение
            </Th>
        </>
    );

    const tableBody = localRooms.map(r => (
        <Tr
            key={r.id}
            _hover={{ cursor: "pointer", color: "purple.300" }}
            onClick={() => {
                setSelectedRoom(r);
                disclosure.onOpen();
            }}
        >
            <Td>{r.id}</Td>
            <Td>{r.address}</Td>
            <Td>{r.number}</Td>
            <Td>{r.modifiedAt.toLocaleString("ru-ru")}</Td>
        </Tr>
    ));

    return (
        <>
            <VStack
                borderWidth={"1px"}
                borderRadius={"md"}
                maxW={"8xl"}
                mx={"auto"}
                mt={20}
            >
                <HStack mt={3}>
                    <SearchBar onChange={e => setSorting(draft => void (draft.searchQuery = e.target.value))} />
                    <Button
                        colorScheme="green"
                        onClick={() => {
                            setSelectedRoom(initialRoom);
                            disclosure.onOpen();
                        }}
                    >
                        Добавить
                    </Button>
                </HStack>

                <EditorTable tableHeaders={tableHeaders}> {tableBody}</EditorTable>
            </VStack>

            <RoomModal
                disclosure={disclosure}
                key={selectedRoom.id}
                selectedRoom={selectedRoom}
            ></RoomModal>
        </>
    );
}
