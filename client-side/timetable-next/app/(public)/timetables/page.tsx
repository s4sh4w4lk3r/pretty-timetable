import GroupList from "@/components/group/GroupList";
import alertNoData from "@/components/miscellaneous/alertNoData";
import { PublicFetches } from "@/fetching/fetchRequests";

export default async function Timetables() {
    const groups = await PublicFetches.getGroups();
    if (!groups) {
        return alertNoData;
    }
    return <GroupList groups={groups}></GroupList>;
}
