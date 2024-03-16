import { getAllCachedSubjects, getAllCachedTeachers, getAllCachedRooms, getAllCachedLessonTimes } from "@/fetching/cachedData";
import { AdminProviders } from "@/utils/Providers";
import React from "react";

export default async function AdminTimetablesGroupIdLayout({ children }: { children: React.ReactNode }) {
    const [subjects, teachers, rooms, lessonTimes] = await Promise.all([
        getAllCachedSubjects(),
        getAllCachedTeachers(),
        getAllCachedRooms(),
        getAllCachedLessonTimes(),
    ]);
    return <AdminProviders value={{ subjects, teachers, rooms, lessonTimes }}>{children}</AdminProviders>;
}
