"use server";

import ServiceResult from "@/types/serviceResult";
import { revalidateTag } from "next/cache";
import { RevalidationTags } from "./revalidation";

const baseApiUrl = `${process.env.REST_URL!}/lessontime`;
const revalidate = () => revalidateTag(RevalidationTags.LessonTime);

export async function createLessonTime(params: { number: number; startsAt: string; endsAt: string }) {
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

export async function updateLessonTime(params: { id: number; number: number; startsAt: string; endsAt: string }) {
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

export async function deleteLessonTime({ id }: { id: number }) {
    const res = await fetch(`${baseApiUrl}?id=${id}`, {
        method: "DELETE",
    });
    revalidate();
    console.log((await res.json()) as ServiceResult);
}
