import React from "react";
import { getTeachersSchema } from "@/fetching/admin/zodSchemas";
import { z } from "zod";

type TeacherType = z.infer<typeof getTeachersSchema.shape.data.shape.teachers.element>;
export default function TeacherEditor({ teachers }: { teachers: TeacherType[] }) {
    return <div>TeacherEditor</div>;
}
