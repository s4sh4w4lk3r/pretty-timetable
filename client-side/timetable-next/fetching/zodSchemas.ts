import { z } from "zod";

export const highLevelDataSchema = z.object({
    data: z.object({
        subjects: z.array(
            z.object({
                id: z.number(),
                name: z.string().trim().min(1),
                ascId: z.string().optional(),
                modifiedAt: z.coerce.date(),
            })
        ),

        teachers: z.array(
            z.object({
                id: z.number(),
                firstname: z.string().trim().min(1),
                lastname: z.string().trim().min(1),
                middlename: z.string(),
                ascId: z.string().optional(),
                modifiedAt: z.coerce.date(),
            })
        ),

        rooms: z.array(
            z.object({
                id: z.number(),
                number: z.string().trim().min(1),
                address: z.string().trim().min(1),
                fullName: z.string().trim().min(1),
                ascId: z.string().optional(),
                modifiedAt: z.coerce.date(),
            })
        ),

        lessonTimes: z.array(
            z.object({
                endsAt: z.string().trim().min(1),
                startsAt: z.string().trim().min(1),
                number: z.number(),
                modifiedAt: z.coerce.date(),
            })
        ),

        groups: z.array(
            z.object({
                id: z.number(),
                name: z.string().trim().min(1),
                ascId: z.string().optional(),
                modifiedAt: z.coerce.date(),
            })
        ),
    }),
});
