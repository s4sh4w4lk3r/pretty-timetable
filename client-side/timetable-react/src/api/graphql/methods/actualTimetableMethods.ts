import { useQuery } from "@apollo/client";
import { ACTUAL_TIMETABLE_BY_GROUP_ID_WEEKNUMBER } from "../queries";

export default {
    getActualTimetableByGroupId(groupId: number, weekNumber: number) {

        const { data, error } = useQuery(ACTUAL_TIMETABLE_BY_GROUP_ID_WEEKNUMBER, {
            variables: {
                groupId: groupId, 
                weekNumber: weekNumber
            }
        });

        if (error) {
            alert("НАХУЙ ИДИ");
        }

        return {
            lessontimes: data?.lessonTimes, 
            timetable: data?.actualTimetables[0]
        }
    }
}