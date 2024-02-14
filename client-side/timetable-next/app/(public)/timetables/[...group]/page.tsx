import Card from "@/components/timetable/Card";
import CardBox from "@/components/timetable/CardBox";
import { getTimetable } from "@/fetching/server/getRequests";
import { ActualCard } from "@/types/graphql";
import { getDailyCards, getWeekNumber } from "@/utils/date";
import { parseGroup } from "@/utils/groups";
import { Center, SimpleGrid, Text } from "@chakra-ui/react";
import { notFound } from "next/navigation";

export const dynamic = "force-static";
export const revalidate = 10;

export default async function Timetable({ params }: { params: { group: [groupId: string, subGroup: string] } }) {
    const [groupId, subgroup] = params.group;

    const group = parseGroup(groupId, subgroup);
    if (!group) {
        notFound();
    }

    const timetable = await getTimetable({ groupId: group.groupId, weekNumber: getWeekNumber(new Date()) });
    if (!timetable) {
        notFound();
    }

    const { cards } = timetable;
    const dailyCards = getDailyCards(cards as ActualCard[], group.subgroup);
    const cardBoxes = dailyCards.map(dc => {
        const cardsElement = dc.cards.map(c => {
            const { id, cabinet, lessonTime, subject, teacher, date } = c;
            return (
                <Card
                    id={id}
                    key={id}
                    cabinet={cabinet.number}
                    lessonTime={lessonTime}
                    subject={subject.name}
                    teacher={teacher.lastname + " " + teacher.firstname}
                    changes={{ ...c }}
                    date={date}
                />
            );
        });
        return (
            <CardBox
                key={dc.dayOfWeek}
                dayOfWeek={dc.dayOfWeek}
                doesHighlight={false}
            >
                {cardsElement}
            </CardBox>
        );
    });

    return (
        <>
            <Center mt={2.5}>
                <Text fontSize={"3xl"}>{timetable.group.name}</Text>
            </Center>
            <SimpleGrid
                minChildWidth="380px"
                justifyItems={"center"}
                my={2.5}
                rowGap={6}
            >
                {cardBoxes}
            </SimpleGrid>
        </>
    );
}
