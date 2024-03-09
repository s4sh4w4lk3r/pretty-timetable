import moment from "moment";

export function defineHintsRequired(params: { lessonStartsAt: string; lessonEndsAt: string; dateFromCard: string }): {
    isNow: boolean;
    isPending: boolean;
} {
    const minutesBeforeStartLesson = 20;

    const { dateFromCard, lessonEndsAt, lessonStartsAt } = params;

    const startDate = new Date(new Date().setHours(Number.parseInt(lessonStartsAt.split(":")[0]), Number.parseInt(lessonStartsAt.split(":")[1]), 0));
    const endDate = new Date(new Date().setHours(Number.parseInt(lessonEndsAt.split(":")[0]), Number.parseInt(lessonEndsAt.split(":")[1]), 0));
    const dateOk = new Date(Date.parse(dateFromCard)).getUTCDate() === new Date().getUTCDate();

    const isNow = dateOk && new Date() >= startDate && new Date() <= endDate;

    const timeFromNowToLessonStart = moment().to(startDate, true);
    const isPending = dateOk && timeFromNowToLessonStart.includes("minutes") && Number.parseInt(timeFromNowToLessonStart) <= minutesBeforeStartLesson;

    return { isNow, isPending };
}

export function getTeacherName({ firstname, lastname, middlename }: { lastname: string; firstname: string; middlename?: string }): string {
    if (middlename && middlename.trim().length > 0) {
        return `${lastname} ${firstname.at(0)}.${middlename.at(0)}.`;
    } else {
        return `${lastname} ${firstname}`;
    }
}