import { Button, HStack, Input, VStack, useToast, Text, UseDisclosureReturn } from "@chakra-ui/react";
import React from "react";
import { z } from "zod";
import EditorModal from "../EditorModal";
import ReadonlyEditorInputs from "../ReadonlyEditorInputs";
import { getTeachersSchema } from "@/fetching/admin/zodSchemas";
import { deleteTeacher, putTeacher } from "@/server-actions/teacherActions";

type TeacherType = z.infer<typeof getTeachersSchema.shape.data.shape.teachers.element>;
export default function TeacherModal({ disclosure, selectedTeacher }: { disclosure: UseDisclosureReturn; selectedTeacher: TeacherType }) {
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
                    const result = await putTeacher(new FormData(e.currentTarget));
                    result.success ? successfulToast(result.message) : failedToast(result.message);
                    toast.close(toastId);
                }}
            >
                <VStack>
                    <ReadonlyEditorInputs
                        id={selectedTeacher.id}
                        modifiedAt={selectedTeacher.modifiedAt}
                    />

                    <HStack w={"full"}>
                        <Text>Фамилия</Text>
                        <Input
                            defaultValue={selectedTeacher.lastname}
                            name="lastname"
                        ></Input>
                    </HStack>

                    <HStack w={"full"}>
                        <Text>Имя</Text>
                        <Input
                            defaultValue={selectedTeacher.firstname}
                            name="firstname"
                        ></Input>
                    </HStack>

                    <HStack w={"full"}>
                        <Text>Отчество</Text>
                        <Input
                            defaultValue={selectedTeacher.middlename}
                            name="middlename"
                        ></Input>
                    </HStack>

                    <HStack w={"full"}>
                        <Text>AscID</Text>
                        <Input
                            defaultValue={selectedTeacher.ascId!}
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
                                const res = await deleteTeacher({ id: selectedTeacher.id });
                                res.success ? successfulToast(res.message) : failedToast(res.message);
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
