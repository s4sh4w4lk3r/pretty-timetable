import ServiceResult from "@/types/result";
import { z } from "zod";

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

export const putSubjectSchema = z.object({
    id: z.coerce.number(),
    name: z.string().trim().min(1),
    ascId: z.string().nullish(),
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

export const putActualCardSchema = z.object({
    id: z.coerce.number(),
    subjectId: z.coerce.number().positive(),
    teacherId: z.coerce.number().positive(),
    roomId: z.coerce.number().positive(),
    lessonTimeId: z.coerce.number().positive(),
    relatedTimetableId: z.coerce.number().positive(),
    date: z
        .string()
        .trim()
        .min(1)
        .transform(arg => arg.split("-").reverse().join("-")),
    subgroup: z.coerce.number().gte(0).lte(4),
    isModified: z.coerce.boolean(),
    isMoved: z.coerce.boolean(),
    isCanceled: z.coerce.boolean(),
});
