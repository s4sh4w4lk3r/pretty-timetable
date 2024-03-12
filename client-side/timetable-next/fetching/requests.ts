import "server-only";
import { SharedQueries } from "./persistedQueries";
import { RevalidationTags } from "@/server-actions/revalidation";
import { getActualTimetableIdsOnlySchema, getActualTimetableSchema, getActualTimetableWeekDaysSchema } from "./zodSchemas";
import config from "@/configs/config";
import { distinctDates, getDayOfWeek } from "@/utils/date";

export async function getHighLevelData() {
    const query = SharedQueries.HighLevelData;

    const res = await fetch(`${config.api.graphQLBaseUrl}/?id=${query}`, {
        method: "GET",
        next: {
            tags: [RevalidationTags.Group, RevalidationTags.LessonTime, RevalidationTags.Room, RevalidationTags.Subject, RevalidationTags.Teacher],
        },
    });

    const timetables = await getHighLevelDataSchema.parseAsync(await res.json());
    return timetables.data;
}

export async function getActualTimetable({ groupId, weekNumber }: { groupId: number; weekNumber: number }) {
    const getHighLevelDataPromise = getHighLevelData();
    const getIdsOnlyPromise = getActualTimetableIdsOnly({ groupId, weekNumber });
    const [highLevelData, idsOnly] = await Promise.all([getHighLevelDataPromise, getIdsOnlyPromise]);

    const tt = {
        group: highLevelData.groups.find(g => g.id === idsOnly.groupId)!,
        cards: idsOnly.cards.map(card => ({
            id: card.id,
            teacher: highLevelData.teachers.find(t => t.id === card.teacherId)!,
            subject: highLevelData.subjects.find(t => t.id === card.subjectId)!,
            room: highLevelData.rooms.find(t => t.id === card.roomId)!,
            lessonTime: highLevelData.lessonTimes.find(t => t.id === card.lessonTimeId)!,
            date: card.date,
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
