import ServiceResult from "@/types/serviceResult";
import { z } from "zod";

export const roomsSchema = z.object({
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

export const updateRoomSchema = z.object({
    id: z.coerce.number(),
    address: z.string().trim().min(1),
    number: z.string().trim().min(1),
    fullName: z.string().trim().min(1),
    ascId: z.string().nullish(),
});
