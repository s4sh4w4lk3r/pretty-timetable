import SubjectEditor from "@/components/admin/subjects/SubjectEditor";
import { getSubjects } from "@/fetching/admin/requests";

export default async function SubjectsAdmin() {
    const subjects = await getSubjects();
    return <SubjectEditor subjects={subjects}></SubjectEditor>;
}
