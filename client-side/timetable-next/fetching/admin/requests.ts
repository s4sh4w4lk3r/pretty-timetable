import config from "@/configs/config";
import { AdminQueries } from "../persistedQueries";
import { getWeekNumbersSchema } from "./zodSchemas";

export async function getWeekNumbers({ groupId }: { groupId: number }) {
    const query = AdminQueries.WeekNumbers;

    const res = await fetch(`${config.api.graphQLBaseUrl}/?id=${query}&variables={"groupId": ${groupId}}`, {
        method: "GET",
        cache: "no-store",
    });

    const root = getWeekNumbersSchema.parse(await res.json());
    return root.data.weekNumbers;
}
