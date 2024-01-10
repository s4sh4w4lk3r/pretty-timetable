import { CardType } from "../App"
import styles from "./Card.module.css"

type Props = { card: CardType }

export default function Card(props: Props) {
  const cardData = props.card;

  const teacher = `${cardData.teacher.lastname}  ${cardData.teacher.firstname}`;
  const cabinet = cardData.cabinet.number;
  const subject = cardData.subject.name;
  const isCanceled = cardData.isCanceled;
  const isModified = cardData.isModified;
  const isMoved = cardData.isMoved;
  const subgroup = cardData.subGroup;

  const lessonNumber = cardData.lessonTime.number;
  const lessonStartsAt = cardData.lessonTime.startsAt;
  const lessonEndsAt = cardData.lessonTime.endsAt;

  return (
    <div className={styles.card}>
      <p>{lessonNumber}</p>

      <div>
        <p>{lessonStartsAt}</p>
        <p>{lessonEndsAt}</p>
      </div>

      <div className={styles.info}>
        <p>{subject}</p>
        <p>{`${cabinet}, ${teacher}`}</p>
      </div>
    </div>
  )
}
