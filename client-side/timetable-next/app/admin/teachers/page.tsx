import TeacherEditor from "@/components/admin/teacher/TeacherEditor";
import { getAllTeachers } from "@/fetching/requests";

export default async function TeachersAdmin() {
    const teachers = await getAllTeachers();
    return <TeacherEditor teachers={teachers}></TeacherEditor>;
}
