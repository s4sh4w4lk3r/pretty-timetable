"use server";

import { revalidateTag } from "next/cache";
import { RevalidationTags } from "./revalidation";
import config from "@/configs/config";
import { putRoomSchema } from "@/fetching/admin/zodSchemas";
import { deleteEntity, putEntity } from "./actionsFetchWrappers";
import { ClientResult } from "@/types/result";
import { z } from "zod";

const baseApiUrl = `${config.api.restBaseUrl}/room`;
const revalidate = () => revalidateTag(RevalidationTags.Room);

type RoomErrorsFieldType = ErrorFieldsType<z.infer<typeof putRoomSchema>>;

export async function putRoom(formData: FormData): Promise<ClientResult<RoomErrorsFieldType, number>> {
    const rawFormData = Object.fromEntries(formData.entries());
    const valResult = putRoomSchema.safeParse(rawFormData);
    if (!valResult.success) {
        return { success: false, message: "Ошибка валидации", errors: valResult.error.flatten().fieldErrors };
    }

    const res = await putEntity({ url: baseApiUrl, entity: valResult.data, revalidateFn: revalidate });
    if (!res.success) {
        return { success: false, message: res.description, errors: {} };
    } else {
        return { success: true, message: res.description, value: (res.value as number) && 0 };
    }
}

export async function deleteRoom({ id }: { id: number }): Promise<ClientResult<null, null>> {
    const res = await deleteEntity({ url: baseApiUrl, id: id, revalidateFn: revalidate });
    if (!res.success) {
        return { success: false, message: res.description, errors: null };
    } else {
        return { success: true, message: res.description, value: null };
    }
}
