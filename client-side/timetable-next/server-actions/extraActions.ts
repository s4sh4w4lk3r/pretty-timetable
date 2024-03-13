"use server";

import { ClientResult } from "@/types/result";
import { checkIsAuthorized } from "./actionsFetchWrappers";
import config from "@/configs/config";

export async function importAsc(form: FormData) {
    const session = await checkIsAuthorized();

    if (!session.success) return { success: false, message: session.description };

    try {
        const response = await fetch(`${config.api.restBaseUrl}/stable/asc/timetable`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${session.token}`,
            },
            body: form,
        });

        const result = (await response.json()) as ClientResult<null, null>;
        return { success: result.success, message: result.message };
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

        const result = (await response.json()) as ClientResult<null, null>;
        return { success: result.success, message: result.message };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Что-то пошло не так. См. логи на сервере." };
    }
}
