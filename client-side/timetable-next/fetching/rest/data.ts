import { LessonTime, Group, ActualTimetable } from "../graphql/__generated__/graphql";

export async function getGroups() {
    const data = await (await fetch("http://localhost/groups.json")).json();
    return data.groups as Group[];
}

export async function getLessonTimes() {
    const data = await (await fetch("http://localhost/lessontimes.json")).json();
    return data.lessonTimes as LessonTime[];
}

export async function getTimetable() {
    const data = await (await fetch("http://localhost/timetable.json")).json();
    return data.actualTimetables as ActualTimetable[];
}
