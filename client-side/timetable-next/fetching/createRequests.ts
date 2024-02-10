import kyInstance from "ky";

const ky = kyInstance.create({
    prefixUrl: "http://localhost/api",
    headers: {
        Authorization: "Bearer ",
    },
});

export function addActualDates(dates: string[]) {
    ky.post("/actual/convert-from-stable");
}

export function addAscDatabase() {
    ky.post("/stable/asc/timetable");
}

export function addGroup(group: { name: string }) {
    ky.put("/group", { json: group });
}

export function addRoom(room: { address: string; number: string; fullName: string }) {
    ky.put("/room", { json: room });
}

export function addLessonTime(lessonTime: { number: number; startsAt: string; endsAt: string }) {
    ky.put("/lessontime", { json: lessonTime });
}

export function addSubject(subject: { name: string }) {
    ky.put("/subject", { json: subject });
}

export function addTeacher(teacher: { lastname: string; firstname: string; middlename: string }) {
    ky.put("/teacher", { json: teacher });
}

export function addActualTimetable(actualTimetable: { groupId: number; weekNumber: number }) {
    ky.put("/actual", { json: actualTimetable });
}

export function addActualCard(actualCard: {
    cabinetId: number;
    isCanceled: boolean;
    isModified: boolean;
    isMoved: boolean;
    lessonTimeId: number;
    subGroup: number;
    subjectId: number;
    teacherId: number;
    relatedTimetableId: number;
    date: string;
}) {
    ky.put("/actual/card", { json: actualCard });
}

export function addStableTimetable(stableTimetable: { groupId: number }) {
    ky.put("/stable", { json: stableTimetable });
}

export function addStableCard(stableCard: {
    teacherId: number;
    subjectId: number;
    cabinetId: number;
    lessonTimeId: number;
    isWeekEven: boolean;
    dayOfWeek: number;
    subGroup: number;
    relatedTimetableId: number;
}) {
    ky.put("/stable/card", { json: stableCard });
}
