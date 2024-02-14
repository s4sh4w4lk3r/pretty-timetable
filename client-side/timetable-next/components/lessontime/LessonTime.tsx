import { durationToTimeOnly } from "@/utils/date";
import { Card, HStack, StackDivider, Text } from "@chakra-ui/react";
import React from "react";
type Props = {
    id: number;
    number: number;
    startsAt: string;
    endsAt: string;
};
export default function LessonTime(props: Props) {
    const { number, startsAt: startsAtDuration, endsAt: endsAtDuration } = props;

    const startsAt = durationToTimeOnly(startsAtDuration);
    const endsAt = durationToTimeOnly(endsAtDuration);

    return (
        <Card
            w={"300px"}
            padding={3}
        >
            <HStack
                divider={<StackDivider />}
                maxW={"100%"}
                justifyContent={"space-around"}
                flexGrow={0}
                flexShrink={0}
                textAlign={"center"}
            >
                <Text flexBasis={"50px"}>{number}</Text>
                <Text flexBasis={"100px"}>{startsAt}</Text>
                <Text flexBasis={"100px"}>{endsAt}</Text>
            </HStack>
        </Card>
    );
}
