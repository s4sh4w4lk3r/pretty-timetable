import LessonTime from "./lessonTime/LessonTime"
import Card from "./card/Card";
import data from "../../api/test.json"
import styles from "./Table.module.css"
import DayOfWeek from "./dayOfWeek/DayOfWeek";


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

class TimetableDate {

  public readonly dayOfWeek: string
  public readonly unixEpoch: number
  constructor(public readonly date: string) {
    this.unixEpoch = Date.parse(date);
    this.dayOfWeek = new Date(date).toLocaleDateString("ru-RU", { weekday: "short" })
  }
}

class CardPoint {
  constructor(public readonly column: number, public readonly row: number) {

  }
}

export default function Table() {

  const timetable = data.actualTimetables[0];
  const cards = timetable.cards;

  const requiredLessonTimeIds = [...new Set(cards.map(card => card.lessonTimeId))];
  const lessonTimes = data.lessonTimes.filter(lt => requiredLessonTimeIds.includes(lt.id))
    .sort((ltA, ltB) => ltA.number > ltB.number ? 1 : -1);

  const dates = timetable.cards.map(e => new TimetableDate(e.date))
    .sort((dateA, dateB) => dateA.unixEpoch > dateB.unixEpoch ? 1 : -1);
  const datesDistinct = [...new Map(dates.map(item => [item["unixEpoch"], item])).values()];


  const rows = datesDistinct.length + 1;
  const columns = datesDistinct.length + 1;

  const cardsElement = lessonTimes
    .sort((ltA, ltB) => ltA.number > ltB.number ? 1 : -1).map(lt => {

      const lessonTimeElement = <LessonTime key={lt.id} startsAt={lt.startsAt} endsAt={lt.endsAt} number={lt.number}></LessonTime>;

      const cardElements = cards.filter(c => c.lessonTimeId === lt.id)

        .sort((cardA, cardB) => Date.parse(cardA.date) > Date.parse(cardB.date) ? 1 : -1)

        .map(card => card.lessonTimeId === lt.id ? <Card cabinet="1237" subject={card.subject.name} teacher={card.teacher.lastname} key={card.id}></Card> : <Card cabinet="" subject="" teacher="" key={card.id}></Card>);

      let column: JSX.Element[] = [];
      column.push(lessonTimeElement);
      column = column.concat(cardElements);

      return <div>{column}</div>
    });

  return (
    <>
      <p className={styles.groupName}>{data.actualTimetables[0].group.name}</p>
      <div className={styles.table} 
      style={{gridTemplateColumns: `repeat(${columns}, auto)`, gridTemplateRows: `repeat(${rows}, auto)`}}>

        {cardsElement}
      </div>
      </>
  )
}
// сделать не в виде таблицы хтмл, а в виде грида в ксс



