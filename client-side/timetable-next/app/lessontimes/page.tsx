import alertNoData from "@/components/miscellaneous/alertNoData";
import { getLessonTimes } from "@/fetching/graphql/requests";

export default async function LessonTimes() {
    const lessontimes = await getLessonTimes();
    if (!lessontimes) {
        return alertNoData;
    }

    return (
        <ul>
            {lessontimes.map(g => (
                <li key={g.id}>
                    {g.number} {g.startsAt.toString()} {g.endsAt.toString()}
                </li>
            ))}
        </ul>
    );
}
