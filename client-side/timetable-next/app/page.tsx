import Card from "@/components/timetable/Card";
import CardBox from "@/components/timetable/CardBox";
import { ActualCard, SubGroup } from "@/types/graphql";
import { getTimetable } from "@/fetching/rest/data";
import { getDailyCards } from "@/utils/date";
import { Center, SimpleGrid, Text } from "@chakra-ui/react";

export default async function Home() {
    const { group, cards } = (await getTimetable())[0];
    const dailyCards = getDailyCards(cards as ActualCard[], SubGroup.FirstGroup);
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
                <Text fontSize={"3xl"}>{group.name}</Text>
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

// FIXME: Везде использовать марджины паддинги и разрмеры из темы!
