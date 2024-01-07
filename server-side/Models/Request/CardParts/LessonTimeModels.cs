namespace Models.Request.CardParts
{
    public static class LessonTimeModels
    {

        public class LessonTimePut
        {
            public required int Id { get; init; }
            public required int Number { get; init; }
            public required TimeOnly StartsAt { get; init; }
            public required TimeOnly EndsAt { get; init; }
        }
    }
}
