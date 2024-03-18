import { getActualTimetableWeekDaysSchema } from "@/fetching/zodSchemas";
import DayOfWeek from "@/types/DayOfWeek";
import moment from "moment";
import { z } from "zod";

type ActualCardType = z.infer<typeof getActualTimetableWeekDaysSchema.shape.timetableFiltered.element.shape.cards.element>;

export function getWeekNumber(date: Date) {
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
    const week1 = new Date(date.getFullYear(), 0, 4);
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
}

export function distinctDates(cards: ActualCardType[]) {
    const cardDatesNumeric = cards.map(c => c.date.getTime());
    const distinctedDatesNumeric = [...new Set(cardDatesNumeric)];
    const distinctedDatesNumericSorted = distinctedDatesNumeric.sort((date1, date2) => (date1 > date2 ? 1 : -1));
    return distinctedDatesNumericSorted.map(d => new Date(d));
}

export function durationToTimeOnly(duration: string) {
    return moment.utc(moment.duration(duration).asMilliseconds()).format("H:mm");
}

export function getDayOfWeek(date: Date): { dayOfWeek: DayOfWeek; short: string; long: string } {
    return {
        dayOfWeek: date.getUTCDay(),
        short: date.toLocaleString("RU-ru", { weekday: "short" }).toUpperCase(),
        long: date.toLocaleString("RU-ru", { weekday: "long" }).toUpperCase(),
    };
}
