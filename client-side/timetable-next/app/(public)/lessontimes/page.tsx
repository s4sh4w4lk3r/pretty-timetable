import LessonTime from "@/components/lessontime/LessonTime";
import alertNoData from "@/components/miscellaneous/alertNoData";
import { RevalidationTags } from "@/server-actions/revalidation";
import { LessonTime as LessonTimeType } from "@/types/api";
import { Text, VStack } from "@chakra-ui/react";

export default async function LessonTimes() {
    const lessontimes = await getLessonTimes();
    if (!lessontimes) {
        return alertNoData;
    }

    const lessonTimesElement = lessontimes.map(l => (
        <LessonTime
            key={l.id}
            {...l}
        ></LessonTime>
    ));

    return (
        <>
            <VStack
                gap={4}
                mt={20}
            >
                <Text fontSize={"3xl"}>Расписание звонков</Text>
                {lessonTimesElement}
            </VStack>
        </>
    );
}

async function getLessonTimes() {
    const query = "GetAllLessonTimes";
    const res = await fetch(`${process.env.GRAPHQL_URL}/?id=${query}`, {
        method: "GET",
        next: { tags: [RevalidationTags.LessonTime] },
    });

    const lessonTimes = (await res.json()).data.lessonTimes as LessonTimeType[];
    if (!lessonTimes) {
        return null;
    }

    return lessonTimes;
}
