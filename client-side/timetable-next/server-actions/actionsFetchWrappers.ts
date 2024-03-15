import authOptions from "@/configs/authConfig";
import { serviceResultSchema } from "@/fetching/admin/zodSchemas";
import ServiceResult from "@/types/result";
import { getServerSession } from "next-auth";
import { SafeParseReturnType } from "zod";

type FetchWrapperResult = { success: boolean; description: string; value?: unknown };
type PutParams = { url: string; entity: unknown; revalidateFn: () => void };
type DelParams = { url: string; id: number; revalidateFn: () => void };
type HandleOkStatusCodeParams = { responseParsed: SafeParseReturnType<ServiceResult, ServiceResult>; revalidateFn: () => void };
type CheckIsAuthorizedParams = { success: false; description: string } | { success: true; token: string };

export async function putEntity({ url, entity, revalidateFn }: PutParams): Promise<FetchWrapperResult> {
    const auth = await checkIsAuthorized();
    if (!auth.success) {
        return auth;
    }

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Authorization": `Bearer ${auth.token}`,
            },
            body: JSON.stringify(entity),
        });

        if (!response.ok) return await handleBadStatusCode(response);

        const responseParsed = serviceResultSchema.safeParse(await response.json());
        return handleOkStatusCode({ responseParsed: responseParsed, revalidateFn: revalidateFn });
    } catch (error) {
        return handleFetchException(error);
    }
}
export async function deleteEntity({ url, id, revalidateFn }: DelParams): Promise<FetchWrapperResult> {
    if (!Number.isSafeInteger(id)) {
        return { success: false, description: "Значение Id должно быть числом." };
    }

    const auth = await checkIsAuthorized();
    if (!auth.success) {
        return auth;
    }

    try {
        const response = await fetch(`${url}?id=${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${auth.token}`,
            },
        });

        if (!response.ok) return await handleBadStatusCode(response);

        const responseParsed = serviceResultSchema.safeParse(await response.json());
        return handleOkStatusCode({ responseParsed: responseParsed, revalidateFn: revalidateFn });
    } catch (error) {
        return handleFetchException(error);
    }
}

function handleOkStatusCode({ responseParsed, revalidateFn }: HandleOkStatusCodeParams): FetchWrapperResult {
    const zodIsValid = responseParsed.success;
    const apiIsSuccess = zodIsValid ? responseParsed.data.success : false;

    if (zodIsValid && apiIsSuccess) {
        revalidateFn();
        return { success: true, description: responseParsed.data.description, value: responseParsed.data.value };
    } else {
        if (!zodIsValid) console.error(responseParsed.error.flatten());
        return { success: false, description: "Получен неожиданный ответ от API." };
    }
}

async function handleBadStatusCode(response: Response): Promise<FetchWrapperResult> {
    try {
        console.error({ statusCode: response.status, json: JSON.stringify(await response.json()) });
    } catch {
        console.error({ statusCode: response.status, body: await response.text() });
    } finally {
        return { success: false, description: `Что-то пошло не так. Код ошибки: ${response.status}:${response.statusText}` };
    }
}

function handleFetchException(error: unknown): FetchWrapperResult {
    console.error(error);
    return { success: false, description: "Произошла ошибка на сервере во время выполнения запроса." };
}

export async function checkIsAuthorized(): Promise<CheckIsAuthorizedParams> {
    const session = await getServerSession(authOptions);

    if (!session || !session.accessToken) {
        return { success: false, description: "Сессия или токен доступа не получены." };
    }

    if (!session.roles?.includes("admin")) {
        return { success: false, description: "Вы не являетесь админом." };
    }

    return { success: true, token: session.accessToken };
}
