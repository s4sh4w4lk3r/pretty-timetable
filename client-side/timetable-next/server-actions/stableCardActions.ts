"use server";

import { serviceResultSchema } from "@/fetching/admin/zodSchemas";
import { revalidateTag } from "next/cache";
import { RevalidationTags } from "./revalidation";
import config from "@/configs/config";

const baseApiUrl = `${config.api.restBaseUrl}/stable/card`;
const revalidate = () => revalidateTag(RevalidationTags.StableCard);

export async function createStableCard(params: {
    teacherId: number;
    subjectId: number;
    cabinetId: number;
    lessonTimeId: number;
    isWeekEven: boolean;
    dayOfWeek: number;
    subGroup: number;
    relatedTimetableId: number;
}) {
    const res = await fetch(baseApiUrl, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ id: 0, ...params }),
    });
    revalidate();

    const result = serviceResultSchema.safeParse(await res.json());
    return result.success ? result.data : result.error;
}

export async function updateStableCard(params: {
    id: number;
    teacherId: number;
    subjectId: number;
    cabinetId: number;
    lessonTimeId: number;
    isWeekEven: boolean;
    dayOfWeek: number;
    subGroup: number;
    relatedTimetableId: number;
}) {
    const res = await fetch(baseApiUrl, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(params),
    });
    revalidate();

    const result = serviceResultSchema.safeParse(await res.json());
    return result.success ? result.data : result.error;
}

export async function deleteStableCard({ id }: { id: number }) {
    const res = await fetch(`${baseApiUrl}?id=${id}`, {
        method: "DELETE",
    });
    revalidate();

    const result = serviceResultSchema.safeParse(await res.json());
    return result.success ? result.data : result.error;
}
