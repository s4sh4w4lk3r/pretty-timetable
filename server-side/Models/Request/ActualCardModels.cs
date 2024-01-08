namespace Models.Request
{
    public static class ActualCardModels
    {
        public class ActualCardPut
        {
            public int Id { get; init; }
            public int CabinetId { get; init; }
            public bool IsCanceled { get; init; }
            public bool IsModified { get; init; }
            public bool IsMoved { get; init; }
            public int LessonTimeId { get; init; }
            public int SubGroup { get; init; }
            public int SubjectId { get; init; }
            public int TeacherId { get; init; }
            public int RelatedTimetableId { get; init; }
            public DateOnly Date { get; init; }
        }
    }
}
