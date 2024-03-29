import StableTimetableEditor from "@/components/admin/timetables/stable/StableTimetableEditor";
import { getStableTimetable } from "@/fetching/requests";
import { Center } from "@chakra-ui/react";
import { notFound } from "next/navigation";
import React from "react";

export default async function AdminStableTimetables({ params }: { params: { groupid: string } }) {
    const groupIdInt = Number.parseInt(params.groupid);
    Number.isSafeInteger(groupIdInt) ? null : notFound();
    const stableTimetable = await getStableTimetable({ groupId: groupIdInt });

    return (
        <Center>
            <StableTimetableEditor stableTimetable={stableTimetable}></StableTimetableEditor>
        </Center>
    );
}
