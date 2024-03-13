import "server-only";
import { SharedQueries } from "./persistedQueries";
import { RevalidationTags } from "@/server-actions/revalidation";
import { getAllGroupsSchema, getAllLessonTimesSchema, getAllRoomsSchema, getAllSubjectsSchema, getAllTeachersSchema } from "./zodSchemas";
import { getActualTimetableIdsOnlySchema, getActualTimetableSchema, getActualTimetableWeekDaysSchema } from "./zodSchemas";
import config from "@/configs/config";
import { distinctDates, getDayOfWeek } from "@/utils/date";

export async function getAllSubjects() {
    const query = SharedQueries.GetAllSubjects;

    const res = await fetch(`${config.api.graphQLBaseUrl}/?id=${query}`, {
        method: "GET",
        next: {
            tags: [RevalidationTags.Subject],
        },
    });

    const timetables = await getAllSubjectsSchema.parseAsync(await res.json());
    return timetables.data.subjects;
}

export async function getAllTeachers() {
    const query = SharedQueries.GetAllTeachers;

    const res = await fetch(`${config.api.graphQLBaseUrl}/?id=${query}`, {
        method: "GET",
        next: {
            tags: [RevalidationTags.Teacher],
        },
    });

    const timetables = await getAllTeachersSchema.parseAsync(await res.json());
    return timetables.data.teachers;
}

export async function getAllRooms() {
    const query = SharedQueries.GetAllRooms;

    const res = await fetch(`${config.api.graphQLBaseUrl}/?id=${query}`, {
        method: "GET",
        next: {
            tags: [RevalidationTags.Room],
        },
    });

    const timetables = await getAllRoomsSchema.parseAsync(await res.json());
    return timetables.data.rooms;
}

export async function getAllLessonTimes() {
    const query = SharedQueries.GetAllLessonTimes;

    const res = await fetch(`${config.api.graphQLBaseUrl}/?id=${query}`, {
        method: "GET",
        next: {
            tags: [RevalidationTags.LessonTime],
        },
    });

    const timetables = await getAllLessonTimesSchema.parseAsync(await res.json());
    return timetables.data.lessonTimes;
}

export async function getAllGroups() {
    const query = SharedQueries.GetAllGroups;

    const res = await fetch(`${config.api.graphQLBaseUrl}/?id=${query}`, {
        method: "GET",
        next: {
            tags: [RevalidationTags.Group],
        },
    });

    const timetables = await getAllGroupsSchema.parseAsync(await res.json());
    return timetables.data.groups;
}
/////////////////////////
export async function getActualTimetable({ groupId, weekNumber }: { groupId: number; weekNumber: number }) {
    const getAllGroupsPromise = getAllGroups();
    const getAllSubjectsPromise = getAllSubjects();
    const getAllTeachersPromise = getAllTeachers();
    const getAllLessonTimesPromise = getAllLessonTimes();
    const getAllRoomsPromise = getAllRooms();
    const getIdsOnlyPromise = getActualTimetableIdsOnly({ groupId, weekNumber });

    const [groups, subjects, teachers, lessonTimes, rooms, idsOnly] = await Promise.all([
        getAllGroupsPromise,
        getAllSubjectsPromise,
        getAllTeachersPromise,
        getAllLessonTimesPromise,
        getAllRoomsPromise,
        getIdsOnlyPromise,
    ]);

    const tt = {
        group: groups.find(g => g.id === idsOnly.groupId),
        cards: idsOnly.cards.map(card => ({
            id: card.id,
            teacher: teachers.find(t => t.id === card.teacherId),
            subject: subjects.find(t => t.id === card.subjectId),
            room: rooms.find(t => t.id === card.roomId),
            lessonTime: lessonTimes.find(t => t.id === card.lessonTimeId),
            date: card.date,
            relatedTimetableId: card.relatedTimetableId,
            isModified: card.isModified,
            isCanceled: card.isCanceled,
            isMoved: card.isMoved,
            subGroup: card.subGroup,
            modifiedAt: card.modifiedAt,
        })),
    };

    return getActualTimetableSchema.parse(tt);
}

export async function getActualTimetableWeekDays({ groupId, weekNumber }: { groupId: number; weekNumber: number }) {
    const tt = await getActualTimetable({ groupId, weekNumber });
    const datesDistincted = distinctDates(tt.cards);

    const timetableFiltered = datesDistincted.map(date => {
        const cardsFiltred = tt.cards
            .filter(c => new Date(c.date).getTime() === date.getTime())
            .sort((card1, card2) => (card1.lessonTime.number > card2.lessonTime.number ? 1 : -1));

        return { dayOfWeek: getDayOfWeek(date), cards: cardsFiltred };
    });

    const result = { group: tt.group, timetableFiltered: timetableFiltered };

    return getActualTimetableWeekDaysSchema.parse(result);
}

async function getActualTimetableIdsOnly({ groupId, weekNumber }: { groupId: number; weekNumber: number }) {
    const query = SharedQueries.GetActualTimetableByGroupAndWeek;

    const res = await fetch(`${config.api.graphQLBaseUrl}/?id=${query}&variables={"weekNumber":${weekNumber},"groupId":${groupId}}`, {
        method: "GET",
        next: {
            tags: [RevalidationTags.Group, RevalidationTags.LessonTime, RevalidationTags.Room, RevalidationTags.Subject, RevalidationTags.Teacher],
        },
    });

    const timetables = await getActualTimetableIdsOnlySchema.parseAsync(await res.json());
    return timetables.data.actualTimetables[0];
}
