import dada from "../../api/graphql/methods/actualTimetableMethods"

export default function Table() {

const timetable = dada.getActualTimetableByGroupId(12);

const items = timetable?.cards?.map(e=> <li>{ `${e.teacher.lastname} ${e.subject.name} ${e.cabinet.fullName} ${e.subGroup} ${e.date}`}</li>)



  return (<ul> {items}</ul>)
}
