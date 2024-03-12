import { z } from "zod";

export const getAllSubjectsSchema = z.object({
    data: z.object({
        subjects: z.array(
            z.object({
                id: z.number(),
                name: z.string().trim().min(1),
                ascId: z.string().nullish(),
                modifiedAt: z.coerce.date(),
            })
        ),
    }),
});

export const getAllTeachersSchema = z.object({
    data: z.object({
        teachers: z.array(
            z.object({
                id: z.number(),
                firstname: z.string().trim().min(1),
                lastname: z.string().trim().min(1),
                middlename: z.string(),
                ascId: z.string().nullish(),
                modifiedAt: z.coerce.date(),
            })
        ),
    }),
});

export const getAllRoomsSchema = z.object({
    data: z.object({
        rooms: z.array(
            z.object({
                id: z.number(),
                number: z.string().trim().min(1),
                address: z.string().trim().min(1),
                fullName: z.string().trim().min(1),
                ascId: z.string().nullish(),
                modifiedAt: z.coerce.date(),
            })
        ),
    }),
});

export const getAllLessonTimesSchema = z.object({
    data: z.object({
        lessonTimes: z.array(
            z.object({
                id: z.number(),
                number: z.number(),
                startsAt: z.string().trim().min(1),
                endsAt: z.string().trim().min(1),
                modifiedAt: z.coerce.date(),
            })
        ),
    }),
});

export const getAllGroupsSchema = z.object({
    data: z.object({
        groups: z.array(
            z.object({
                id: z.number(),
                name: z.string().trim().min(1),
                ascId: z.string().nullish(),
                modifiedAt: z.coerce.date(),
            })
        ),
    }),
});

/////////////////////////////////////////////////////////////////////////////////////
export const subgroupsSchema = z.enum(["ALL", "FIRST_GROUP", "SECOND_GROUP"]);

export const getActualTimetableIdsOnlySchema = z.object({
    data: z.object({
        actualTimetables: z.array(
            z.object({
                id: z.number(),
                groupId: z.number(),
                weekNumber: z.number(),
                cards: z.array(
                    z.object({
                        id: z.number(),
                        teacherId: z.number(),
                        subjectId: z.number(),
                        roomId: z.number(),
                        lessonTimeId: z.number(),
                        date: z.string(),
                        isModified: z.boolean(),
                        isCanceled: z.boolean(),
                        isMoved: z.boolean(),
                        subGroup: z.string(),
                        modifiedAt: z.coerce.date(),
                    })
                ),
            })
        ),
    }),
});

export const getActualTimetableSchema = z.object({
    group: getAllGroupsSchema.shape.data.shape.groups.element,

    cards: z.array(
        z.object({
            id: z.number(),
            teacher: getAllTeachersSchema.shape.data.shape.teachers.element,
            subject: getAllSubjectsSchema.shape.data.shape.subjects.element,
            room: getAllRoomsSchema.shape.data.shape.rooms.element,
            lessonTime: getAllLessonTimesSchema.shape.data.shape.lessonTimes.element,
            date: z.string(),
            isModified: z.boolean(),
            isCanceled: z.boolean(),
            isMoved: z.boolean(),
            subGroup: subgroupsSchema,
            modifiedAt: z.coerce.string(),
        })
    ),
});

export const getActualTimetableWeekDaysSchema = z.object({
    group: z.object({
        id: z.number(),
        name: z.string(),
        ascId: z.string(),
        modifiedAt: z.coerce.date(),
    }),

    timetableFiltered: z.array(
        z.object({
            dayOfWeek: z.object({
                dayOfWeek: z.number().min(0).max(6),
                short: z.string().min(1),
                long: z.string().min(1),
            }),
            cards: getActualTimetableSchema.shape.cards,
        })
    ),
});
