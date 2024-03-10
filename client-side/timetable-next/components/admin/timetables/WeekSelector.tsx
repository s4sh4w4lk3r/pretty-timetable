"use client";
import { getWeekNumbersSchema } from "@/fetching/admin/zodSchemas";
import { Select } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { z } from "zod";

type WeekType = z.infer<typeof getWeekNumbersSchema.shape.data.shape.weekNumbers.element>;
export default function WeekSelector({ weekNumbers }: { weekNumbers: WeekType[] }) {
    const router = useRouter();
    const weekNumberOptions = weekNumbers.map(w => (
        <option
            key={w.weekNumber}
            value={w.weekNumber}
        >
            {`${w.startWeek} - ${w.endWeek} (${w.weekNumber})`}
        </option>
    ));

    return (
        <Select
            onChange={e => (e.target.value ? router.push(`actual?weeknumber=${e.target.value}`) : null)}
            placeholder="Выберите неделю"
        >
            {weekNumberOptions}
        </Select>
    );
}
