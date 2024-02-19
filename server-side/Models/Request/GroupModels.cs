using System.ComponentModel.DataAnnotations;

namespace Models.Request
{
    public class GroupModels
    {
        public class GroupPut
        {
            public required int Id { get; init; }
            [Required] public required string Name { get; init; }
            public string AscId { get; init; } = string.Empty;
        }
    }
}
