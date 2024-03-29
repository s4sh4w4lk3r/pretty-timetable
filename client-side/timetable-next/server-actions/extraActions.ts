"use server";

import ServiceResult, { ClientResult } from "@/types/result";
import { checkIsAuthorized } from "./actionsFetchWrappers";
import config from "@/configs/config";
import { getWeekNumber } from "@/utils/date";

export async function importAsc(formData: FormData): Promise<ClientResult<null, null>> {
    const session = await checkIsAuthorized();

    if (!session.success) return { success: false, message: session.description, errors: null };

    try {
        const response = await fetch(`${config.api.restBaseUrl}/stable/asc/timetable`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${session.token}`,
            },
            body: formData,
        });

        const result = (await response.json()) as ServiceResult;
        return result.success
            ? { success: true, message: result.description, value: null }
            : { success: false, message: result.description, errors: null };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Что-то пошло не так. См. логи на сервере.", errors: null };
    }
}

export async function migrate(): Promise<ClientResult<null, null>> {
    const session = await checkIsAuthorized();

    if (!session.success) return { success: false, message: session.description, errors: null };

    try {
        const response = await fetch(`${config.api.restBaseUrl}/utils/apply-migration`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${session.token}`,
            },
        });

        const result = (await response.json()) as ServiceResult;
        return result.success
            ? { success: true, message: result.description, value: null }
            : { success: false, message: result.description, errors: null };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Что-то пошло не так. См. логи на сервере.", errors: null };
    }
}

export async function project(formData: FormData): Promise<ClientResult<null, null>> {
    const rawFormData = Object.fromEntries(formData.entries());
    const date = new Date(rawFormData.date.toString());
    const weekNumber = getWeekNumber(date);

    if (!Number.isSafeInteger(weekNumber)) return { success: false, message: "Дата не выбрана.", errors: null };

    const session = await checkIsAuthorized();
    if (!session.success) return { success: false, message: session.description, errors: null };

    try {
        const response = await fetch(`${config.api.restBaseUrl}/actual/convert-from-stable/mon-to-fri?weeknumber=${weekNumber}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${session.token}`,
            },
        });

        const result = (await response.json()) as ServiceResult;
        return result.success
            ? { success: true, message: result.description, value: null }
            : { success: false, message: result.description, errors: null };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Что-то пошло не так. См. логи на сервере.", errors: null };
    }
}
