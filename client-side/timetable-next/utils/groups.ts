import { SubGroup } from "@/types/api";

export function parseGroup(groupId: string, subgroup: string | undefined): { groupId: number; subgroup: SubGroup } | null {
    const groupIdNumeric = Number.parseInt(groupId);

    if (!groupIdNumeric) {
        return null;
    }

    if (subgroup === "first") return { groupId: groupIdNumeric, subgroup: SubGroup.FirstGroup };
    if (subgroup === "second") return { groupId: groupIdNumeric, subgroup: SubGroup.SecondGroup };

    return { groupId: groupIdNumeric, subgroup: SubGroup.All };
}
