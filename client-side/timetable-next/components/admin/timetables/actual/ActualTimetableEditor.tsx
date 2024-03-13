"use client";
import { getActualTimetableIdsOnlySchema, getActualTimetableWeekDaysSchema } from "@/fetching/zodSchemas";
import { Button, FormLabel, HStack, Input, Select, StackDivider, Switch, Text, VStack, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { z } from "zod";
import EditorModal from "../../EditorModal";
import { useImmer } from "use-immer";
import ReadonlyEditorInputs from "../../ReadonlyEditorInputs";
import { WeekDayButton } from "../WeekDayButton";
import { putActualCard } from "@/server-actions/actualCardActions";
import { AdminActualCard } from "./AdminActualCard";

type Props = {
    actualTimetable: z.infer<typeof getActualTimetableWeekDaysSchema>;
    lessonTimeOptions: JSX.Element[];
    roomOptions: JSX.Element[];
    subjectOptions: JSX.Element[];
    teacherOptions: JSX.Element[];
};
type CardType = z.infer<typeof getActualTimetableIdsOnlySchema.shape.data.shape.actualTimetables.element.shape.cards.element>;

const initialCard: CardType = {
    id: 0,
    date: "",
    isCanceled: false,
    isModified: false,
    isMoved: false,
    modifiedAt: new Date(),
    lessonTimeId: 0,
    roomId: 0,
    subGroup: "ALL",
    subjectId: 0,
    teacherId: 0,
    relatedTimetableId: 0,
};

export default function ActualTimetableEditor({ actualTimetable, lessonTimeOptions, roomOptions, subjectOptions, teacherOptions }: Props) {
    const { group, timetableFiltered } = actualTimetable;
    const [selectedWeekday, setSelectedWeekday] = useState(1); // 1 - это понедельник
    const [selectedCard, setSelectedCard] = useImmer<CardType>(initialCard);
    const disclosure = useDisclosure();

    const selectedCards = timetableFiltered.find(tf => tf.dayOfWeek.dayOfWeek === selectedWeekday)?.cards;
    const cardsElement = selectedCards?.map(x => (
        <AdminActualCard
            card={x}
            {...x}
            key={x.id}
            onClick={() => {
                setSelectedCard(draft => {
                    (draft.date = x.date),
                        (draft.id = x.id = x.id),
                        (draft.isCanceled = x.isCanceled),
                        (draft.isModified = x.isModified),
                        (draft.isMoved = x.isMoved),
                        (draft.lessonTimeId = x.lessonTime.id),
                        (draft.modifiedAt = x.modifiedAt),
                        (draft.roomId = x.room.id),
                        (draft.subGroup = x.subGroup),
                        (draft.subjectId = x.subject.id),
                        (draft.teacherId = x.teacher.id),
                        (draft.relatedTimetableId = x.relatedTimetableId);
                });
                disclosure.onOpen();
            }}
        />
    ));

    const weekDaysButtons = timetableFiltered.map(x => (
        <WeekDayButton
            isActive={selectedWeekday === x.dayOfWeek.dayOfWeek}
            name={x.dayOfWeek.long}
            key={x.dayOfWeek.dayOfWeek}
            onClick={() => {
                setSelectedWeekday(x.dayOfWeek.dayOfWeek);
            }}
        />
    ));

    return (
        <>
            <HStack divider={<StackDivider />}>
                <VStack>{weekDaysButtons}</VStack>
                <VStack>{cardsElement}</VStack>
            </HStack>

            <EditorModal
                {...disclosure}
                size={"xl"}
            >
                <form
                    onSubmit={async e => {
                        e.preventDefault();
                        await putActualCard({ formData: new FormData(e.currentTarget), groupId: group.id });
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
                                readOnly
                                defaultValue={selectedCard.date}
                                name="date"
                            ></Input>
                        </HStack>

                        <StatusSwitchers selectedCard={selectedCard} />
                        <FormButtons />
                    </VStack>
                </form>
            </EditorModal>
        </>
    );
}

function StatusSwitchers({ selectedCard }: { selectedCard: CardType }) {
    return (
        <HStack
            w={"full"}
            justifyContent={"space-evenly"}
            h={"40px"}
        >
            <FormLabel htmlFor="isModified">Заменен:</FormLabel>
            <Switch
                name="isModified"
                colorScheme="yellow"
                defaultChecked={selectedCard.isModified}
            />

            <FormLabel htmlFor="isMoved">Перенесен:</FormLabel>
            <Switch
                name="isMoved"
                colorScheme="orange"
                defaultChecked={selectedCard.isMoved}
            />

            <FormLabel htmlFor="isCanceled">Отменен:</FormLabel>
            <Switch
                name="isCanceled"
                colorScheme="red"
                defaultChecked={selectedCard.isCanceled}
            />
        </HStack>
    );
}

function FormButtons() {
    return (
        <HStack
            w={"full"}
            justifyContent={"space-around"}
        >
            <Button colorScheme="red">Удалить</Button>
            <Button
                type="submit"
                colorScheme="blue"
            >
                Сохранить
            </Button>
        </HStack>
    );
}
