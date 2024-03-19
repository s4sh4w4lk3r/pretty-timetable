"use client";
import { getAllLessonTimesSchema, getAllRoomsSchema, getAllSubjectsSchema, getAllTeachersSchema } from "@/fetching/zodSchemas";
import { createContext } from "react";
import { z } from "zod";

export type TimetableContextType = {
    teachers: z.infer<typeof getAllTeachersSchema.shape.data.shape.teachers>;
    subjects: z.infer<typeof getAllSubjectsSchema.shape.data.shape.subjects>;
    rooms: z.infer<typeof getAllRoomsSchema.shape.data.shape.rooms>;
    lessonTimes: z.infer<typeof getAllLessonTimesSchema.shape.data.shape.lessonTimes>;
};
export const TimetableContext = createContext<TimetableContextType | null>(null);
