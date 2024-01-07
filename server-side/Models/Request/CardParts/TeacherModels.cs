namespace Models.Request.CardParts
{
    public static class TeacherModels
    {
        public class TeacherCreate
        {
            public required string Lastname { get; init; }
            public required string Firstname { get; init; }
            public required string Middlename { get; init; }
        }

        public class TeacherUpdate
        {
            public int Id { get; init; }
            public required string Lastname { get; init; }
            public required string Firstname { get; init; }
            public required string Middlename { get; init; }

        }
    }
}
