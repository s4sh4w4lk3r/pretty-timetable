import Card from "@/components/timetable/Card";
import CardBox from "@/components/timetable/CardBox";
import { getDailyCards, getWeekNumber } from "@/utils/date";
import { parseGroup } from "@/utils/groups";
import { Center, SimpleGrid, Text } from "@chakra-ui/react";
import { notFound } from "next/navigation";
import { PublicFetches } from "@/fetching/fetchRequests";

type Props = {
    params: { groupid: string };
    searchParams: { subgroup: string | undefined };
};

export default async function Timetable({ params, searchParams }: Props) {
    const group = parseGroup(params.groupid, searchParams.subgroup);
    if (!group) {
        notFound();
    }

    const timetable = await PublicFetches.getTimetable({ groupId: group.groupId, weekNumber: getWeekNumber(new Date()) });
    if (!timetable || !timetable.cards) {
        notFound();
    }

    const { cards } = timetable;
    const dailyCards = getDailyCards(cards, group.subgroup);
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

export async function generateMetadata({ params, searchParams }: Props) {
    const group = parseGroup(params.groupid, searchParams.subgroup);
    if (!group) {
        return null;
    }

    const timetable = await PublicFetches.getTimetable({ groupId: group.groupId, weekNumber: getWeekNumber(new Date()) });

    if (!timetable) {
        return null;
    }

    return {
        title: `${timetable.group.name} ${group?.subgroup}`,
    };
}
