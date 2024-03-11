import "server-only";
import { SharedQueries } from "./persistedQueries";
import { RevalidationTags } from "@/server-actions/revalidation";
import { getHighLevelDataSchema } from "./zodSchemas";
import config from "@/configs/config";

export async function getHighLevelData() {
    const query = SharedQueries.HighLevelData;

    const res = await fetch(`${config.api.graphQLBaseUrl}/?id=${query}`, {
        method: "GET",
        next: {
            tags: [RevalidationTags.Group, RevalidationTags.LessonTime, RevalidationTags.Room, RevalidationTags.Subject, RevalidationTags.Teacher],
        },
    });

    const timetables = await getHighLevelDataSchema.parseAsync(await res.json());
    return timetables.data;
}
