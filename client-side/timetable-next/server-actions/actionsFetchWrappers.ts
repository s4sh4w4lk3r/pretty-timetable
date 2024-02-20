import { AdminZodFetchSchemas } from "@/fetching/zodFetchSchemas";

export interface ClientResult {
    success: boolean | null;
    message: string;
}

export async function putEntity<T>({ url, entity, revalidateFn }: { url: string; entity: T; revalidateFn: () => void }): Promise<ClientResult> {
    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(entity),
        });

        if (!response.ok) {
            return await badStatusCodesHandler(response);
        }

        const responseParsed = AdminZodFetchSchemas.serviceResultSchema.safeParse(await response.json());
        if (responseParsed.success) {
            revalidateFn();
            return { message: responseParsed.data.description, success: responseParsed.data.success };
        } else {
            console.error(responseParsed.error);
            return { message: responseParsed.error.message, success: false };
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log(error);
            return { message: error.message, success: false };
        } else console.error(error);
    }
    return { message: "Что-то пошло не так.", success: false };
}

export async function deleteEntity({ url, id, revalidateFn }: { url: string; id: number; revalidateFn: () => void }): Promise<ClientResult> {
    // FIXME: проверить этот метод
    try {
        const response = await fetch(`${url}?id=${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            return await badStatusCodesHandler(response);
        }

        const responseParsed = AdminZodFetchSchemas.serviceResultSchema.safeParse(await response.json());
        if (responseParsed.success) {
            revalidateFn();
            return { message: responseParsed.data.description, success: responseParsed.data.success };
        } else {
            console.error(responseParsed.error);
            return { message: responseParsed.error.message, success: false };
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log(error);
            return { message: error.message, success: false };
        } else console.error(error);
    }
    return { message: "Что-то пошло не так.", success: false };
}

async function badStatusCodesHandler(response: Response): Promise<ClientResult> {
    switch (response.status) {
        // TODO : проверить как отрабатывает 400-ые ошибки
        case 400:
            const responseParsed = AdminZodFetchSchemas.serviceResultSchema.safeParse(await response.json());
            if (responseParsed.success) {
                return { message: JSON.stringify(responseParsed.data), success: false };
            } else console.log(responseParsed.error);

        case 401:
            return { message: "Отсутствует аутентификация.", success: false };

        case 403:
            return { message: "Отсутствует разрешение на действие.", success: false };

        case 404:
            return { message: "Endpoint не найден.", success: false };

        case 502:
            return { message: "Скорее всего Nginx Bad Gateway.", success: false };

        case 500:
            return { message: "Похоже, что посыпались исключения на бекенде.", success: false };

        default:
            return { message: `Что-то пошло не так. Код ошибки: ${response.status}:${response.statusText}`, success: false };
    }
}
