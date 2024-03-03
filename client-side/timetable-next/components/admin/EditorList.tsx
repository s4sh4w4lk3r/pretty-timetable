"use client";
import { Center, HStack, Input, VStack, useDisclosure, Text, UseDisclosureReturn } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Updater, useImmer } from "use-immer";
import { z } from "zod";
import { roomsSchema } from "@/fetching/admin/zodSchemas";
import genericSort from "@/utils/genericSort";
import EditorModal from "./EditorModal";
import SubmitButton from "./SubmitButton";
import { useFormState } from "react-dom";
import { updateRoom } from "@/server-actions/roomActions";

type RoomType = z.infer<typeof roomsSchema.shape.data.shape.rooms.element>;
type SortingType = {
    searchQuery: string;
    isAsc: boolean;
    sortingField: keyof RoomType;
};

export default function EditorList({ rooms }: { rooms: RoomType[] }) {
    const [sorting, setSorting] = useImmer<SortingType>({ isAsc: true, searchQuery: "", sortingField: "id" });
    const [selectedRoom, setSelectedRoom] = useState<RoomType>({ id: 0, address: "", fullName: "", number: "", ascId: "", modifiedAt: new Date() });

    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => inputRef.current?.focus(), []);
    const disclosure = useDisclosure();

    const localRooms = rooms
        .filter(r => `${r.address} + ${r.ascId} + ${r.fullName} + ${r.id} + ${r.number} +`.toUpperCase().includes(sorting.searchQuery.toUpperCase()))
        .sort((a, b) => genericSort<RoomType>(sorting.sortingField, sorting.isAsc, a, b));

    const trElements = localRooms.map(r => (
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
                <Input
                    onChange={e => setSorting(draft => void (draft.searchQuery = e.target.value))}
                    mt={3}
                    w={["300px", null, "600px", null, null]}
                    placeholder="Поиск по всем полям"
                    ref={inputRef}
                ></Input>
            </Center>

            <EditorTable setSorting={setSorting}> {trElements}</EditorTable>

            <Modal
                disclosure={disclosure}
                key={selectedRoom.id}
                selectedRoom={selectedRoom}
            ></Modal>
        </>
    );
}

function Modal({ disclosure, selectedRoom }: { disclosure: UseDisclosureReturn; selectedRoom: RoomType }) {
    const [formState, action] = useFormState(updateRoom, null);

    return (
        <EditorModal
            {...disclosure}
            size={"xl"}
        >
            <form
                action={action}
                //FIXME : в тосте испольузутся значение прошлого стейта
                onSubmit={() => {}}
            >
                <VStack>
                    <EditorFormReadonlyFields
                        id={selectedRoom.id}
                        modifiedAt={selectedRoom.modifiedAt}
                    />

                    <HStack w={"full"}>
                        <Text>Имя (сокр.)</Text>
                        <Input
                            defaultValue={selectedRoom.number}
                            name="number"
                        ></Input>
                    </HStack>

                    <HStack w={"full"}>
                        <Text>Корпус</Text>
                        <Input
                            defaultValue={selectedRoom.address}
                            name="address"
                        ></Input>
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

                    <SubmitButton>Сохранить</SubmitButton>
                </VStack>
                {!formState?.success === true ? formState?.message : "OK"}
            </form>
        </EditorModal>
    );
}

function EditorTable({ children, setSorting }: { setSorting: Updater<SortingType>; children: ReactNode | ReactNode[] }) {
    return (
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

                <Tbody>{children}</Tbody>
            </Table>
        </TableContainer>
    );
}

function EditorFormReadonlyFields({ id, modifiedAt }: { id: number; modifiedAt: Date }) {
    return (
        <HStack w={"full"}>
            <Text>ID</Text>
            <Input
                defaultValue={id}
                name="id"
                readOnly
            ></Input>

            <Text>Изменен</Text>
            <Input
                defaultValue={modifiedAt.toLocaleString("ru-ru")}
                name="modifiedAt"
                readOnly
            ></Input>
        </HStack>
    );
}
