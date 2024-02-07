import * as queries from "@/fetching/graphql/queries";
import { ActualTimetable, Group, LessonTime } from "@/types/graphql";
import client from "@/configs/graphqlClient";

export async function getTimetable(params: { groupId: number; weekNumber: number }): Promise<ActualTimetable | null> {
    const data = await client.request(queries.getTimetableByIdQuery, params);
    return data!.actualTimetables[0] as ActualTimetable;
}

export async function getGroups(): Promise<Group[] | null> {
    const data = await client.request(queries.getGroupsQuery);
    return data!.groups as Group[];
}

export async function getLessonTimes(): Promise<LessonTime[] | null> {
    const data = await client.request(queries.getLessonTimesQuery);
    return data!.lessonTimes as LessonTime[];
}
