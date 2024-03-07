"use client";
import { UseDisclosureReturn, useToast, VStack, HStack, Input, Button, Text } from "@chakra-ui/react";
import EditorModal from "../EditorModal";
import ReadonlyEditorInputs from "../ReadonlyEditorInputs";
import { z } from "zod";
import { getSubjectsSchema } from "@/fetching/admin/zodSchemas";
import { deleteSubject, putSubject } from "@/server-actions/subjectActions";

type SubjectType = z.infer<typeof getSubjectsSchema.shape.data.shape.subjects.element>;

export default function SubjectModal({ disclosure, selectedSubject }: { disclosure: UseDisclosureReturn; selectedSubject: SubjectType }) {
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
                    const result = await putSubject(new FormData(e.currentTarget));
                    result.success ? successfulToast(result.message) : failedToast(result.message);
                    toast.close(toastId);
                }}
            >
                <VStack>
                    <ReadonlyEditorInputs
                        id={selectedSubject.id}
                        modifiedAt={selectedSubject.modifiedAt}
                    />

                    <HStack w={"full"}>
                        <Text>Название</Text>
                        <Input
                            defaultValue={selectedSubject.name}
                            name="name"
                        ></Input>
                    </HStack>

                    <HStack w={"full"}>
                        <Text>AscID</Text>
                        <Input
                            defaultValue={selectedSubject.ascId!}
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
                                const res = await deleteSubject({ id: selectedSubject.id });
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
