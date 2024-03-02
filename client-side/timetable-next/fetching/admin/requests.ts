import config from "@/configs/config";
import { AdminQueries } from "../persistedQueries";
import { roomsSchema } from "./zodSchemas";

export async function getRooms() {
    const query = AdminQueries.AllRooms;

    const res = await fetch(`${config.api.graphQLBaseUrl}/?id=${query}`, {
        method: "GET",
        cache: "no-store",
    });

    const rooms = roomsSchema.parse(await res.json());
    return rooms.data.rooms;
}
