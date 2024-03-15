import SubjectEditor from "@/components/admin/subjects/SubjectEditor";
import { getAllSubjects } from "@/fetching/requests";

export default async function SubjectsAdmin() {
    const subjects = await getAllSubjects();
    return <SubjectEditor subjects={subjects}></SubjectEditor>;
}
