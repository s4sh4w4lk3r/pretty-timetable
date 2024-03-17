"use client";
import { getActualTimetableIdsOnlySchema, getActualTimetableWeekDaysSchema } from "@/fetching/zodSchemas";
import { Button, HStack, StackDivider, VStack, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { z } from "zod";
import { useImmer } from "use-immer";
import { WeekDayButton } from "../WeekDayButton";
import { AdminActualCard } from "./AdminActualCard";
import ActualCardEditorModal from "./ActualCardEditorModal";
import DayOfWeek from "@/types/DayOfWeek";
import AddCardButton from "../AddCardButton";

type Props = { actualTimetable: z.infer<typeof getActualTimetableWeekDaysSchema> };
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

export default function ActualTimetableEditor(props: Props) {
    const { group, timetableFiltered } = props.actualTimetable;
    const [selectedWeekday, setSelectedWeekday] = useState<DayOfWeek>(DayOfWeek.Monday);
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
            <HStack
                divider={<StackDivider />}
                h={"600px"}
                w={"1000px"}
                justifyContent={"space-evenly"}
            >
                <VStack
                    h={"full"}
                    alignItems={"flex-start"}
                    justifyContent={"center"}
                    gap={10}
                >
                    {weekDaysButtons}
                </VStack>
                <VStack w={"500px"}>
                    {cardsElement}
                    <AddCardButton
                        onClick={() => {
                            setSelectedCard({ ...initialCard, relatedTimetableId: timetableFiltered.at(0)?.cards.at(0)?.relatedTimetableId ?? 0 });
                            disclosure.onOpen();
                        }}
                    />
                </VStack>
            </HStack>

            <ActualCardEditorModal
                disclosure={disclosure}
                selectedCard={selectedCard}
                groupId={group.id}
            />
        </>
    );
}
