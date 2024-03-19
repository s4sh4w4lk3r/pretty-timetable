import TeacherEditor from "@/components/admin/teacher/TeacherEditor";
import { getAllCachedTeachers } from "@/fetching/cachedData";

export default async function TeachersAdmin() {
    const teachers = await getAllCachedTeachers();
    return <TeacherEditor teachers={teachers}></TeacherEditor>;
}
