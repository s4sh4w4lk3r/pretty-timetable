export enum PublicQueries {
    ActualTimetableByGroupWeek = "PublicGetActualTimetableByGroupWeek",
    AllGroups = "PublicGetAllGroups",
    AllLessonTimes = "PublicGetAllLessonTimes",
}

export enum AdminQueries {
    AllActualCardsByRttDate = "AdminGetAllActualCardsByRttDate",
    AllActualTimetablesByWeek = "AdminGetAllActualTimetablesByWeek",
    AllGroups = "AdminGetAllGroups",
    AllLessonTimes = "AdminGetAllLessonTimes",
    AllRooms = "AdminGetAllRooms",
    AllStableCardsByRtt = "AdminGetAllStableCardsByRtt",
    AllStableTimetables = "AdminGetAllStableTimetables",
    AllSubjects = "AdminGetAllSubjects",
    AllTeachers = "AdminGetAllTeachers",
}
