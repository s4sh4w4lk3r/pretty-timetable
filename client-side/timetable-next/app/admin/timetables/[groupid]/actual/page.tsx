import ActualTimetableEditor from "@/components/admin/timetables/actual/ActualTimetableEditor";
import WeekSelector from "@/components/admin/timetables/WeekSelector";
import { getWeekNumbers } from "@/fetching/admin/requests";
import { getActualTimetableWeekDays } from "@/fetching/requests";
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
                        <ActualTimetableEditor actualTimetable={actualTimetable} />
                    </VStack>
                </HStack>
            ) : null}
        </VStack>
    );
}
