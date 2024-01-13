import { useState } from "react"
import Table from "./Table/Table";
import styles from "./App.module.css"
import { SubGroup } from "../api/graphql/__generated__/graphql";
import GroupSelector from "./GroupSelector/GroupSelector";

function getWeekNumber(date: Date) {
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    const week1 = new Date(date.getFullYear(), 0, 4);
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
        - 3 + (week1.getDay() + 6) % 7) / 7);
}


export default function App() {
    const date = new Date(2024, 8, 2);

    const currentWeekNumber = getWeekNumber(date);
    const [groupId, setGroupId] = useState(7);
    const [subGroup, setSubGroup] = useState(SubGroup.FirstGroup);

    return (
        <>
            {<GroupSelector groupHandler={setGroupId} subGroupHandler={setSubGroup}></GroupSelector>}
            <div className={styles.appGrid}>
                <Table groupId={groupId} weekNumber={currentWeekNumber} subGroup={subGroup}></Table>
            </div>

        </>
    )

}