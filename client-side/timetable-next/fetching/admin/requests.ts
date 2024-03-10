import config from "@/configs/config";
import { AdminQueries } from "../persistedQueries";
import { getRoomsSchema, getSubjectsSchema, getTeachersSchema, getWeekNumbersSchema } from "./zodSchemas";

export async function getRooms() {
    const query = AdminQueries.AllRooms;

    const res = await fetch(`${config.api.graphQLBaseUrl}/?id=${query}`, {
        method: "GET",
        cache: "no-store",
    });

    const root = getRoomsSchema.parse(await res.json());
    return root.data.rooms;
}

export async function getSubjects() {
    const query = AdminQueries.AllSubjects;

    const res = await fetch(`${config.api.graphQLBaseUrl}/?id=${query}`, {
        method: "GET",
        cache: "no-store",
    });

    const root = getSubjectsSchema.parse(await res.json());
    return root.data.subjects;
}

export async function getTeachers() {
    const query = AdminQueries.AllTeachers;

    const res = await fetch(`${config.api.graphQLBaseUrl}/?id=${query}`, {
        method: "GET",
        cache: "no-store",
    });

    const root = getTeachersSchema.parse(await res.json());
    return root.data.teachers;
}

export async function getWeekNumbers() {
    const query = AdminQueries.WeekNumbers;

    const res = await fetch(`${config.api.graphQLBaseUrl}/?id=${query}`, {
        method: "GET",
        cache: "no-store",
    });

    const root = getWeekNumbersSchema.parse(await res.json());
    return root.data.weekNumbers;
}
