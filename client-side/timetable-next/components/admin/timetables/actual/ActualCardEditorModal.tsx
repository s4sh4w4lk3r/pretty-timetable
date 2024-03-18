"use client";
import { deleteActualCard, putActualCard } from "@/server-actions/actualCardActions";
import { HStack, Button, UseDisclosureReturn, VStack, Input, Select, Text } from "@chakra-ui/react";
import EditorModal from "../../EditorModal";
import ReadonlyEditorInputs from "../../ReadonlyEditorInputs";
import { z } from "zod";
import { getActualTimetableIdsOnlySchema } from "@/fetching/zodSchemas";
import useToasts from "@/utils/client/useToasts";
import { useContext } from "react";
import { TimetableContext } from "@/utils/client/contexts/TimetableContext";
import { getTeacherName } from "@/utils/card";
import StatusSwitchers from "./StatusSwitchers";

type Props = {
    selectedCard: z.infer<typeof getActualTimetableIdsOnlySchema.shape.data.shape.actualTimetables.element.shape.cards.element>;
    disclosure: UseDisclosureReturn;
    groupId: number;
};

export default function ActualCardEditorModal({ selectedCard, disclosure, groupId }: Props) {
    const { lessonTimes, rooms, subjects, teachers } = useContext(TimetableContext)!;

    const lessonTimeOptions = lessonTimes.map(lt => (
        <option
            value={lt.id}
            key={lt.id}
        >{`${lt.number} пара`}</option>
    ));

    const roomOptions = rooms.map(r => (
        <option
            key={r.id}
            value={r.id}
        >{`${r.address}, ${r.number}`}</option>
    ));

    const subjectOptions = subjects.map(s => (
        <option
            key={s.id}
            value={s.id}
        >
            {s.name}
        </option>
    ));

    const teacherOptions = teachers.map(t => (
        <option
            key={t.id}
            value={t.id}
        >
            {getTeacherName(t)}
        </option>
    ));

    const { failedToast, loadingToast, successfulToast, toast } = useToasts();
    return (
        <EditorModal
            {...disclosure}
            size={"xl"}
        >
            <form
                onSubmit={async e => {
                    e.preventDefault();
                    const toastId = loadingToast("Сохранение данных...");
                    const res = await putActualCard({ formData: new FormData(e.currentTarget), groupId: groupId });
                    toast.close(toastId);
                    res.success ? successfulToast(res.message) : failedToast(res.message);
                }}
            >
                <VStack gap={3}>
                    <ReadonlyEditorInputs
                        id={selectedCard.id}
                        modifiedAt={selectedCard.modifiedAt}
                    />

                    <Input
                        name="relatedTimetableId"
                        defaultValue={selectedCard.relatedTimetableId}
                        hidden
                    ></Input>

                    <HStack w={"full"}>
                        <Text>Предмет</Text>
                        <Select
                            name="subjectId"
                            defaultValue={selectedCard.subjectId}
                        >
                            {subjectOptions}
                        </Select>
                    </HStack>

                    <HStack w={"full"}>
                        <Text>Препод</Text>
                        <Select
                            name="teacherId"
                            defaultValue={selectedCard.teacherId}
                        >
                            {teacherOptions}
                        </Select>
                    </HStack>

                    <HStack w={"full"}>
                        <Text>Кабинет</Text>
                        <Select
                            name="roomId"
                            defaultValue={selectedCard.roomId}
                        >
                            {roomOptions}
                        </Select>
                    </HStack>

                    <HStack w={"full"}>
                        <Text>Пара</Text>
                        <Select
                            name="lessonTimeId"
                            defaultValue={selectedCard.lessonTimeId}
                        >
                            {lessonTimeOptions}
                        </Select>

                        <Text>Подгруппа</Text>
                        <Select
                            name="subgroup"
                            defaultValue={selectedCard.subGroup}
                        >
                            <option value="0">Все</option>
                            <option value="1">Первая подгруппа</option>
                            <option value="2">Вторая подгруппа</option>
                        </Select>
                    </HStack>

                    <HStack w={"full"}>
                        <Text>Дата занятия</Text>
                        <Input
                            defaultValue={selectedCard.date.toISOString().split("T")[0]}
                            name="date"
                            type="date"
                        ></Input>
                    </HStack>

                    <StatusSwitchers selectedCard={selectedCard} />

                    <HStack
                        w={"full"}
                        justifyContent={"space-around"}
                    >
                        <Button
                            colorScheme="red"
                            onClick={async () => {
                                const toastId = loadingToast("Удаление...");
                                const res = await deleteActualCard({ cardId: selectedCard.id, groupId: groupId });
                                toast.close(toastId);
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
