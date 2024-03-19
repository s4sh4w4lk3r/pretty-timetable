import EditorTabs from "@/components/admin/timetables/EditorTabs";
import { getAllCachedSubjects, getAllCachedTeachers, getAllCachedRooms, getAllCachedLessonTimes } from "@/fetching/cachedData";
import { AdminProviders } from "@/utils/Providers";
import React from "react";

export default async function AdminTimetablesGroupIdLayout({ children, params }: { children: React.ReactNode; params: { groupid: string } }) {
    const [subjects, teachers, rooms, lessonTimes] = await Promise.all([
        getAllCachedSubjects(),
        getAllCachedTeachers(),
        getAllCachedRooms(),
        getAllCachedLessonTimes(),
    ]);
    return (
        <AdminProviders value={{ subjects, teachers, rooms, lessonTimes }}>
            <EditorTabs groupId={params.groupid}>{children}</EditorTabs>
        </AdminProviders>
    );
}
