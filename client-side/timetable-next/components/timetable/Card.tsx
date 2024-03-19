"use client";
import React from "react";
import { Badge, Card as ChakraCard, HStack, StackDivider, VStack, useColorModeValue } from "@chakra-ui/react";
import { defineHintsRequired, getStatusHighlighting } from "@/utils/card";
import { durationToTimeOnly } from "@/utils/date";

type ChangesType = {
    isMoved: boolean;
    isCanceled: boolean;
    isModified: boolean;
};
type Props = {
    id: number;
    subject: string;
    teacher: string;
    lessonTime: {
        number: number;
        startsAt: string;
        endsAt: string;
    };
    room: string;
    changes: ChangesType;
    date: Date;
};

function getBadges(changes: ChangesType) {
    const { isCanceled, isModified, isMoved } = changes;

    const canceledBadge = <Badge color={"red.500"}>ОТМЕНЕН</Badge>;
    const modifiedBadge = <Badge color={"yellow.500"}>ЗАМЕНА</Badge>;
    const movedBadge = <Badge color={"yellow.500"}>ПЕРЕМЕЩЕН</Badge>;

    const badgesRequired = isCanceled || isModified || isMoved;
    if (badgesRequired) {
        return (
            <HStack>
                {isCanceled && canceledBadge}
                {isModified && modifiedBadge}
                {isMoved && movedBadge}
            </HStack>
        );
    }
}

export default function Card(props: Props) {
    const { room, lessonTime, subject, teacher, changes, date } = props;

    const badges = getBadges(changes);
    const coniditionalBadges = badges ? <HStack mt={2}>{badges}</HStack> : null;

    const startsAt = durationToTimeOnly(lessonTime.startsAt);
    const endsAt = durationToTimeOnly(lessonTime.endsAt);

    const hintsRequired = defineHintsRequired({ lessonStartsAt: startsAt, lessonEndsAt: endsAt, dateFromCard: date });
    const highlighting = useColorModeValue(getStatusHighlighting(hintsRequired, "light"), getStatusHighlighting(hintsRequired, "dark"));

    return (
        <ChakraCard
            px={1.5}
            borderColor={highlighting}
            borderWidth={"2px"}
            w="100%"
        >
            <HStack
                divider={<StackDivider />}
                w="100%"
            >
                <p>{lessonTime.number}</p>
                <VStack divider={<StackDivider />}>
                    <p>{startsAt}</p>
                    <p>{endsAt}</p>
                </VStack>

                <VStack
                    divider={<StackDivider />}
                    justifyContent={"space-around"}
                    w={"100%"}
                >
                    {coniditionalBadges}
                    <p>{subject}</p>
                    <HStack
                        w={"100%"}
                        justifyContent={"space-around"}
                    >
                        <p>{teacher}</p>
                        <p>{room}</p>
                    </HStack>
                </VStack>
            </HStack>
        </ChakraCard>
    );
}
