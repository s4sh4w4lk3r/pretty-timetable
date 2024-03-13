import ActualTimetableEditor from "@/components/admin/timetables/actual/ActualTimetableEditor";
import WeekSelector from "@/components/admin/timetables/WeekSelector";
import { getWeekNumbers } from "@/fetching/admin/requests";
import { getActualTimetableWeekDays, getAllLessonTimes, getAllRooms, getAllSubjects, getAllTeachers } from "@/fetching/requests";
import { getTeacherName } from "@/utils/card";
import { HStack, StackDivider, VStack } from "@chakra-ui/react";
import { notFound } from "next/navigation";
import React from "react";
type Props = { params: { groupid: string }; searchParams: { weeknumber: string } };
export default async function AdminActualTimetable({ params, searchParams }: Props) {
    const { groupIdInt, weekNumberInt } = { groupIdInt: Number.parseInt(params.groupid), weekNumberInt: Number.parseInt(searchParams.weeknumber) };

    Number.isSafeInteger(groupIdInt) ? null : notFound();

    const weekNumbers = await getWeekNumbers({ groupId: groupIdInt });
    const actualTimetable = Number.isSafeInteger(weekNumberInt)
        ? await getActualTimetableWeekDays({ groupId: groupIdInt, weekNumber: weekNumberInt })
        : null;

    const [subjects, teachers, rooms, lessonTimes] = await Promise.all([getAllSubjects(), getAllTeachers(), getAllRooms(), getAllLessonTimes()]);

    const lessonTimeOptions = lessonTimes.map(lt => (
        <option
            value={lt.id}
            key={lt.id}
        >{`${lt.number} пара`}</option>
    ));

    const roomOptions = rooms.map(r => (
        <option
            key={r.id}
            value={r.id}
        >{`${r.address}, ${r.number}`}</option>
    ));

    const subjectOptions = subjects.map(s => (
        <option
            key={s.id}
            value={s.id}
        >
            {s.name}
        </option>
    ));

    const teacherOptions = teachers.map(t => (
        <option
            key={t.id}
            value={t.id}
        >
            {getTeacherName(t)}
        </option>
    ));

    return (
        <VStack w={"full"}>
            <WeekSelector weekNumbers={weekNumbers} />

            {actualTimetable ? (
                <HStack
                    justifyContent={"space-around"}
                    w={"full"}
                    divider={<StackDivider />}
                >
                    <VStack
                        alignItems={"stretch"}
                        gap={4}
                    >
                        <ActualTimetableEditor
                            lessonTimeOptions={lessonTimeOptions}
                            roomOptions={roomOptions}
                            subjectOptions={subjectOptions}
                            teacherOptions={teacherOptions}
                            actualTimetable={actualTimetable}
                        />
                    </VStack>
                </HStack>
            ) : null}
        </VStack>
    );
}

// FIXME убрать полчение квери парамсов
