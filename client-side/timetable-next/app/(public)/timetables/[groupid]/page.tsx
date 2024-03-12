import Card from "@/components/timetable/Card";
import CardBox from "@/components/timetable/CardBox";
import { getActualTimetable, getActualTimetableWeekDays, getHighLevelData } from "@/fetching/requests";
import { getTeacherName } from "@/utils/card";
import { getWeekNumber } from "@/utils/date";
import parseGroup from "@/utils/parseGroup";
import { Center, SimpleGrid, Text } from "@chakra-ui/react";
import { notFound } from "next/navigation";

type Props = {
    params: { groupid: string };
    searchParams: { subgroup: string | undefined };
};

export async function generateStaticParams() {
    const groups = (await getHighLevelData()).groups;
    const fetchPromises = groups.map(g => getActualTimetable({ groupId: g.id, weekNumber: getWeekNumber(new Date()) }));

    const slugs = groups.map(g => ({
        groupid: g.id.toString(),
    }));

    await Promise.all(fetchPromises);
    return slugs;
}

export default async function Timetable({ params, searchParams }: Props) {
    const group = parseGroup(params.groupid, searchParams.subgroup);
    if (!group) {
        notFound();
    }

    const timetable = await getActualTimetableWeekDays({ groupId: group.groupId, weekNumber: getWeekNumber(new Date()) });

    const cardBoxes = timetable.timetableFiltered.map(tt => {
        const cardsElement = tt.cards
            .filter(c => (group.subgroup !== "ALL" ? c.subGroup === "ALL" || c.subGroup === group.subgroup : c))
            .map(c => {
                const { id, room, lessonTime, subject, teacher, date } = c;
                return (
                    <Card
                        id={id}
                        key={id}
                        room={room.number}
                        lessonTime={lessonTime}
                        subject={subject.name}
                        teacher={getTeacherName({ ...teacher })}
                        changes={{ ...c }}
                        date={date}
                    />
                );
            });
        return (
            <CardBox
                key={tt.dayOfWeek.dayOfWeek}
                dayOfWeek={tt.dayOfWeek.long}
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

    const timetable = await getActualTimetable({ groupId: group.groupId, weekNumber: getWeekNumber(new Date()) });

    if (!timetable) {
        return null;
    }

    return {
        title: `${timetable.group.name} ${group?.subgroup}`,
    };
}
// FIXME: надо сделать валидацию каждый день, а то на новую неделю показывается прошлое закешированное расписание
