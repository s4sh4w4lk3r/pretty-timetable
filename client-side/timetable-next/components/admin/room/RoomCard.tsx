"use client";
import { Button, Card, HStack, Input, StackDivider, Text, UseToastOptions, VStack, useDisclosure, useToast } from "@chakra-ui/react";
import EditorModal from "../EditorModal";
import { EditIcon } from "@chakra-ui/icons";
import { useFormState } from "react-dom";
import SubmitButton from "../SubmitButton";
import { updateRoom } from "@/server-actions/roomActions";
import { useSession } from "next-auth/react";

type Props = {
    id: number;
    address: string;
    number: string;
    fullName: string;
    ascId?: string | null;
    modifiedAt: Date;
};

export default function RoomCard({ id, address, fullName, modifiedAt, number, ascId }: Props) {
    const session = useSession();
    const [formState, action] = useFormState(updateRoom, null);
    const toast = useToast({ duration: 8000, isClosable: true });

    // FIXME: сделать валидацию формы на клиенте
    const disclosure = useDisclosure();

    if (session.status !== "authenticated") {
        return "Ждем аутентификацию";
    }
    return (
        <>
            <Card
                padding={2}
                w={"full"}
            >
                <HStack
                    divider={<StackDivider />}
                    justifyContent={"space-between"}
                >
                    <Text>{id}</Text>
                    <Text>{fullName}</Text>
                    <Text>{ascId}</Text>
                    <Text>{new Date(modifiedAt).toLocaleString("RU-ru")}</Text>
                    <Button onClick={disclosure.onOpen}>
                        <EditIcon />
                    </Button>
                </HStack>
            </Card>

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
                        <HStack w={"full"}>
                            <Text>ID</Text>
                            <Input
                                defaultValue={id}
                                name="id"
                                readOnly
                            ></Input>
                        </HStack>

                        <HStack w={"full"}>
                            <Text>Имя (сокр.)</Text>
                            <Input
                                defaultValue={number}
                                name="number"
                            ></Input>
                        </HStack>

                        <HStack w={"full"}>
                            <Text>Корпус</Text>
                            <Input
                                defaultValue={address}
                                name="address"
                            ></Input>
                        </HStack>

                        <HStack w={"full"}>
                            <Text>Имя (полн.)</Text>
                            <Input
                                defaultValue={fullName}
                                name="fullName"
                            ></Input>
                        </HStack>

                        <HStack w={"full"}>
                            <Text>AscID</Text>
                            <Input
                                defaultValue={ascId!}
                                name="ascId"
                            ></Input>
                        </HStack>
                        <SubmitButton>Сохранить</SubmitButton>
                    </VStack>
                    {!formState?.success === true ? formState?.message : "OK"}
                </form>
            </EditorModal>
        </>
    );
}
