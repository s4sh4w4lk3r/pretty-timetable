import TeacherEditor from "@/components/admin/teacher/TeacherEditor";
import { getTeachers } from "@/fetching/admin/requests";

export default async function TeachersAdmin() {
    const teachers = await getTeachers();
    return <TeacherEditor teachers={teachers}></TeacherEditor>;
}
