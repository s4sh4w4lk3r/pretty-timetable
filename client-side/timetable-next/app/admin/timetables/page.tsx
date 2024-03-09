import TimetableTabs from "@/components/admin/timetables/tabs/TimetableTabs";
import { getGroups } from "@/fetching/public/requests";
import React from "react";

export default async function AdminTimetables() {
    const groups = await getGroups();
    return <TimetableTabs groups={groups}></TimetableTabs>;
}
