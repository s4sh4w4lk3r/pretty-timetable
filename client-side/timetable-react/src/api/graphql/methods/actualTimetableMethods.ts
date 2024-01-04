import { useQuery } from "@apollo/client";
import { ACTUAL_TIMETABLE_BY_GROUP_ID } from "../queries";

export default {
    getActualTimetableByGroupId(groupId: number) {
        const { data, error } = useQuery(ACTUAL_TIMETABLE_BY_GROUP_ID, {variables: { groupId : groupId}});

        if (error) {
            alert("НАХУЙ ИДИ");
        }

        return data?.actualTimetables[0];
    }
}