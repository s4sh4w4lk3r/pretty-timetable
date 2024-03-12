"use client";
import { UseDisclosureReturn, VStack, HStack, Input, Button, Text } from "@chakra-ui/react";
import EditorModal from "../EditorModal";
import ReadonlyEditorInputs from "../ReadonlyEditorInputs";
import { z } from "zod";
import { deleteSubject, putSubject } from "@/server-actions/subjectActions";
import useToasts from "@/utils/client/useToasts";
import { getAllSubjectsSchema } from "@/fetching/zodSchemas";

type SubjectType = z.infer<typeof getAllSubjectsSchema.shape.data.shape.subjects.element>;

export default function SubjectModal({ disclosure, selectedSubject }: { disclosure: UseDisclosureReturn; selectedSubject: SubjectType }) {
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
