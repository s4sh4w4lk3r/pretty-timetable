using System.ComponentModel.DataAnnotations;

namespace Models.Request.CardParts
{
    public static class RoomModels
    {
        public class RoomPut
        {
            public required int Id { get; init; }
            [Required] public required string Address { get; init; }
            [Required] public required string Number { get; init; }
            [Required] public required string FullName { get; init; }
            public string AscId { get; init; } = string.Empty;

        }
    }
}
