import { CardType } from '../App'
import Card from '../Card/Card'
import styles from './CardContainer.module.css'

type CardContainerProps = { cards: CardType[], dayOfWeek: string }

export default function CardContainer(props: CardContainerProps) {

  const cardsElement = props.cards.sort((card1, card2) => card1.lessonTime.number > card2.lessonTime.number ? 1 : -1)
    .map(e => <Card key={e.id} card={e}></Card>);

  return (
    <div className={styles.cardContainer}>
      <p>{props.dayOfWeek}</p>
      <div>
        {cardsElement}
      </div>
    </div>

  )
}
