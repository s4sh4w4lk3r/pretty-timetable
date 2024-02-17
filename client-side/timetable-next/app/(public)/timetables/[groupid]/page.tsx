import Card from "@/components/timetable/Card";
import CardBox from "@/components/timetable/CardBox";
import { ActualCard, ActualTimetable } from "@/types/api";
import { getDailyCards, getWeekNumber } from "@/utils/date";
import { parseGroup } from "@/utils/groups";
import { Center, SimpleGrid, Text } from "@chakra-ui/react";
import { notFound } from "next/navigation";

type Props = {
    params: { groupid: string };
    searchParams: { subgroup: string | undefined };
};

export default async function Timetable({ params, searchParams }: Props) {
    const group = parseGroup(params.groupid, searchParams.subgroup);
    if (!group) {
        notFound();
    }

    const timetable = await getTimetable({ groupId: group.groupId, weekNumber: getWeekNumber(new Date()) });
    if (!timetable || !timetable.cards) {
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

async function getTimetable({ groupId, weekNumber }: { groupId: number; weekNumber: number }) {
    const query = "GetActualTimetableByGroupId";

    const res = await fetch(`${process.env.GRAPHQL_URL}/?id=${query}&variables={"groupId":${groupId},"weekNumber":${weekNumber}}`, {
        method: "GET",
    });

    const timetables = (await res.json()).data.actualTimetables as ActualTimetable[];
    if (!timetables) {
        return null;
    }

    return timetables[0];
    // FIXME : может можно сделать как-то плоским это
}

export async function generateMetadata({ params, searchParams }: Props) {
    const group = parseGroup(params.groupid, searchParams.subgroup);
    if (!group) {
        return null;
    }

    const timetable = await getTimetable({ groupId: group.groupId, weekNumber: getWeekNumber(new Date()) });

    if (!timetable) {
        return null;
    }

    return {
        title: `${timetable.group.name} ${group?.subgroup}`,
    };
}
