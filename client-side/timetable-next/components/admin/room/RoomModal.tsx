"use client";
import { putRoom, deleteRoom } from "@/server-actions/roomActions";
import { UseDisclosureReturn, VStack, HStack, Input, Select, Button, Text } from "@chakra-ui/react";
import EditorModal from "../EditorModal";
import ReadonlyEditorInputs from "../ReadonlyEditorInputs";
import { z } from "zod";
import useToasts from "@/utils/client/useToasts";
import { getAllRoomsSchema } from "@/fetching/zodSchemas";

type RoomType = z.infer<typeof getAllRoomsSchema.shape.data.shape.rooms.element>;

export default function RoomModal({ disclosure, selectedRoom }: { disclosure: UseDisclosureReturn; selectedRoom: RoomType }) {
    const { toast, successfulToast, failedToast, loadingToast } = useToasts();

    return (
        <EditorModal
            {...disclosure}
            size={"xl"}
        >
            <form
                onSubmit={async e => {
                    e.preventDefault();
                    const toastId = loadingToast("Сохранение данных...");
                    const result = await putRoom(new FormData(e.currentTarget));
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
                            <option value="Аккадемика Миллионщикова">Аккадемика Миллионщикова</option>
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
                                if (res.success) {
                                    successfulToast(res.message);
                                    disclosure.onClose();
                                } else {
                                    failedToast(res.message);
                                }
                            }}
                        >
                            Удалить
                        </Button>

                        <Button
                            type="submit"
                            colorScheme="blue"
                        >
                            Сохранить
                        </Button>
                    </HStack>
                </VStack>
            </form>
        </EditorModal>
    );
}
