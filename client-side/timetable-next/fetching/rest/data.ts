import gr from "./../../public/groups.json";
import ttt from "./../../public/timetable.json";
import lt from "./../../public/lessontimes.json";

export function getGroups() {
    return gr.groups;
}

export function getLessonTimes() {
    return lt.lessonTimes;
}

export function getTimetable() {
    return ttt.actualTimetables;
}
