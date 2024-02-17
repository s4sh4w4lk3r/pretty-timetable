"use server";

import ServiceResult from "@/types/serviceResult";

const baseApiUrl = `${process.env.REST_URL!}/actual/card`;
export async function createActualCard(params: {
    cabinetId: number;
    isCanceled: boolean;
    isModified: boolean;
    isMoved: boolean;
    lessonTimeId: number;
    subGroup: number;
    subjectId: number;
    teacherId: number;
    relatedTimetableId: number;
    date: string;
}) {
    const res = await fetch(baseApiUrl, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ id: 0, ...params }),
    });
    console.log((await res.json()) as ServiceResult);
}

export async function updateActualCard(params: {
    id: number;
    cabinetId: number;
    isCanceled: boolean;
    isModified: boolean;
    isMoved: boolean;
    lessonTimeId: number;
    subGroup: number;
    subjectId: number;
    teacherId: number;
    relatedTimetableId: number;
    date: string;
}) {
    const res = await fetch(baseApiUrl, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(params),
    });
    console.log((await res.json()) as ServiceResult);
}

export async function deleteActualCard({ id }: { id: number }) {
    const res = await fetch(`${baseApiUrl}?id=${id}`, {
        method: "DELETE",
    });
    console.log((await res.json()) as ServiceResult);
}
