namespace Models.Request.CardParts
{
    public static class CabinetModels
    {
        public class CabinetPut
        {
            public required int Id { get; init; }
            public required string Address { get; init; }
            public required string Number { get; init; }
            public required string FullName { get; init; }

        }
    }
}
