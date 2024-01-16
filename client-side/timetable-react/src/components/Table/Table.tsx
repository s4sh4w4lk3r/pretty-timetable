import { useQuery } from "@apollo/client";
import { useImmer } from "use-immer";
import { ActualCard, ActualTimetable, SubGroup } from "../../api/graphql/__generated__/graphql";
import { ACTUAL_TIMETABLE_BY_GROUP_ID_WEEKNUMBER } from "../../api/graphql/queries";
import { GroupType } from "../App";
import CardContainer from "../CardContainer/CardContainer";
import GroupSelector from "../GroupSelector/GroupSelector";
import styles from "./Table.module.css";

type Props = { weekNumber: number }

function getGroupFromStorageOrDefault(): GroupType {
    const defaultGroup = { id: 1, subgroup: SubGroup.FirstGroup };
    const group = localStorage.getItem("group");

    if (group === undefined || group === null) {
        return defaultGroup;
    }

    const groupParsed = JSON.parse(group) as GroupType;
    if (groupParsed === undefined || groupParsed === null) {
        return defaultGroup;
    }

    return groupParsed;
}

export default function Table(props: Props) {
    const { weekNumber } = props;

    const [groupSelectorIsActive, setGroupSelectorIsActive] = useImmer<boolean>(false);
    const [group, setGroup] = useImmer<GroupType>(getGroupFromStorageOrDefault());


    const { loading, error, data } = useQuery(ACTUAL_TIMETABLE_BY_GROUP_ID_WEEKNUMBER, {
        variables: {
            weekNumber: weekNumber, groupId: group.id
        }
    });

    if (groupSelectorIsActive) {
        return (<GroupSelector
            setGroupSelectorIsActive={setGroupSelectorIsActive}
            groupState={[group, setGroup]}>
        </GroupSelector>);
    }


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
            .filter(c => c.subGroup === "ALL" || c.subGroup === group.subgroup);
        const dayOfWeekProp = date.toLocaleString("RU-ru", { weekday: "short" }).toUpperCase();

        return <CardContainer key={dayOfWeekProp} cards={cardsProp} dayOfWeek={dayOfWeekProp}></CardContainer>
    })

    return (
        <div className={styles.table}>
            <p className={styles.groupName} onClick={(e) => { e.stopPropagation(); setGroupSelectorIsActive(true) }}>{timetable.group.name}</p>
            <div className={styles.cardContainers}>
                {cardContainersElement}
            </div>
        </div>
    )
}
