import GroupList from "@/components/group/GroupList";
import { getAllCachedGroups } from "@/fetching/cachedData";

export default async function Timetables() {
    const groups = await getAllCachedGroups();
    return <GroupList groups={groups}></GroupList>;
}
