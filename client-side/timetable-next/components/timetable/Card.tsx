import React from "react";
import { Badge, Card as ChakraCard, HStack, StackDivider, VStack } from "@chakra-ui/react";
import { defineHintsRequired } from "@/utils/cardHints";

type StatusType = "none" | "now" | "pending";
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

function getStatusHighlighting(params: { isNow: boolean; isPending: boolean }) {
    const { isNow, isPending } = params;
    if (isNow) return "green";

    if (isPending) return "cyan";

    return "pink";
}

export default function Card(props: Props) {
    const { cabinet, lessonTime, subject, teacher, changes, date } = props;

    const badge = getBadges(changes);
    const hintsRequired = defineHintsRequired({ lessonStartsAt: lessonTime.startsAt, lessonEndsAt: lessonTime.endsAt, dateFromCard: date });

    const highlighting = getStatusHighlighting(hintsRequired);

    return (
        <ChakraCard
            maxH={"200px"}
            px={"5px"}
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
                    <p>{lessonTime.startsAt.toString()}</p>
                    <p>{lessonTime.endsAt.toString()}</p>
                </VStack>

                <VStack divider={<StackDivider />}>
                    {badge}
                    <p>{subject}</p>
                    <HStack>
                        <p>{teacher}</p>
                        <p>{cabinet}</p>
                    </HStack>
                </VStack>
            </HStack>
        </ChakraCard>
    );
}
