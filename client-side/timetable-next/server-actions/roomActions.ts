"use server";

import ServiceResult from "@/types/serviceResult";

const restApiUrl = process.env.REST_URL!;
export async function createRoom(params: { address: string; number: string; fullName: string }) {
    const res = await fetch(`${restApiUrl}/room`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ id: 0, ...params }),
    });
    console.log((await res.json()) as ServiceResult);
}

export async function updateRoom(params: { id: number; address: string; number: string; fullName: string }) {
    const res = await fetch(`${restApiUrl}/room`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(params),
    });
    console.log((await res.json()) as ServiceResult);
}

export async function deleteRoom({ id }: { id: number }) {
    const res = await fetch(`${restApiUrl}/room?id=${id}`, {
        method: "DELETE",
    });
    console.log((await res.json()) as ServiceResult);
}
