import DayOfWeek from "@/types/DayOfWeek";
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
export const dayOfWeekSchema = z.union([z.string(), z.number()]).transform((val, ctx) => {
    switch (val) {
        case "SUNDAY":
        case 0:
            return DayOfWeek.Sunday;

        case "MONDAY":
        case 1:
            return DayOfWeek.Monday;

        case "TUESDAY":
        case 2:
            return DayOfWeek.Tuesday;

        case "WEDNESDAY":
        case 3:
            return DayOfWeek.Wednesday;

        case "THURSDAY":
        case 4:
            return DayOfWeek.Thursday;

        case "FRIDAY":
        case 5:
            return DayOfWeek.Friday;

        case "SATURDAY":
        case 6:
            return DayOfWeek.Saturday;

        default:
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Incorrect weekday recieved.",
                params: { value: val },
            });
            return z.NEVER;
    }
});

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
                        date: z.coerce.date(),
                        relatedTimetableId: z.number(),
                        isModified: z.boolean(),
                        isCanceled: z.boolean(),
                        isMoved: z.boolean(),
                        subGroup: subgroupsSchema,
                        modifiedAt: z.coerce.date(),
                    })
                ),
            })
        ),
    }),
});

export const getActualTimetableSchema = z.object({
    id: z.number(),
    group: getAllGroupsSchema.shape.data.shape.groups.element,

    cards: z.array(
        z.object({
            id: z.number(),
            teacher: getAllTeachersSchema.shape.data.shape.teachers.element,
            subject: getAllSubjectsSchema.shape.data.shape.subjects.element,
            room: getAllRoomsSchema.shape.data.shape.rooms.element,
            lessonTime: getAllLessonTimesSchema.shape.data.shape.lessonTimes.element,
            date: z.coerce.date(),
            relatedTimetableId: z.number(),
            isModified: z.boolean(),
            isCanceled: z.boolean(),
            isMoved: z.boolean(),
            subGroup: subgroupsSchema,
            modifiedAt: z.coerce.date(),
        })
    ),
});

export const getActualTimetableWeekDaysSchema = z.object({
    id: z.number(),
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

export const getStableTimetableIdsOnlySchema = z.object({
    data: z.object({
        stableTimetables: z.array(
            z.object({
                id: z.number(),
                groupId: z.number(),
                cards: z.array(
                    z.object({
                        id: z.number(),
                        teacherId: z.number(),
                        subjectId: z.number(),
                        roomId: z.number(),
                        lessonTimeId: z.number(),
                        isWeekEven: z.boolean(),
                        dayOfWeek: dayOfWeekSchema,
                        subGroup: subgroupsSchema,
                        relatedTimetableId: z.number(),
                        modifiedAt: z.coerce.date(),
                    })
                ),
            })
        ),
    }),
});

export const getStableTimetableSchema = z.object({
    id: z.number(),
    group: z.object({
        id: z.number(),
        name: z.string(),
        ascId: z.string().nullish(),
        modifiedAt: z.coerce.date(),
    }),
    cards: z.array(
        z.object({
            id: z.number(),
            teacher: z.object({
                id: z.number(),
                firstname: z.string(),
                lastname: z.string(),
                middlename: z.string(),
                ascId: z.string().nullish(),
                modifiedAt: z.coerce.date(),
            }),
            subject: z.object({
                id: z.number(),
                name: z.string(),
                ascId: z.string().nullish(),
                modifiedAt: z.coerce.date(),
            }),
            room: z.object({
                id: z.number(),
                number: z.string(),
                address: z.string(),
                fullName: z.string(),
                ascId: z.string().nullish(),
                modifiedAt: z.coerce.date(),
            }),
            lessonTime: z.object({
                id: z.number(),
                number: z.number(),
                startsAt: z.string(),
                endsAt: z.string(),
                modifiedAt: z.coerce.date(),
            }),
            isWeekEven: z.boolean(),
            dayOfWeek: dayOfWeekSchema,
            subgroup: subgroupsSchema,
            relatedTimetableId: z.number(),
            modifiedAt: z.coerce.date(),
        })
    ),
});
