import { ActualCard } from "../../api/graphql/__generated__/graphql";
import Card from "../Card/Card";
import styles from "./CardContainer.module.css";

type CardContainerProps = { cards: ActualCard[]; dayOfWeek: string };

export default function CardContainer(props: CardContainerProps) {
    // FIXME: сделать чтобы кардконтейнеры были одного размера
    const cardsElement = props.cards
        .sort((card1, card2) =>
            card1.lessonTime.number > card2.lessonTime.number ? 1 : -1
        )
        .map(e => (
            <Card
                key={e.id}
                card={e}
            />
        ));

    return (
        <div className={styles.cardContainer}>
            <p>{props.dayOfWeek}</p>
            <div>{cardsElement}</div>
        </div>
    );
}
