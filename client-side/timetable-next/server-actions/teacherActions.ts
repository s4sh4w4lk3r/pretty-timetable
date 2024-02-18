"use server";

import ServiceResult from "@/types/serviceResult";
import { revalidateTag } from "next/cache";
import { RevalidationTags } from "./revalidation";
import config from "@/configs/config";

const baseApiUrl = `${config.api.restBaseUrl}/teacher`;
const revalidate = () => revalidateTag(RevalidationTags.Teacher);
export async function createTeacher(params: { lastname: string; firstname: string; middlename: string }) {
    const res = await fetch(baseApiUrl, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ id: 0, ...params }),
    });
    revalidate();
    console.log((await res.json()) as ServiceResult);
}

export async function updateTeacher(params: { id: number; lastname: string; firstname: string; middlename: string }) {
    const res = await fetch(baseApiUrl, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(params),
    });
    revalidate();
    console.log((await res.json()) as ServiceResult);
}

export async function deleteTeacher({ id }: { id: number }) {
    const res = await fetch(`${baseApiUrl}?id=${id}`, {
        method: "DELETE",
    });
    revalidate();
    console.log((await res.json()) as ServiceResult);
}
