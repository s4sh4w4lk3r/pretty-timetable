import { AdminZodFetchSchemas } from "@/fetching/zodFetchSchemas";
import ServiceResult from "@/types/serviceResult";
import { SafeParseReturnType } from "zod";

export interface ClientResult {
    success: boolean | null;
    message: string;
}

type PutParams<T> = { url: string; entity: T; authN: string; revalidateFn: () => void };
type delParams = { url: string; id: number; authN: string; revalidateFn: () => void };

const msg = "Что-то пошло не так, смотрите логи на сервере.";

export async function putEntity<T>({ url, entity, revalidateFn, authN }: PutParams<T>): Promise<ClientResult> {
    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Authorization": authN,
            },
            body: JSON.stringify(entity),
        });

        if (!response.ok) {
            return await handleBadStatusCode(response);
        }

        const responseParsed = AdminZodFetchSchemas.serviceResultSchema.safeParse(await response.json());
        return handleOkStatusCode({ responseParsed: responseParsed, revalidateFn: revalidateFn });
    } catch (error) {
        return handleFetchException(error);
    }
}

export async function deleteEntity({ url, id, revalidateFn, authN }: delParams): Promise<ClientResult> {
    try {
        const response = await fetch(`${url}?id=${id}`, {
            method: "DELETE",
            headers: { "Authorization": authN },
        });

        if (!response.ok) {
            return await handleBadStatusCode(response);
        }

        const responseParsed = AdminZodFetchSchemas.serviceResultSchema.safeParse(await response.json());
        return handleOkStatusCode({ responseParsed: responseParsed, revalidateFn: revalidateFn });
    } catch (error) {
        return handleFetchException(error);
    }
}

async function handleBadStatusCode(response: Response): Promise<ClientResult> {
    switch (response.status) {
        case 400:
            const responseParsed = AdminZodFetchSchemas.serviceResultSchema.safeParse(await response.json());

            if (responseParsed.success) {
                console.error(responseParsed.data);
                return { message: responseParsed.data.description, success: false };
            } else {
                console.error(responseParsed.error.flatten());
                return { message: msg, success: false };
            }

        case 401:
            return { message: "Отсутствует аутентификация. 401", success: false };

        case 403:
            return { message: "Отсутствуют права. 403", success: false };

        case 404:
            return { message: "Endpoint не найден. 404", success: false };

        case 502:
            return { message: "Скорее всего Nginx Bad Gateway. 502", success: false };

        case 500:
            return { message: "Похоже, что посыпались исключения на бекенде. 500", success: false };

        default:
            return { message: `Что-то пошло не так. Код ошибки: ${response.status}:${response.statusText}`, success: false };
    }
}

function handleOkStatusCode({
    responseParsed,
    revalidateFn,
}: {
    responseParsed: SafeParseReturnType<ServiceResult, ServiceResult>;
    revalidateFn: () => void;
}) {
    const zodIsValid = responseParsed.success;
    const apiIsSuccess = zodIsValid ? responseParsed.data.success : false;

    if (zodIsValid && apiIsSuccess) {
        revalidateFn();
        return { message: responseParsed.data.description, success: true };
    } else {
        if (!zodIsValid) console.error(responseParsed.error.flatten());
        return { message: msg, success: false };
    }
}

function handleFetchException(error: unknown) {
    console.error(error);
    return { message: msg, success: false };
}
