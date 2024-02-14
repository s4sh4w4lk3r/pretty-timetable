import LessonTime from "@/components/lessontime/LessonTime";
import alertNoData from "@/components/miscellaneous/alertNoData";
import { getLessonTimes } from "@/fetching/server/getRequests";
import { VStack } from "@chakra-ui/react";

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
                {lessonTimesElement}
            </VStack>
        </>
    );
}
