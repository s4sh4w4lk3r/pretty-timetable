namespace Models.Request.CardParts
{
    public static class SubjectModels
    {
        public class SubjectCreate
        {
            public required string Name { get; init; }
        }

        public class SubjectUpdate
        {
            public required int Id { get; init; }
            public required string Name { get; init; }
        }
    }
}
