import moment from "moment";

export function defineHintsRequired(lessonStartsAt: string, lessonEndsAt: string, dateFromCard: string): { isNow: boolean; isPending: boolean } {
    const startDate = new Date(new Date().setHours(Number.parseInt(lessonStartsAt.split(":")[0]), Number.parseInt(lessonStartsAt.split(":")[1]), 0));
    const endDate = new Date(new Date().setHours(Number.parseInt(lessonEndsAt.split(":")[0]), Number.parseInt(lessonEndsAt.split(":")[1]), 0));
    const dateOk = new Date(Date.parse(dateFromCard)).getUTCDate() === new Date().getUTCDate();

    const isNow = dateOk && new Date() >= startDate && new Date() <= endDate;

    const timeFromNowToLessonStart = moment().to(startDate, true);
    const isPending = dateOk && timeFromNowToLessonStart.includes("minutes") && Number.parseInt(timeFromNowToLessonStart) <= 30;

    return { isNow: isNow, isPending };
}

function defineCardClass(isNow: boolean, isPending: boolean, isCanceled: boolean, isModified: boolean): string {
    if (isCanceled) {
        return `${""} ${"canceled"}`;
    }

    if (isNow) {
        return `${""} ${"now"}`;
    }

    if (isPending) {
        return `${""} ${"pending"}`;
    }

    if (isModified) {
        return `${""} ${"modified"}`;
    }

    return `${""}`;
}
