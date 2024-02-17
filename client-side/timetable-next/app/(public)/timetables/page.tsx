import GroupList from "@/components/group/GroupList";
import alertNoData from "@/components/miscellaneous/alertNoData";
import { RevalidationTags } from "@/server-actions/revalidation";
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
    const res = await fetch(`${process.env.GRAPHQL_URL}/?id=${query}`, { method: "GET", next: { tags: [RevalidationTags.Group] } });

    const groups = (await res.json()).data.groups as Group[];
    if (!groups) {
        return null;
    }

    return groups;
}
