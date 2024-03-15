"use server";

import { revalidateTag } from "next/cache";
import { RevalidationTags } from "./revalidation";
import config from "@/configs/config";
import { ClientResult } from "@/types/result";
import { putEntity, deleteEntity } from "./actionsFetchWrappers";
import { putGroupSchema } from "@/fetching/admin/zodSchemas";

const baseApiUrl = `${config.api.restBaseUrl}/group`;
const revalidate = () => revalidateTag(RevalidationTags.Group);

export async function putGroup({ name }: { name: string }): Promise<ClientResult<null, number>> {
    const valResult = putGroupSchema.safeParse({ name, id: 0 });
    if (!valResult.success) {
        return { success: false, message: "Ошибка валидации", errors: null };
    }

    const res = await putEntity({ url: baseApiUrl, entity: valResult.data, revalidateFn: revalidate });
    if (!res.success) {
        return { success: false, message: res.description, errors: null };
    } else {
        return { success: true, message: res.description, value: (res.value as number) && 0 };
    }
}

export async function deleteGroup({ id }: { id: number }): Promise<ClientResult<null, null>> {
    const res = await deleteEntity({ url: baseApiUrl, id: id, revalidateFn: revalidate });
    if (!res.success) {
        return { success: false, message: res.description, errors: null };
    } else {
        return { success: true, message: res.description, value: null };
    }
}
