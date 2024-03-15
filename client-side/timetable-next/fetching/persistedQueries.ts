export enum PublicQueries {}

export enum AdminQueries {
    WeekNumbers = "AdminGetWeekNumbers",
    GetStableTimetableByGroup = "AdminGetStableTimetableByGroup",
}

export enum SharedQueries {
    GetAllSubjects = "SharedGetAllSubjects",
    GetAllTeachers = "SharedGetAllTeachers",
    GetAllRooms = "SharedGetAllRooms",
    GetAllLessonTimes = "SharedGetAllLessonTimes",
    GetAllGroups = "SharedGetAllGroups",
    GetActualTimetableByGroupAndWeek = "SharedGetActualTimetableByGroupAndWeek",
}
