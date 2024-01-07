namespace Models.Request.CardParts
{
    public static class LessonTimeModels
    {
        public class LessonTimeCreate
        {
            public required int Number { get; init; }
            public required TimeOnly StartsAt { get; init; }
            public required TimeOnly EndsAt { get; init; }
        }

        public class LessonTimeUpdate
        {
            public required int Id { get; init; }
            public required int Number { get; init; }
            public required TimeOnly StartsAt { get; init; }
            public required TimeOnly EndsAt { get; init; }
        }
    }
}
