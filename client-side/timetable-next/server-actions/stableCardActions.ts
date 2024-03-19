"use server";

import config from "@/configs/config";
import { revalidatePath } from "next/cache";
import { deleteEntity, putEntity } from "./actionsFetchWrappers";
import { ClientResult } from "@/types/result";
import { z } from "zod";
import { putStableCardSchema } from "@/fetching/admin/zodSchemas";

const baseApiUrl = `${config.api.restBaseUrl}/stable/card`;
const revalidate = (groupId: string | number) => revalidatePath(`/admin/timetables/${groupId}/stable`);

type StableCardErrorsFieldType = ErrorFieldsType<z.infer<typeof putStableCardSchema>>;
type PutProps = { groupId: number; formData: FormData };
export async function putStableCard({ formData, groupId }: PutProps): Promise<ClientResult<StableCardErrorsFieldType, number>> {
    const rawFormData = Object.fromEntries(formData.entries());
    const valResult = putStableCardSchema.safeParse(rawFormData);

    if (!valResult.success) {
        return { success: false, message: "Ошибка валидации", errors: valResult.error.flatten().fieldErrors };
    }

    const res = await putEntity({ url: baseApiUrl, entity: valResult.data, revalidateFn: revalidate.bind(null, groupId) });
    if (!res.success) {
        return { success: false, message: res.description, errors: {} };
    } else {
        return { success: true, message: res.description, value: (res.value as number) && 0 };
    }
}

export async function deleteStableCard({ cardId, groupId }: { cardId: number; groupId: number }): Promise<ClientResult<null, null>> {
    const res = await deleteEntity({ url: baseApiUrl, id: cardId, revalidateFn: revalidate.bind(null, groupId) });
    if (!res.success) {
        return { success: false, message: res.description, errors: null };
    } else {
        return { success: true, message: res.description, value: null };
    }
}
