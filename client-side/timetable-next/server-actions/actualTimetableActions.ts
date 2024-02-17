"use server";

import ServiceResult from "@/types/serviceResult";
import { revalidateTag } from "next/cache";
import { RevalidationTags } from "./revalidation";

const baseApiUrl = `${process.env.REST_URL!}/actual`;
const revalidate = () => revalidateTag(RevalidationTags.ActualTimetable);

export async function createActualTimetable(params: { groupId: number; weekNumber: number }) {
    const res = await fetch(baseApiUrl, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ id: 0, ...params }),
    });
    revalidate();
    console.log((await res.json()) as ServiceResult);
}

export async function updateActualTimetable(params: { id: number; groupId: number; weekNumber: number }) {
    const res = await fetch(baseApiUrl, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(params),
    });
    revalidate();
    console.log((await res.json()) as ServiceResult);
}

export async function deleteActualTimetable({ id }: { id: number }) {
    const res = await fetch(`${baseApiUrl}?id=${id}`, {
        method: "DELETE",
    });
    revalidate();
    console.log((await res.json()) as ServiceResult);
}
