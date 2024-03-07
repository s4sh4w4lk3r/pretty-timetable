import config from "@/configs/config";
import { AdminQueries } from "../persistedQueries";
import { getRoomsSchema, getSubjectsSchema } from "./zodSchemas";

export async function getRooms() {
    const query = AdminQueries.AllRooms;

    const res = await fetch(`${config.api.graphQLBaseUrl}/?id=${query}`, {
        method: "GET",
        cache: "no-store",
    });

    const rooms = getRoomsSchema.parse(await res.json());
    return rooms.data.rooms;
}

export async function getSubjects() {
    const query = AdminQueries.AllSubjects;

    const res = await fetch(`${config.api.graphQLBaseUrl}/?id=${query}`, {
        method: "GET",
        cache: "no-store",
    });

    const subjects = getSubjectsSchema.parse(await res.json());
    return subjects.data;
}
