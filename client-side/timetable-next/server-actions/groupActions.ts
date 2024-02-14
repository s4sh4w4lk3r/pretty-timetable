"use server";

import ServiceResult from "@/types/serviceResult";

const restApiUrl = process.env.REST_URL!;
export async function createGroup(params: { name: string }) {
    const res = await fetch(`${restApiUrl}/group`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ id: 0, ...params }),
    });
    console.log((await res.json()) as ServiceResult);
}

export async function updateGroup(params: { id: number; name: string }) {
    const res = await fetch(`${restApiUrl}/group`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(params),
    });
    console.log((await res.json()) as ServiceResult);
}

export async function deleteGroup({ id }: { id: number }) {
    const res = await fetch(`${restApiUrl}/group?id=${id}`, {
        method: "DELETE",
    });
    console.log((await res.json()) as ServiceResult);
}

// TODO : дописать экшены для карточек и расписания
// TODO: потом в экшенах сделать чтобы была ревалидация
