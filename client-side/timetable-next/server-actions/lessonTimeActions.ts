"use server";

import ServiceResult from "@/types/serviceResult";

const restApiUrl = process.env.REST_URL!;
export async function createLessonTime(params: { number: number; startsAt: string; endsAt: string }) {
    const res = await fetch(`${restApiUrl}/lessontime`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ id: 0, ...params }),
    });
    console.log((await res.json()) as ServiceResult);
}

export async function updateLessonTime(params: { id: number; number: number; startsAt: string; endsAt: string }) {
    const res = await fetch(`${restApiUrl}/lessontime`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(params),
    });
    console.log((await res.json()) as ServiceResult);
}

export async function deleteLessonTime({ id }: { id: number }) {
    const res = await fetch(`${restApiUrl}/lessontime?id=${id}`, {
        method: "DELETE",
    });
    console.log((await res.json()) as ServiceResult);
}
