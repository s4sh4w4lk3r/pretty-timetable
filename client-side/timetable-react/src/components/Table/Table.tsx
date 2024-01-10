import { type TimetableType } from "../App"
import CardContainer from "../CardContainer/CardContainer";
import styles from "./Table.module.css"

type Props = { timetable: TimetableType }
export default function Table(props: Props) {

    const cards = props.timetable.cards;
    const dates = [... new Set(cards.map(c => c.date))]
        .map(d => new Date(d))
        .sort((date1, date2) => date1.getTime() > date2.getTime() ? 1 : -1);

    const cardContainersElement = dates.map(date => {
        const cardsProp = cards.filter(c => new Date(c.date).getTime() === date.getTime());
        const dayOfWeekProp = date.toLocaleString("RU-ru", { weekday: "short" }).toUpperCase();

        return <CardContainer key={dayOfWeekProp} cards={cardsProp} dayOfWeek={dayOfWeekProp}></CardContainer>
    })

    return (
        <div className={styles.table}>
            <p className={styles.groupName}>{props.timetable.group.name}</p>
            <div className={styles.cardContainers}>
                {cardContainersElement}
            </div>
        </div>
    )
}
