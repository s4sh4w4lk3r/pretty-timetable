export enum PublicQueries {
    ActualTimetableByGroupWeek = "PublicGetActualTimetableByGroupWeek",
    AllGroups = "PublicGetAllGroups",
    AllLessonTimes = "PublicGetAllLessonTimes",
}

export enum AdminQueries {
    AdminGetAllActualCardsByWeekAndGroup = "AdminGetAllActualCardsByWeekAndGroup",
    AllLessonTimes = "AdminGetAllLessonTimes",
    AllRooms = "AdminGetAllRooms",
    AllSubjects = "AdminGetAllSubjects",
    AllTeachers = "AdminGetAllTeachers",
    WeekNumbers = "AdminGetWeekNumbers",
}

export enum SharedQueries {
    HighLevelData = "HighLevelData",
}
