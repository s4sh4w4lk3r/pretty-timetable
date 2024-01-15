import { useQuery } from "@apollo/client";
import { ActualCard, ActualTimetable} from "../../api/graphql/__generated__/graphql";
import { ACTUAL_TIMETABLE_BY_GROUP_ID_WEEKNUMBER } from "../../api/graphql/queries";
import CardContainer from "../CardContainer/CardContainer";
import styles from "./Table.module.css"
import { Group } from "../App";

type Props = { group: Group, weekNumber: number }

export default function Table(props: Props) {

    const { loading, error, data } = useQuery(ACTUAL_TIMETABLE_BY_GROUP_ID_WEEKNUMBER, {
        variables: {
            weekNumber: props.weekNumber, groupId: props.group.id
        }
    });

    if (loading) return <p>Загрзука...</p>;
    if (error) return <p>Ошибка : {error.message}</p>;

    const timetable = data?.actualTimetables[0] as ActualTimetable;

    if (timetable === undefined || timetable.cards === undefined) return <p>Нет данных</p>;

    const cards = timetable.cards as ActualCard[];
    const dates = [... new Set(cards.map(c => c.date))]
        .map(d => new Date(d))
        .sort((date1, date2) => date1.getTime() > date2.getTime() ? 1 : -1);

    const cardContainersElement = dates.map(date => {
        const cardsProp = cards.filter(c => new Date(c.date).getTime() === date.getTime())
            .filter(c => c.subGroup === "ALL" || c.subGroup === props.group.subgroup);
        const dayOfWeekProp = date.toLocaleString("RU-ru", { weekday: "short" }).toUpperCase();

        return <CardContainer key={dayOfWeekProp} cards={cardsProp} dayOfWeek={dayOfWeekProp}></CardContainer>
    })

    return (
        <div className={styles.table}>
            <p className={styles.groupName}>{timetable.group.name}</p>
            <div className={styles.cardContainers}>
                {cardContainersElement}
            </div>
        </div>
    )
}
