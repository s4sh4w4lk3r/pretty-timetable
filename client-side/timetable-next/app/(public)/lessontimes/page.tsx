import LessonTime from "@/components/lessontime/LessonTime";
import { getAllLessonTimes } from "@/fetching/requests";
import { Text, VStack } from "@chakra-ui/react";

export default async function LessonTimes() {
    const lessontimes = await getAllLessonTimes();

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
