import SubjectEditor from "@/components/admin/subjects/SubjectEditor";
import { getAllCachedSubjects } from "@/fetching/cachedData";

export default async function SubjectsAdmin() {
    const subjects = await getAllCachedSubjects();
    return <SubjectEditor subjects={subjects}></SubjectEditor>;
}
