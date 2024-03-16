import { unstable_cache } from "next/cache";
import { getAllLessonTimes, getAllRooms, getAllSubjects, getAllTeachers } from "@/fetching/requests";
import { RevalidationTags } from "@/server-actions/revalidation";

export async function getAllCachedSubjects() {
    return await unstable_cache(getAllSubjects, ["all-subjects"], { tags: [RevalidationTags.Subject] })();
}
export async function getAllCachedLessonTimes() {
    return await unstable_cache(async () => await getAllLessonTimes(), ["all-lessontimes"], { tags: [RevalidationTags.LessonTime] })();
}
export async function getAllCachedRooms() {
    return await unstable_cache(async () => await getAllRooms(), ["all-rooms"], { tags: [RevalidationTags.Room] })();
}
export async function getAllCachedTeachers() {
    return await unstable_cache(async () => await getAllTeachers(), ["all-teachers"], { tags: [RevalidationTags.Teacher] })();
}
