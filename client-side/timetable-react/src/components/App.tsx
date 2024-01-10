import { useState } from "react"
import Table from "./Table/Table";
import styles from "./App.module.css"
import { useQuery } from "@apollo/client";
import { ACTUAL_TIMETABLE_BY_GROUP_ID_WEEKNUMBER } from "../api/graphql/queries";
import { ActualTimetable } from "../api/graphql/__generated__/graphql";


function getWeekNumber(date: Date) {
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
        - 3 + (week1.getDay() + 6) % 7) / 7);
}


export default function App() {
    const testDate = new Date(2024, 8, 2);

    const currentWeekNumber = getWeekNumber(testDate);
    const [groupId, setGroupId] = useState<number>(0);
    // сделать так чтобы фетча при нуле не было
    const { loading, error, data } = useQuery(ACTUAL_TIMETABLE_BY_GROUP_ID_WEEKNUMBER, { variables: { weekNumber: currentWeekNumber, groupId: groupId } });
    const timetable = data?.actualTimetables[0] as ActualTimetable;
    if (data?.actualTimetables[0] === undefined || data?.actualTimetables[0].cards?.length === 0) {
        return <>
        Ошибочка
        <input type="text" id="da" onChange={(c) => setGroupId(Number.parseInt(c.target.value))} />
        </>
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    debugger;

    return (
        <>
            <div className={styles.appGrid}>
                <Table timetable={timetable}></Table>
            </div>
            <input type="text" id="da" onChange={(c) => setGroupId(Number.parseInt(c.target.value))} />
        </>
    )

}