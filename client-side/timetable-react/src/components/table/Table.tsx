import LessonTime from "./lessonTime/lessonTime"
import Card from "./card/Card";
import data from "../../api/test.json"
import styles from "./Table.module.css"

function getCurrentWeekNumber() {
  var date = new Date();
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
    - 3 + (week1.getDay() + 6) % 7) / 7);
}

export default function Table() {

  const lessonTimesEl = data.lessonTimes.map(e => <LessonTime key={e.id} number={e.number} startsAt={e.startsAt} endsAt={e.endsAt}></LessonTime>);
  const cardsEl = data.actualTimetables[0].cards.map(e=> <Card cabinet={"1237"} teacher={e.teacher.lastname} subject={e.subject.name} key={e.id}></Card>);

  return (
    <>
      <h3>{data.actualTimetables[0].group.name}</h3>
      <div className={styles.lessonTimes}>{lessonTimesEl}</div>
      <div className={styles.cards}>{cardsEl}</div>
    </>
  )
}
// сделать не в виде таблицы хтмл, а в виде грида в ксс



