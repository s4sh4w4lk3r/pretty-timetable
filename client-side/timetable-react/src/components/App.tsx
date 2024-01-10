import { useState } from "react"
import data from "./../api/test.json"
import Card from "./Card/Card";
import Table from "./Table/Table";


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

export type TimetableType = typeof data.actualTimetables[0];

const card = data.actualTimetables[0].cards[5];
export type CardType = typeof card;

export default function App() {
    const testDate = new Date(2024, 8, 2);

    const currentWeekNumber = getWeekNumber(testDate);
    const [groupId, setGroupId] = useState<number>(0);
    const timetable = data.actualTimetables[0];

    return (
        <>
            <Table timetable={timetable}></Table>
        </>
    )

}