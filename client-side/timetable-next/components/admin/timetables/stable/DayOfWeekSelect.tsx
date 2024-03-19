import DayOfWeek from "@/types/DayOfWeek";
import { HStack, Select, Text } from "@chakra-ui/react";

export default function DayOfWeekSelect({ dayOfWeek }: { dayOfWeek: DayOfWeek }) {
    return (
        <HStack w={"full"}>
            <Text>День недели</Text>
            <Select
                defaultValue={dayOfWeek}
                name="dayOfWeek"
            >
                <option value={1}>Понедельник</option>
                <option value={2}>Вторник</option>
                <option value={3}>Среда</option>
                <option value={4}>Четверг</option>
                <option value={5}>Пятница</option>
                <option value={6}>Суббота</option>
                <option value={0}>Воскресенье</option>
            </Select>
        </HStack>
    );
}
