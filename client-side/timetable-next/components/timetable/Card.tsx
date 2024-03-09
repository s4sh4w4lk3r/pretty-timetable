"use client";
import React from "react";
import { Badge, Card as ChakraCard, HStack, StackDivider, VStack, useColorModeValue } from "@chakra-ui/react";
import { defineHintsRequired } from "@/utils/card";
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
    cabinet: string;
    changes: ChangesType;
    date: any;
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

function getStatusHighlighting(params: { isNow: boolean; isPending: boolean }, colorMode: "dark" | "light") {
    const { isNow, isPending } = params;

    if (colorMode === "dark") {
        if (isNow) return "green.400";

        if (isPending) return "cyan.500";

        return "pink.200";
    }

    if (colorMode === "light") {
        if (isNow) return "green.400";

        if (isPending) return "cyan.500";

        return "pink.500";
    }
}

export default function Card(props: Props) {
    const { cabinet, lessonTime, subject, teacher, changes, date } = props;

    const badge = getBadges(changes);

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
                    {badge}
                    <p>{subject}</p>
                    <HStack
                        w={"100%"}
                        justifyContent={"space-around"}
                    >
                        <p>{teacher}</p>
                        <p>{cabinet}</p>
                    </HStack>
                </VStack>
            </HStack>
        </ChakraCard>
    );
}
