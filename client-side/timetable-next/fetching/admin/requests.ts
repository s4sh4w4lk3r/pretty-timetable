import config from "@/configs/config";
import { AdminQueries } from "../persistedQueries";
import { getAllActualCardsByGroupAndWeekSchema, getWeekNumbersSchema } from "./zodSchemas";

export async function getWeekNumbers({ groupId }: { groupId: number }) {
    const query = AdminQueries.WeekNumbers;

    const res = await fetch(`${config.api.graphQLBaseUrl}/?id=${query}&variables={"groupId": ${groupId}}`, {
        method: "GET",
        cache: "no-store",
    });

    const root = getWeekNumbersSchema.parse(await res.json());
    return root.data.weekNumbers;
}

export async function getAllActualCardsByGroupAndWeek({ groupId, weekNumber }: { groupId: number; weekNumber: number }) {
    const query = AdminQueries.AdminGetAllActualCardsByWeekAndGroup;

    const res = await fetch(`${config.api.graphQLBaseUrl}/?id=${query}&variables={"groupId": ${groupId},"weekNumber": ${weekNumber}}`, {
        method: "GET",
        cache: "no-store",
    });

    const root = getAllActualCardsByGroupAndWeekSchema.parse(await res.json());
    return root.data.actualCards;
}
