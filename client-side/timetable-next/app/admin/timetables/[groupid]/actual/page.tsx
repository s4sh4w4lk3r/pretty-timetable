import ActualCardEditor from "@/components/admin/timetables/ActualCardEditor";
import WeekDaysBar from "@/components/admin/timetables/WeekDaysBar";
import WeekSelector from "@/components/admin/timetables/WeekSelector";
import { getAllActualCardsByGroupAndWeek, getWeekNumbers } from "@/fetching/admin/requests";
import { HStack, StackDivider, VStack } from "@chakra-ui/react";
import { notFound } from "next/navigation";
import React from "react";
type Props = { params: { groupid: string }; searchParams: { weeknumber: string } };
export default async function AdminActualTimetable({ params, searchParams }: Props) {
    const { groupIdInt, weekNumberInt } = { groupIdInt: Number.parseInt(params.groupid), weekNumberInt: Number.parseInt(searchParams.weeknumber) };

    Number.isSafeInteger(groupIdInt) ? null : notFound();

    const weekNumbers = await getWeekNumbers({ groupId: groupIdInt });
    const actualCards = Number.isSafeInteger(weekNumberInt)
        ? await getAllActualCardsByGroupAndWeek({ groupId: groupIdInt, weekNumber: weekNumberInt })
        : null;

    return (
        <VStack w={"full"}>
            <WeekSelector weekNumbers={weekNumbers} />

            {actualCards ? (
                <HStack
                    justifyContent={"space-around"}
                    w={"full"}
                    divider={<StackDivider />}
                >
                    <WeekDaysBar></WeekDaysBar>

                    <VStack
                        alignItems={"stretch"}
                        gap={4}
                    >
                        {actualCards.map(ac => (
                            <ActualCardEditor
                                key={ac.id}
                                {...ac}
                            />
                        ))}
                    </VStack>
                </HStack>
            ) : null}
        </VStack>
    );
}
