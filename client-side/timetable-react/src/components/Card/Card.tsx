import moment from "moment";
import { ActualCard } from "../../api/graphql/__generated__/graphql";
import styles from "./Card.module.css"

type Props = { card: ActualCard }

function determineHintsRequired(lessonStartsAt: string, lessonEndsAt: string, dateFromCard: string): { isProgress: boolean, isPending: boolean } {

  const startDate = new Date(new Date().setHours(Number.parseInt(lessonStartsAt.split(":")[0]), Number.parseInt(lessonStartsAt.split(":")[1]), 0));
  const endDate = new Date(new Date().setHours(Number.parseInt(lessonEndsAt.split(":")[0]), Number.parseInt(lessonEndsAt.split(":")[1]), 0));
  const dateOk = new Date(Date.parse(dateFromCard)).getUTCDate() === new Date().getUTCDate();

  const isProgress = dateOk && new Date() >= startDate && new Date() <= endDate;

  const timeFromNowToLessonStart = moment().to(startDate, true);
  const isPending = dateOk && timeFromNowToLessonStart.includes("minutes") && Number.parseInt(timeFromNowToLessonStart) <= 30;


  return { isProgress, isPending }
}
export default function Card(props: Props) {
  const cardData = props.card;

  const teacher = `${cardData.teacher.lastname}  ${cardData.teacher.firstname}`;
  const cabinet = cardData.cabinet.number;
  const subject = cardData.subject.name;
  // const {isCanceled, isModified, isMoved} = cardData;

  const { startsAt, endsAt, number } = cardData.lessonTime;

  const { isPending, isProgress } = determineHintsRequired(startsAt, endsAt, props.card.date)
  const cardClasses = `${styles.card} ${isProgress ? styles.progress : ""} ${isPending ? styles.pending : ""}`;

  return (
    <div className={cardClasses}>
      <p>{number}</p>

      <div>
        <p>{startsAt}</p>
        <p>{endsAt}</p>
      </div>

      <div className={styles.info}>
        <p>{subject}</p>
        <p>{`${cabinet}, ${teacher}`}</p>
      </div>
    </div>
  )
}
