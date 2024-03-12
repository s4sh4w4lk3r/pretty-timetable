"use client";
import Card from "@/components/timetable/Card";
import { getTeacherName } from "@/utils/card";
import { HStack } from "@chakra-ui/react";
import React from "react";
import SubgroupIndicator from "../SubgroupIndicator";
import { getActualTimetableWeekDaysSchema } from "@/fetching/zodSchemas";
import { z } from "zod";

type WrappedCardProps = {
    card: z.infer<typeof getActualTimetableWeekDaysSchema.shape.timetableFiltered.element.shape.cards.element>;
    onClick: () => void;
};

export function AdminActualCard({ card, onClick }: WrappedCardProps) {
    const { id, date, lessonTime, room, subGroup, subject, teacher } = card;

    return (
        <HStack
            w={"full"}
            _hover={{ cursor: "pointer" }}
            onClick={onClick}
        >
            <Card
                id={id}
                key={id}
                room={room.number}
                lessonTime={lessonTime}
                subject={subject.name}
                teacher={getTeacherName({ ...teacher })}
                changes={{ ...card }}
                date={date}
            ></Card>
            <SubgroupIndicator subgroup={subGroup} />
        </HStack>
    );
}
