import * as queries from "@/fetching/graphql/queries";
import { ActualTimetable, Group, LessonTime } from "@/types/graphql";
import client from "@/configs/graphqlClient";

export async function getTimetable(params: { groupId: number; weekNumber: number }): Promise<ActualTimetable | null> {
    const data = await client.request<{ actualTimetables: ActualTimetable[] }>(queries.getTimetableByIdQuery, params);
    return data.actualTimetables[0];
}

export async function getGroups(): Promise<Group[] | null> {
    const data = await client.request<{ groups: Group[] }>(queries.getGroupsQuery);
    return data.groups;
}

export async function getLessonTimes(): Promise<LessonTime[] | null> {
    const data = await client.request<{ lessonTimes: LessonTime[] }>(queries.getLessonTimesQuery);
    return data.lessonTimes;
}
