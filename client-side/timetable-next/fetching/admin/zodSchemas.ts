import ServiceResult from "@/types/result";
import { z } from "zod";

export const getRoomsSchema = z.object({
    data: z.object({
        rooms: z
            .object({
                id: z.number(),
                address: z.string(),
                number: z.string(),
                fullName: z.string(),
                ascId: z.string().nullish(),
                modifiedAt: z.coerce.date(),
            })
            .array(),
    }),
});

export const serviceResultSchema: z.ZodSchema<ServiceResult> = z.lazy(() =>
    z.object({
        success: z.boolean(),
        description: z.string(),
        innerServiceResult: serviceResultSchema.nullish(),
        value: z.unknown().nullish(),
    })
);

export const putRoomSchema = z.object({
    id: z.coerce.number(),
    address: z.string().trim().min(1),
    number: z.string().trim().min(1),
    fullName: z.string().trim().min(1),
    ascId: z.string().nullish(),
});

export const getSubjectsSchema = z.object({
    data: z.object({
        subjects: z.array(
            z.object({
                id: z.number(),
                name: z.string(),
                modifiedAt: z.coerce.date(),
                ascId: z.string().nullish(),
            })
        ),
    }),
});

export const putSubjectSchema = z.object({
    id: z.coerce.number(),
    name: z.string().trim().min(1),
    ascId: z.string().nullish(),
});

export const getTeachersSchema = z.object({
    data: z.object({
        teachers: z.array(
            z.object({
                id: z.number(),
                lastname: z.string(),
                firstname: z.string(),
                middlename: z.string(),
                ascId: z.string().nullish(),
                modifiedAt: z.coerce.date(),
            })
        ),
    }),
});

export const putTeacherSchema = z.object({
    id: z.coerce.number(),
    lastname: z.string(),
    firstname: z.string(),
    middlename: z.string(),
    ascId: z.string().nullish(),
});

export const putGroupSchema = z.object({
    id: z.coerce.number(),
    name: z.string().trim().min(1),
    ascId: z.string().nullish(),
});

export const getWeekNumbersSchema = z.object({
    data: z.object({
        weekNumbers: z.array(
            z.object({
                weekNumber: z.number(),
                startWeek: z.string(),
                endWeek: z.string(),
            })
        ),
    }),
});

export const getAllActualCardsByGroupAndWeekSchema = z.object({
    data: z.object({
        actualCards: z.array(
            z.object({
                id: z.number(),
                subjectId: z.number(),
                lessonTimeId: z.number(),
                roomId: z.number(),
                teacherId: z.number(),
                subGroup: z.string(),
                date: z.string(),
                isMoved: z.boolean(),
                isCanceled: z.boolean(),
                isModified: z.boolean(),
                modifiedAt: z.string(),
            })
        ),
    }),
});
