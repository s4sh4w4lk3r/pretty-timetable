"use server";

import { revalidateTag } from "next/cache";
import { RevalidationTags } from "./revalidation";
import config from "@/configs/config";
import { ClientResult, putEntity } from "./actionsFetchWrappers";
import { serviceResultSchema, updateRoomSchema } from "@/fetching/admin/zodSchemas";

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

    const result = serviceResultSchema.safeParse(await res.json());
    return result.success ? result.data : result.error;
}

export async function updateRoom(prevState: any, formData: FormData): Promise<ClientResult> {
    const rawFormData = Object.fromEntries(formData.entries());
    const valResult = updateRoomSchema.safeParse(rawFormData);

    if (!valResult.success) {
        console.error(valResult.error.flatten());
        return { message: "check logs", success: false };
    }

    const res = await putEntity({ url: baseApiUrl, entity: valResult.data, revalidateFn: revalidate });
    return res;
}

export async function deleteRoom({ id }: { id: number }) {
    const res = await fetch(`${baseApiUrl}?id=${id}`, {
        method: "DELETE",
    });
    revalidate();

    const result = serviceResultSchema.safeParse(await res.json());
    return result.success ? result.data : result.error;
}
