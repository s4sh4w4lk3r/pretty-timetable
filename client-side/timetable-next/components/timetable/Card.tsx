import React from "react";
import { Badge, Card as ChakraCard, HStack, StackDivider, VStack } from "@chakra-ui/react";

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
    status: StatusType;
    changes: ChangesType;
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

function getStatusHighlighting(status: StatusType) {
    if (status === "now") return "green";

    if (status === "pending") return "cyan";

    return "pink";
}

export default function Card(props: Props) {
    const { cabinet, lessonTime, status, subject, teacher, changes } = props;

    const badge = getBadges(changes);
    const highlighting = getStatusHighlighting(status);

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
