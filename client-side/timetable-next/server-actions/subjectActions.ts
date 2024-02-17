"use server";

import ServiceResult from "@/types/serviceResult";

const baseApiUrl = `${process.env.REST_URL!}/subject`;
export async function createSubject(params: { name: string }) {
    const res = await fetch(baseApiUrl, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ id: 0, ...params }),
    });
    console.log((await res.json()) as ServiceResult);
}

export async function updateSubject(params: { id: number; name: string }) {
    const res = await fetch(baseApiUrl, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(params),
    });
    console.log((await res.json()) as ServiceResult);
}

export async function deleteSubject({ id }: { id: number }) {
    const res = await fetch(`${baseApiUrl}?id=${id}`, {
        method: "DELETE",
    });
    console.log((await res.json()) as ServiceResult);
}
