import WeekSelector from "@/components/admin/timetables/WeekSelector";
import { getWeekNumbers } from "@/fetching/admin/requests";
import { notFound } from "next/navigation";
import React from "react";
type Props = { params: { groupid: string }; searchParams: { weeknumber: string } };
export default async function AdminActualTimetable({ params, searchParams }: Props) {
    const { groupIdInt, weekNumberInt } = { groupIdInt: Number.parseInt(params.groupid), weekNumberInt: Number.parseInt(searchParams.weeknumber) };

    Number.isSafeInteger(groupIdInt) ? null : notFound();
    const weekNumbers = await getWeekNumbers({ groupId: groupIdInt });

    Number.isSafeInteger(weekNumberInt);

    return <WeekSelector weekNumbers={weekNumbers} />;
}
