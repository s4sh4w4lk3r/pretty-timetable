import "server-only";
import config from "@/configs/config";
import { RevalidationTags } from "@/server-actions/revalidation";
import { PublicQueries } from "../persistedQueries";
import { actualTimetablesSchema, groupsSchema, lessonTimesSchema } from "./zodSchemas";

export async function getTimetable({ groupId, weekNumber }: { groupId: number; weekNumber: number }) {
    const query = PublicQueries.ActualTimetableByGroupWeek;

    const res = await fetch(`${config.api.graphQLBaseUrl}/?id=${query}&variables={"groupId":${groupId},"weekNumber":${weekNumber}}`, {
        method: "GET",
        next: { tags: [RevalidationTags.LessonTime, RevalidationTags.Room, RevalidationTags.Subject, RevalidationTags.Teacher] },
    });

    const timetables = await actualTimetablesSchema.parseAsync(await res.json());
    return timetables.data.actualTimetables[0];
}

export async function getLessonTimes() {
    const query = PublicQueries.AllLessonTimes;
    const res = await fetch(`${config.api.graphQLBaseUrl}/?id=${query}`, {
        method: "GET",
        next: { tags: [RevalidationTags.LessonTime] },
    });

    const lessonTimes = lessonTimesSchema.parse(await res.json());
    return lessonTimes.data.lessonTimes;
}

export async function getGroups() {
    const query = PublicQueries.AllGroups;
    const res = await fetch(`${config.api.graphQLBaseUrl}/?id=${query}`, { method: "GET", next: { tags: [RevalidationTags.Group] } });

    const groups = await groupsSchema.parseAsync(await res.json());

    return groups.data.groups;
}
