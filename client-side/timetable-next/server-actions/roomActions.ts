"use server";

import { AdminZodFetchSchemas } from "@/fetching/zodFetchSchemas";
import { revalidateTag } from "next/cache";
import { RevalidationTags } from "./revalidation";
import config from "@/configs/config";

const baseApiUrl = `${config.api.restBaseUrl}/room`;
const revalidate = () => revalidateTag(RevalidationTags.Room);

export async function createRoom(params: { address: string; number: string; fullName: string }) {
    const res = await fetch(baseApiUrl, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ id: 0, ...params }),
    });
    revalidate();

    const result = AdminZodFetchSchemas.serviceResultSchema.safeParse(await res.json());
    return result.success ? result.data : result.error;
}

export async function updateRoom(params: { id: number; address: string; number: string; fullName: string }) {
    const res = await fetch(baseApiUrl, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(params),
    });
    revalidate();

    const result = AdminZodFetchSchemas.serviceResultSchema.safeParse(await res.json());
    return result.success ? result.data : result.error;
}

export async function deleteRoom({ id }: { id: number }) {
    const res = await fetch(`${baseApiUrl}?id=${id}`, {
        method: "DELETE",
    });
    revalidate();

    const result = AdminZodFetchSchemas.serviceResultSchema.safeParse(await res.json());
    return result.success ? result.data : result.error;
}
