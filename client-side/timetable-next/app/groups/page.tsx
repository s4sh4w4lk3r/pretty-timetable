import { getGroups } from "@/fetching/rest/data";

export default async function Groups() {
    const groups = await getGroups();
    return (
        <ul>
            {groups.map(g => (
                <li key={g.id}> {g.name}</li>
            ))}
        </ul>
    );
}
