import * as queries from "@/fetching/graphql/queries";
import { ActualTimetable } from "@/types/graphql";
import client from "@/configs/graphqlClient";

export async function getTimetable(params: { groupId: number; weekNumber: number }): Promise<ActualTimetable | null> {
    const data = await client.request(queries.getTimetableById, params);
    return data!.actualTimetables[0] as ActualTimetable;
}
