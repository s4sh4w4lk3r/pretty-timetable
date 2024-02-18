import { PublicZodFetchShemas } from "@/fetching/zodFetchSchemas";

import subgroupSchema = PublicZodFetchShemas.subgroupsSchema;
export function parseGroup(groupId: string, subgroup?: string) {
    const groupIdNumeric = Number.parseInt(groupId);

    if (!groupIdNumeric) {
        return null;
    }

    if (subgroup === "first") return { groupId: groupIdNumeric, subgroup: subgroupSchema.enum.FIRST_GROUP };
    if (subgroup === "second") return { groupId: groupIdNumeric, subgroup: subgroupSchema.enum.SECOND_GROUP };

    return { groupId: groupIdNumeric, subgroup: subgroupSchema.enum.ALL };
}
