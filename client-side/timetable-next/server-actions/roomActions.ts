"use server";

import { revalidateTag } from "next/cache";
import { RevalidationTags } from "./revalidation";
import config from "@/configs/config";
import { serviceResultSchema, updateRoomSchema } from "@/fetching/admin/zodSchemas";
import { deleteEntity, putEntity } from "./actionsFetchWrappers";
import { ClientResult } from "@/types/result";

const baseApiUrl = `${config.api.restBaseUrl}/room`;
const revalidate = () => revalidateTag(RevalidationTags.Room);
type UpdateRoomFields = {
    number?: string[] | undefined;
    id?: string[] | undefined;
    address?: string[] | undefined;
    fullName?: string[] | undefined;
    ascId?: string[] | undefined;
};

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

export async function updateRoom(formData: FormData): Promise<ClientResult<UpdateRoomFields, number>> {
    const rawFormData = Object.fromEntries(formData.entries());
    const valResult = updateRoomSchema.safeParse(rawFormData);
    if (!valResult.success) {
        return { success: false, message: "Ошибка валидации", errors: valResult.error.flatten().fieldErrors };
    }

    const res = await putEntity({ url: baseApiUrl, entity: valResult.data, revalidateFn: revalidate });
    return { success: true, message: res.description, value: (res.value as number) && 0 };
}

export async function deleteRoom({ id }: { id: number }): Promise<ClientResult<null, null>> {
    const res = await deleteEntity({ url: baseApiUrl, id: id, revalidateFn: revalidate });
    if (!res.success) {
        return { success: false, message: res.description, errors: null };
    } else {
        return { success: true, message: res.description, value: null };
    }
}
