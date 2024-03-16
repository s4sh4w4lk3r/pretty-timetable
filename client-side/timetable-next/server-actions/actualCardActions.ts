"use server";

import { revalidatePath } from "next/cache";
import config from "@/configs/config";
import { ClientResult } from "@/types/result";
import { deleteEntity, putEntity } from "./actionsFetchWrappers";
import { putActualCardSchema } from "@/fetching/admin/zodSchemas";
import { z } from "zod";

const baseApiUrl = `${config.api.restBaseUrl}/actual/card`;
const revalidate = (groupId: string | number) => revalidatePath(`/timetables/${groupId}`);

type ActualCardErrorsFieldType = ErrorFieldsType<z.infer<typeof putActualCardSchema>>;
type PutProps = { groupId: number; formData: FormData };
export async function putActualCard({ formData, groupId }: PutProps): Promise<ClientResult<ActualCardErrorsFieldType, number>> {
    const rawFormData = Object.fromEntries(formData.entries());
    const valResult = putActualCardSchema.safeParse(rawFormData);

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

export async function deleteActualCard({ cardId, groupId }: { cardId: number; groupId: number }): Promise<ClientResult<null, null>> {
    const res = await deleteEntity({ url: baseApiUrl, id: cardId, revalidateFn: revalidate.bind(null, groupId) });
    if (!res.success) {
        return { success: false, message: res.description, errors: null };
    } else {
        return { success: true, message: res.description, value: null };
    }
}
