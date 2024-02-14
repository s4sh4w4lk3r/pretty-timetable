"use server";

import ServiceResult from "@/types/serviceResult";

const restApiUrl = process.env.REST_URL!;
export async function createTeacher(params: { lastname: string; firstname: string; middlename: string }) {
    const res = await fetch(`${restApiUrl}/teacher`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ id: 0, ...params }),
    });
    console.log((await res.json()) as ServiceResult);
}

export async function updateTeacher(params: { id: number; lastname: string; firstname: string; middlename: string }) {
    const res = await fetch(`${restApiUrl}/teacher`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(params),
    });
    console.log((await res.json()) as ServiceResult);
}

export async function deleteTeacher({ id }: { id: number }) {
    const res = await fetch(`${restApiUrl}/teacher?id=${id}`, {
        method: "DELETE",
    });
    console.log((await res.json()) as ServiceResult);
}
