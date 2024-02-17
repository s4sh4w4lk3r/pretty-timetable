import GroupList from "@/components/group/GroupList";
import alertNoData from "@/components/miscellaneous/alertNoData";
import { Group } from "@/types/api";

export default async function Timetables() {
    const groups = await getGroups();
    if (!groups) {
        return alertNoData;
    }

    return <GroupList groups={groups}></GroupList>;
}

async function getGroups() {
    const query = "GetAllGroups";
    const res = await fetch(`${process.env.GRAPHQL_URL}/?id=${query}`, { method: "GET" });

    const groups = (await res.json()).data.groups as Group[];
    if (!groups) {
        return null;
    }

    return groups;
}
