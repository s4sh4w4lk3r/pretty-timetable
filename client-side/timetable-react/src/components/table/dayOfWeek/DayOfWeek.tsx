import styles from "./DayOfWeek.module.css"

export default function DayOfWeek({ dayOfWeekShorted, hidden = false }: { dayOfWeekShorted: string, hidden?: boolean }) {

    if (hidden === false) {
        return (
            <div className={styles.dayOfWeek}>
                <p>{dayOfWeekShorted}</p>
            </div>
        )
    }
    else {
        return (
            <div className={styles.dayOfWeekHidden}>
            </div>
        )
    }

}
