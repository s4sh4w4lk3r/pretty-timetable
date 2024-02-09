import GroupList from "@/components/group/GroupList";
import alertNoData from "@/components/miscellaneous/alertNoData";
import { getGroups } from "@/fetching/graphql/requests";

export default async function Timetables() {
    const groups = await getGroups();
    if (!groups) {
        return alertNoData;
    }

    return <GroupList groups={groups}></GroupList>;
}
