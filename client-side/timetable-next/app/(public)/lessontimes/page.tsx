import LessonTime from "@/components/lessontime/LessonTime";
import alertNoData from "@/components/miscellaneous/alertNoData";
import { LessonTime as LessonTimeType } from "@/types/api";
import { Text, VStack } from "@chakra-ui/react";

async function getLessonTimes() {
    const query = "GetAllLessonTimes";
    const res = await fetch(`${process.env.GRAPHQL_URL}/?id=${query}`, { method: "GET" });
    return (await res.json()).data.lessonTimes as LessonTimeType[];
    // FIXME : может можно сделать как-то плоским это
}

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
