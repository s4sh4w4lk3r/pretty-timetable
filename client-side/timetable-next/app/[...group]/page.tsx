import alertNoData from "@/components/miscellaneous/alertNoData";
import Card from "@/components/timetable/Card";
import CardBox from "@/components/timetable/CardBox";
import { getTimetable } from "@/fetching/graphql/requests";
import { ActualCard } from "@/types/graphql";
import { getDailyCards, getWeekNumber } from "@/utils/date";
import { parseGroup } from "@/utils/groups";
import { Center, SimpleGrid, Text } from "@chakra-ui/react";

export default async function Page({ params }: { params: { group: [groupId: string, subGroup: string] } }) {
    const [groupId, subgroup] = params.group;

    const group = parseGroup(groupId, subgroup);
    if (!group) return alertNoData;
    console.log(group);
    // FIXME: возможно не кэшируется
    const timetable = await getTimetable({ groupId: group.groupId, weekNumber: getWeekNumber(new Date()) });
    if (!timetable) {
        return alertNoData;
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
            <Center mt={"10px"}>
                <Text fontSize={"3xl"}>{timetable.group.name}</Text>
            </Center>
            <SimpleGrid
                minChildWidth="380px"
                justifyItems={"center"}
                my={"10px"}
                rowGap={"25px"}
            >
                {cardBoxes}
            </SimpleGrid>
        </>
    );
}
