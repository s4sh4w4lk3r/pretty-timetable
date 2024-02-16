import { ActualCard, SubGroup } from "@/types/api";
import moment from "moment";

export function getWeekNumber(date: Date) {
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
    const week1 = new Date(date.getFullYear(), 0, 4);
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
}

export function getDailyCards(cards: ActualCard[], subgroup: SubGroup): { dayOfWeek: string; cards: ActualCard[] }[] {
    const datesDistincted = distinctDates(cards);

    const dailyCards = datesDistincted.map(date => {
        const cardsFiltred = cards
            .filter(c => new Date(c.date).getTime() === date.getTime())
            .filter(c => (subgroup !== SubGroup.All ? c.subGroup === "ALL" || c.subGroup === subgroup : c))
            .sort((card1, card2) => (card1.lessonTime.number > card2.lessonTime.number ? 1 : -1));

        const dayOfWeek = date.toLocaleString("RU-ru", { weekday: "long" }).toUpperCase();

        return { dayOfWeek: dayOfWeek, cards: cardsFiltred };
    });

    return dailyCards;
}

export function distinctDates(cards: ActualCard[]) {
    return [...new Set(cards.map(c => c.date))].map(d => new Date(d)).sort((date1, date2) => (date1.getTime() > date2.getTime() ? 1 : -1));
}

export function durationToTimeOnly(duration: string) {
    return moment.utc(moment.duration(duration).asMilliseconds()).format("H:mm");
}
