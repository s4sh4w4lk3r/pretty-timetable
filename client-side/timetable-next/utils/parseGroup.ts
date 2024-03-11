import { subgroupsSchema } from "@/fetching/zodSchemas";

export default function parseGroup(groupId: string, subgroup?: string) {
    const groupIdNumeric = Number.parseInt(groupId);

    if (!groupIdNumeric) {
        return null;
    }

    if (subgroup === "first") return { groupId: groupIdNumeric, subgroup: subgroupsSchema.enum.FIRST_GROUP };
    if (subgroup === "second") return { groupId: groupIdNumeric, subgroup: subgroupsSchema.enum.SECOND_GROUP };

    return { groupId: groupIdNumeric, subgroup: subgroupsSchema.enum.ALL };
}
