import "server-only";
import config from "@/configs/config";
import { RevalidationTags } from "@/server-actions/revalidation";
import { PublicQueries } from "../persistedQueries";
import { actualTimetablesSchema } from "./zodSchemas";

export async function getTimetable({ groupId, weekNumber }: { groupId: number; weekNumber: number }) {
    const query = PublicQueries.ActualTimetableByGroupWeek;

    const res = await fetch(`${config.api.graphQLBaseUrl}/?id=${query}&variables={"groupId":${groupId},"weekNumber":${weekNumber}}`, {
        method: "GET",
        next: { tags: [RevalidationTags.LessonTime, RevalidationTags.Room, RevalidationTags.Subject, RevalidationTags.Teacher] },
    });

    const timetables = await actualTimetablesSchema.parseAsync(await res.json());
    return timetables.data.actualTimetables[0];
}
