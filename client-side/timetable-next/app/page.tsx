import Card from "@/components/timetable/Card";
import CardBox from "@/components/timetable/CardBox";
import { getTimetable } from "@/fetching/rest/data";
import { Center, SimpleGrid, Text } from "@chakra-ui/react";

export default async function Home() {
    const cards = (await getTimetable())[0].cards!.slice(0, 5);
    const cardsElement = cards.map(c => {
        const { cabinet, id, subject, teacher, lessonTime } = c;
        return (
            <Card
                id={id}
                key={id}
                cabinet={cabinet.number}
                lessonTime={lessonTime}
                subject={subject.name}
                teacher={teacher.lastname + " " + teacher.firstname}
                status="none"
                changes="none"
            ></Card>
        );
    });

    return (
        <>
            <Center mt={"10px"}>
                <Text fontSize={"3xl"}>{"4ИП-2-20"}</Text>
            </Center>

            <SimpleGrid
                minChildWidth="380px"
                justifyItems={"center"}
                mx={"10px"}
                my={"15px"}
            >
                <CardBox
                    dayOfWeek="Понедельник"
                    doesHighlight={true}
                >
                    {cardsElement}
                </CardBox>
                <CardBox
                    dayOfWeek="Понедельник"
                    doesHighlight={true}
                >
                    {cardsElement}
                </CardBox>
                <CardBox
                    dayOfWeek="Понедельник"
                    doesHighlight={true}
                >
                    {cardsElement}
                </CardBox>
                <CardBox
                    dayOfWeek="Понедельник"
                    doesHighlight={true}
                >
                    {cardsElement}
                </CardBox>
                <CardBox
                    dayOfWeek="Понедельник"
                    doesHighlight={true}
                >
                    {cardsElement}
                </CardBox>
            </SimpleGrid>
        </>
    );
}

// FIXME: Везде использовать марджины паддинги и разрмеры из темы!
// TODO: "Добавить автоскролл на выделенный день"
