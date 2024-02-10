export function updateGroup(group: { id: number; name: string }) {}

export function updateRoom(room: { id: string; address: string; number: string; fullName: string }) {}

export function updateLessonTime(lessonTime: { id: number; number: number; startsAt: string; endsAt: string }) {}

export function updateSubject(subject: { id: number; name: string }) {}

export function updateTeacher(teacher: { id: number; lastname: string; firstname: string; middlename: string }) {}

export function updateActualTimetable(actualTimetable: { id: number; groupId: number; weekNumber: number }) {}

export function updateActualCard(actualCard: {
    id: number;
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

export function updateStableTimetable(stableTimetable: { id: number; groupId: number }) {}

export function updateStableCard(stableCard: {
    id: number;
    teacherId: number;
    subjectId: number;
    cabinetId: number;
    lessonTimeId: number;
    isWeekEven: boolean;
    dayOfWeek: number;
    subGroup: number;
    relatedTimetableId: number;
}) {}
