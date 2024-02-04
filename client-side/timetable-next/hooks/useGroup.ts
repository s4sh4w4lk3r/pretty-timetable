"use client";
import { SubGroup } from "@/fetching/graphql/__generated__/graphql";
import { useState } from "react";

type Group = {
    groupId: number;
    subgroup: SubGroup;
};
export default function useGroup() {
    const [group, setGroupState] = useState<Group>(getGroupFromLocalStorage());

    function setGroup(group: Group) {
        setGroupState(group);
        localStorage.setItem("group", JSON.stringify(group));
    }

    return { group, setGroup };
}

// FIXME выбивает ошибку localStorage is not defined. Почему-то отрабатывает на сервере
function getGroupFromLocalStorage() {
    try {
        const str = localStorage.getItem("group");
        if (str) {
            return JSON.parse(str) as Group;
        } else;
    } catch {}
    return { groupId: 1, subgroup: SubGroup.All };
}
