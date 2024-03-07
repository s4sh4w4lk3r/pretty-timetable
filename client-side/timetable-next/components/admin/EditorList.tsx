"use client";
import { Center, HStack, Input, VStack, useDisclosure, Text, UseDisclosureReturn, useToast, Button, Select } from "@chakra-ui/react";
import { Tr, Th, Td } from "@chakra-ui/react";
import { useState } from "react";
import { useImmer } from "use-immer";
import { z } from "zod";
import { roomsSchema } from "@/fetching/admin/zodSchemas";
import genericSort from "@/utils/genericSort";
import EditorModal from "./EditorModal";
import { deleteRoom, updateRoom } from "@/server-actions/roomActions";
import ReadonlyEditorInputs from "./ReadonlyEditorInputs";
import SearchBar from "./SearchBar";
import EditorTable from "./EditorTable";

type RoomType = z.infer<typeof roomsSchema.shape.data.shape.rooms.element>;
type SortingType = {
    searchQuery: string;
    isAsc: boolean;
    sortingField: keyof RoomType;
};

export default function EditorList({ rooms }: { rooms: RoomType[] }) {
    const [sorting, setSorting] = useImmer<SortingType>({ isAsc: true, searchQuery: "", sortingField: "id" });
    const [selectedRoom, setSelectedRoom] = useState<RoomType>({ id: 0, address: "", fullName: "", number: "", ascId: "", modifiedAt: new Date() });
    const disclosure = useDisclosure();
    const hover = { cursor: "pointer", color: "purple.300" };

    const localRooms = rooms
        .filter(r => `${r.address} + ${r.ascId} + ${r.fullName} + ${r.id} + ${r.number} +`.toUpperCase().includes(sorting.searchQuery.toUpperCase()))
        .sort((a, b) => genericSort<RoomType>(sorting.sortingField, sorting.isAsc, a, b));

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
                        draft.sortingField = "fullName";
                        draft.isAsc = !draft.isAsc;
                    })
                }
            >
                Полное название
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
            <Td>{r.number}</Td>
            <Td>{r.fullName}</Td>
        </Tr>
    ));

    return (
        <>
            <Center>
                <SearchBar onChange={e => setSorting(draft => void (draft.searchQuery = e.target.value))} />
            </Center>

            <EditorTable tableHeaders={tableHeaders}> {tableBody}</EditorTable>

            <Modal
                disclosure={disclosure}
                key={selectedRoom.id}
                selectedRoom={selectedRoom}
            ></Modal>
        </>
    );
}

function Modal({ disclosure, selectedRoom }: { disclosure: UseDisclosureReturn; selectedRoom: RoomType }) {
    const toast = useToast({ duration: 5000, isClosable: true });
    const successfulToast = (message: string) => toast({ status: "success", title: "Данные сохранены", description: message });
    const failedToast = (message: string) => toast({ status: "error", title: "Не удалось выполнить операцию", description: message });
    const loadingToast = (title: string) => toast({ status: "loading", title: title });

    return (
        <EditorModal
            {...disclosure}
            size={"xl"}
        >
            <form
                onSubmit={async e => {
                    e.preventDefault();
                    const toastId = loadingToast("Сохранение данных...");
                    const result = await updateRoom(new FormData(e.currentTarget));
                    result.success ? successfulToast(result.message) : failedToast(result.message);
                    toast.close(toastId);
                }}
            >
                <VStack>
                    <ReadonlyEditorInputs
                        id={selectedRoom.id}
                        modifiedAt={selectedRoom.modifiedAt}
                    />

                    <HStack w={"full"}>
                        <Text>Номер каб.</Text>
                        <Input
                            defaultValue={selectedRoom.number}
                            name="number"
                        ></Input>
                    </HStack>

                    <HStack w={"full"}>
                        <Text>Корпус</Text>

                        <Select
                            defaultValue={selectedRoom.address}
                            name="address"
                        >
                            <option value="Аккадемика Миллионщикова">Академика Миллионщикова</option>
                            <option value="Судостроительная ул.">Судостроительная ул.</option>
                            <option value="Коломенская набережная">Коломенская набережная</option>
                        </Select>
                    </HStack>
                    <HStack w={"full"}>
                        <Text>Имя (полн.)</Text>
                        <Input
                            defaultValue={selectedRoom.fullName}
                            name="fullName"
                        ></Input>
                    </HStack>

                    <HStack w={"full"}>
                        <Text>AscID</Text>
                        <Input
                            defaultValue={selectedRoom.ascId!}
                            name="ascId"
                        ></Input>
                    </HStack>

                    <HStack
                        mt={2}
                        w={"full"}
                        justifyContent={"space-around"}
                    >
                        <Button
                            colorScheme="red"
                            onClick={async () => {
                                const res = await deleteRoom({ id: selectedRoom.id });
                                res.success ? successfulToast(res.message) : failedToast(res.message);
                            }}
                        >
                            Удалить
                        </Button>

                        <Button
                            type="submit"
                            colorScheme="blue"
                        >
                            Отправить
                        </Button>
                    </HStack>
                </VStack>
            </form>
        </EditorModal>
    );
}
