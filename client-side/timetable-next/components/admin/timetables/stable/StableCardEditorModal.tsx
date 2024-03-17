"use client";

import { getStableTimetableIdsOnlySchema } from "@/fetching/zodSchemas";
import { HStack, Input, Select, UseDisclosureReturn, VStack, Text, Button, Switch } from "@chakra-ui/react";
import { z } from "zod";
import EditorModal from "../../EditorModal";
import useToasts from "@/utils/client/useToasts";
import { getTeacherName } from "@/utils/card";
import { TimetableContext } from "@/utils/client/contexts/TimetableContext";
import { useContext } from "react";
import ReadonlyEditorInputs from "../../ReadonlyEditorInputs";
import DayOfWeekSelect from "./DayOfWeekSelect";

type StableCard = z.infer<typeof getStableTimetableIdsOnlySchema.shape.data.shape.stableTimetables.element.shape.cards.element>;
type Props = { disclosure: UseDisclosureReturn; groupId: number; selectedCard: StableCard };
export default function StableCardEditorModal({ disclosure, groupId, selectedCard }: Props) {
    const { failedToast, loadingToast, successfulToast, toast } = useToasts();
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

    return (
        <EditorModal
            {...disclosure}
            size={"xl"}
        >
            <form
            // onSubmit={async e => {
            //         e.preventDefault();
            //         const toastId = loadingToast("Сохранение данных...");
            //         const res = await putActualCard({ formData: new FormData(e.currentTarget), groupId: groupId });
            //         toast.close(toastId);
            //         res.success ? successfulToast(res.message) : failedToast(res.message);
            //     }}
            >
                <VStack gap={3}>
                    <ReadonlyEditorInputs
                        id={selectedCard.id}
                        modifiedAt={selectedCard.modifiedAt}
                    />

                    <Input
                        name="relatedTimetableId"
                        defaultValue={groupId}
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

                    <DayOfWeekSelect dayOfWeek={selectedCard.dayOfWeek} />

                    <HStack w={"full"}>
                        <Text>Четная неделя?</Text>
                        <Switch defaultChecked={selectedCard.isWeekEven} />
                    </HStack>

                    <HStack
                        w={"full"}
                        justifyContent={"space-around"}
                    >
                        <Button
                            colorScheme="red"
                            // onClick={async () => {
                            //     const toastId = loadingToast("Удаление...");
                            //     const res = await deleteActualCard({ cardId: selectedCard.id, groupId: groupId });
                            //     toast.close(toastId);
                            //     res.success ? successfulToast(res.message) : failedToast(res.message);
                            //     disclosure.onClose();
                            // }}
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
