namespace Models.Request
{
    public class GroupModels
    {
        public class GroupPut
        {
            public required int Id { get; init; }
            public required string Name { get; init; }
        }
    }
}
