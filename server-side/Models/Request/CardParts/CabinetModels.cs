namespace Models.Request.CardParts
{
    public static class CabinetModels
    {
        public class CabinetCreate
        {
            public required string Address { get; init; }
            public required string Number { get; init; }
            public required string FullName { get; init; }
        }

        public class CabinetUpdate
        {
            public required int Id { get; init; }
            public required string Address { get; init; }
            public required string Number { get; init; }
            public required string FullName { get; init; }

        }
    }
}
