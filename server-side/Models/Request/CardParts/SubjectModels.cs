namespace Models.Request.CardParts
{
    public static class SubjectModels
    {
        public class SubjectPut
        {
            public required int Id { get; init; }
            public required string Name { get; init; }
        }
    }
}
