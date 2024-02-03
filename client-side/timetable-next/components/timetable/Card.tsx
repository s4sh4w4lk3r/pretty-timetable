import React from "react";
import { Badge, Card as ChakraCard, HStack, StackDivider, VStack } from "@chakra-ui/react";

type StatusType = "none" | "now" | "pending";
type ChangesType = "none" | "canceled" | "modified";
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

function getBadge(changes: ChangesType) {
    const canceledBadge = <Badge color={"red.500"}>ОТМЕНЕН</Badge>;
    const modifiedBadge = <Badge color={"yellow.500"}>ЗАМЕНА</Badge>;

    if (changes === "canceled") return canceledBadge;
    if (changes === "modified") return modifiedBadge;
    return null;
}

function getStatusHighlighting(status: StatusType) {
    if (status === "now") return "green";

    if (status === "pending") return "cyan";

    return "pink";
}

export default function Card(props: Props) {
    const { cabinet, lessonTime, status, subject, teacher, changes } = props;

    const badge = getBadge(changes);
    const highlighting = getStatusHighlighting(status);

    return (
        <ChakraCard
            maxW={"350px"}
            maxH={"150px"}
            px={"5px"}
            borderColor={highlighting}
            borderWidth={"2px"}
        >
            <HStack divider={<StackDivider />}>
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
