"use client";
import { getStableTimetableIdsOnlySchema, getStableTimetableSchema } from "@/fetching/zodSchemas";
import DayOfWeek from "@/types/DayOfWeek";
import { Switch, VStack, Text, HStack, StackDivider, useDisclosure, Button } from "@chakra-ui/react";
import { useState } from "react";
import { z } from "zod";
import { AdminActualCard } from "../actual/AdminActualCard";
import { WeekDayButton } from "../WeekDayButton";
import moment from "moment";
import "moment/locale/ru";
import StableCardEditorModal from "./StableCardEditorModal";

type StableCard = z.infer<typeof getStableTimetableIdsOnlySchema.shape.data.shape.stableTimetables.element.shape.cards.element>;
const initialCard: StableCard = {
    id: 0,
    dayOfWeek: DayOfWeek.Monday,
    isWeekEven: false,
    lessonTimeId: 0,
    modifiedAt: new Date(),
    roomId: 0,
    subGroup: "ALL",
    subjectId: 0,
    teacherId: 0,
};
type Props = { stableTimetable: z.infer<typeof getStableTimetableSchema> };
export default function StableTimetableEditor({ stableTimetable }: Props) {
    const [isWeekEven, setIsWeekEven] = useState(false);
    const [weekday, setweekDay] = useState<DayOfWeek>(DayOfWeek.Monday);
    const [selectedCard, setSelectedCard] = useState<StableCard>(initialCard);
    const disclosure = useDisclosure();

    const weekDayButtons = [...new Set(stableTimetable.cards.map(e => e.dayOfWeek))]
        .sort((a, b) => (a > b ? 1 : -1))
        .map(dayOfWeek => (
            <WeekDayButton
                name={moment().isoWeekday(dayOfWeek).locale("ru").format("dddd").toUpperCase()}
                key={dayOfWeek}
                isActive={dayOfWeek === weekday}
                onClick={() => setweekDay(dayOfWeek)}
            />
        ));
    const cardsFiltred = stableTimetable.cards
        .filter(c => c.isWeekEven === isWeekEven && c.dayOfWeek === weekday)
        .sort((a, b) => (a.lessonTime.number > b.lessonTime.number ? 1 : -1));
    const cardsElement = cardsFiltred.map(c => (
        <AdminActualCard
            key={c.id}
            onClick={() => {
                setSelectedCard({
                    id: c.id,
                    dayOfWeek: c.dayOfWeek,
                    isWeekEven: c.isWeekEven,
                    lessonTimeId: c.lessonTime.id,
                    modifiedAt: c.modifiedAt,
                    roomId: c.room.id,
                    subGroup: c.subgroup,
                    subjectId: c.subject.id,
                    teacherId: c.teacher.id,
                });
                disclosure.onOpen();
            }}
            card={{
                id: c.id,
                isCanceled: false,
                isModified: false,
                isMoved: false,
                lessonTime: c.lessonTime,
                date: "12-12-2024",
                modifiedAt: c.modifiedAt,
                relatedTimetableId: 0,
                room: c.room,
                subGroup: c.subgroup,
                subject: c.subject,
                teacher: c.teacher,
            }}
        />
    ));
    cardsElement.push(
        <AddCardButton
            onClick={() => {
                setSelectedCard({ ...initialCard });
                disclosure.onOpen();
            }}
        />
    );

    return (
        <>
            <HStack>
                <Text>Четная неделя?</Text>
                <Switch
                    isChecked={isWeekEven}
                    onChange={() => setIsWeekEven(!isWeekEven)}
                    size={"lg"}
                />
            </HStack>

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
                    {weekDayButtons}
                </VStack>

                <VStack w={"500px"}>{cardsElement}</VStack>
            </HStack>

            <StableCardEditorModal
                disclosure={disclosure}
                groupId={stableTimetable.group.id}
                selectedCard={selectedCard}
            />
        </>
    );
}

function AddCardButton({ onClick }: { onClick: () => void }) {
    return (
        <Button
            colorScheme="green"
            w={"80%"}
            mt={2}
            onClick={onClick}
        >
            Добавить
        </Button>
    );
}
