import { LessonTime, Group, ActualTimetable } from "../graphql/__generated__/graphql";

const revalidateIn = 10;
export async function getGroups() {
    const data = await (await fetch("http://localhost:3001/groups.json", { next: { revalidate: revalidateIn } })).json();
    return data.groups as Group[];
}

export async function getLessonTimes() {
    const data = await (await fetch("http://localhost:3001/lessontimes.json", { next: { revalidate: revalidateIn } })).json();
    return data.lessonTimes as LessonTime[];
}

export async function getTimetable() {
    const data = await (await fetch("http://localhost:3001/timetable.json", { next: { revalidate: revalidateIn } })).json();
    return data.actualTimetables as ActualTimetable[];
}
