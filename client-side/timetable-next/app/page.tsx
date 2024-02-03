import Card from "@/components/timetable/Card";
import { getTimetable } from "@/fetching/rest/data";

export default async function Home() {
    const { cabinet, id, subject, teacher, lessonTime } = (await getTimetable())[0].cards![2];
    return (
        <Card
            id={id}
            key={id}
            cabinet={cabinet.number}
            lessonTime={lessonTime}
            subject={subject.name}
            teacher={teacher.lastname + " " + teacher.firstname}
            status="none"
            changes="none"
        ></Card>
    );
}
