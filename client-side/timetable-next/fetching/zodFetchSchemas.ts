import { z } from "zod";

export namespace PublicZodFetchShemas {
    export const subgroupsSchema = z.enum(["ALL", "FIRST_GROUP", "SECOND_GROUP"]);

    export const actualTimetablesSchema = z.object({
        data: z.object({
            actualTimetables: z
                .array(
                    z.object({
                        group: z.object({ id: z.number(), name: z.string() }),
                        weekNumber: z.number(),
                        cards: z
                            .array(
                                z.object({
                                    id: z.number(),

                                    cabinet: z.object({
                                        id: z.number(),
                                        number: z.string(),
                                        address: z.string(),
                                    }),

                                    teacher: z.object({
                                        id: z.number(),
                                        firstname: z.string(),
                                        lastname: z.string(),
                                    }),

                                    subject: z.object({ name: z.string(), id: z.number() }),

                                    lessonTime: z.object({
                                        endsAt: z.string(),
                                        startsAt: z.string(),
                                        id: z.number(),
                                        number: z.number(),
                                    }),

                                    // FIXME : сделать coerce date
                                    date: z.string(),
                                    isModified: z.boolean(),
                                    isCanceled: z.boolean(),
                                    isMoved: z.boolean(),
                                    // Имеются на бекенде также подгруппы MALES и FEMALES, но они не используются.
                                    subGroup: subgroupsSchema,
                                })
                            )
                            .nonempty(),
                    })
                )
                .length(1),
        }),
    });

    export const groupsSchema = z.object({
        data: z.object({
            groups: z.array(z.object({ id: z.number(), name: z.string() })),
        }),
    });

    export const lessonTimesSchema = z.object({
        data: z.object({
            lessonTimes: z.array(
                z.object({
                    id: z.number(),
                    number: z.number(),
                    startsAt: z.string(),
                    endsAt: z.string(),
                })
            ),
        }),
    });
}

export namespace AdminZodFetchSchemas {
    export const roomsSchema = z.object({
        data: z.object({
            rooms: z
                .object({
                    id: z.number(),
                    address: z.string(),
                    number: z.string(),
                    fullName: z.string(),
                    ascId: z.string().optional(),
                    modifiedAt: z.coerce.date(),
                })
                .array(),
        }),
    });
}
