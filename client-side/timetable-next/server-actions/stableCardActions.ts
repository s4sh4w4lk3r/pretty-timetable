"use server";

import ServiceResult from "@/types/serviceResult";
import { revalidateTag } from "next/cache";
import { RevalidationTags } from "./revalidation";

const baseApiUrl = `${process.env.REST_URL!}/stable/card`;
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
    console.log((await res.json()) as ServiceResult);
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
    console.log((await res.json()) as ServiceResult);
}

export async function deleteStableCard({ id }: { id: number }) {
    const res = await fetch(`${baseApiUrl}?id=${id}`, {
        method: "DELETE",
    });
    revalidate();
    console.log((await res.json()) as ServiceResult);
}
