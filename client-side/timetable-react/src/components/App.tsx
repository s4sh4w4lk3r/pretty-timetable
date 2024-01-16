import Table from "./Table/Table";
import styles from "./App.module.css"
import { SubGroup } from "../api/graphql/__generated__/graphql";

function getWeekNumber(date: Date) {
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    const week1 = new Date(date.getFullYear(), 0, 4);
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
        - 3 + (week1.getDay() + 6) % 7) / 7);
}

export type Group = {
    id: number,
    subgroup: SubGroup
}

export default function App() {
    const date = new Date(2024, 8, 2);

    const currentWeekNumber = getWeekNumber(date);
    

    return (
        <>
            <div className={styles.appGrid}>
                <Table weekNumber={currentWeekNumber}></Table>
            </div>

        </>
    )

}