import GroupList from "@/components/group/GroupList";
import { getAllGroups } from "@/fetching/requests";

export default async function Timetables() {
    const groups = await getAllGroups();
    return <GroupList groups={groups}></GroupList>;
}
