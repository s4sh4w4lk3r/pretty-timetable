"use server";

import ServiceResult from "@/types/result";
import { checkIsAuthorized } from "./actionsFetchWrappers";
import config from "@/configs/config";
import { getWeekNumber } from "@/utils/date";

export async function importAsc(file: File) {
    const formData = new FormData();
    formData.append("timetable", file);

    const session = await checkIsAuthorized();

    if (!session.success) return { success: false, message: session.description };

    try {
        const response = await fetch(`${config.api.restBaseUrl}/stable/asc/timetable`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${session.token}`,
            },
            body: formData,
        });

        const result = (await response.json()) as ServiceResult;
        return { success: result.success, message: result.description };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Что-то пошло не так. См. логи на сервере." };
    }
}

export async function migrate() {
    const session = await checkIsAuthorized();

    if (!session.success) return { success: false, message: session.description };

    try {
        const response = await fetch(`${config.api.restBaseUrl}/utils/apply-migration`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${session.token}`,
            },
        });

        const result = (await response.json()) as ServiceResult;
        return { success: result.success, message: result.description };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Что-то пошло не так. См. логи на сервере." };
    }
}

export async function project(formData: FormData) {
    const rawFormData = Object.fromEntries(formData.entries());
    const date = new Date(rawFormData.date.toString());
    const weekNumber = getWeekNumber(date);

    if (!Number.isSafeInteger(weekNumber)) return { success: false, message: "Дата не выбрана." };

    const session = await checkIsAuthorized();
    if (!session.success) return { success: false, message: session.description };

    try {
        const response = await fetch(`${config.api.restBaseUrl}/actual/convert-from-stable/mon-to-fri?weeknumber=${weekNumber}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${session.token}`,
            },
        });

        const result = (await response.json()) as ServiceResult;
        console.log(result);
        return { success: result.success, message: result.description };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Что-то пошло не так. См. логи на сервере." };
    }
}
