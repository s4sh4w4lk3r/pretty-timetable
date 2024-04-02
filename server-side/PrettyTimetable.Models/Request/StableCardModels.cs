namespace Models.Request
{
    public static class StableCardModels
    {
        public class StableCardPut
        {
            public required int Id { get; init; }
            public required int TeacherId { get; set; }
            public required int SubjectId { get; set; }
            public required int RoomId { get; set; } 
            public required int LessonTimeId { get; set; }
            public required bool IsWeekEven { get; set; }
            public required int DayOfWeek { get; set; }
            public required int SubGroup { get; set; }
            public required int RelatedTimetableId { get; init; }
        }
    }
}
