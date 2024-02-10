export function addActualDates(dates: string[]) {}

export function addAscDatabase() {}

export function addGroup(group: { name: string }) {}

export function addRoom(room: { address: string; number: string; fullName: string }) {}

export function addLessonTime(lessonTime: { number: number; startsAt: string; endsAt: string }) {}

export function addSubject(subject: { name: string }) {}

export function addTeacher(teacher: { lastname: string; firstname: string; middlename: string }) {}

export function addActualTimetable(actualTimetable: { groupId: number; weekNumber: number }) {}

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
}) {}

export function addStableTimetable(stableTimetable: { groupId: number }) {}

export function addStableCard(stableCard: {
    teacherId: number;
    subjectId: number;
    cabinetId: number;
    lessonTimeId: number;
    isWeekEven: boolean;
    dayOfWeek: number;
    subGroup: number;
    relatedTimetableId: number;
}) {}
