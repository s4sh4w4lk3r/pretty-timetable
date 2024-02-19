using System.ComponentModel.DataAnnotations;

namespace Models.Request.CardParts
{
    public static class SubjectModels
    {
        public class SubjectPut
        {
            public required int Id { get; init; }
            [Required] public required string Name { get; init; }
            public string AscId { get; init; } = string.Empty;
        }
    }
}
