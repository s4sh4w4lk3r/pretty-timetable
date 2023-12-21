namespace Repository.Entities.Timetable.Cards.Parts;

public class Cabinet : IEntity
{
    public int Id { get; init; }
    public required string Address { get; init; }
    public required string Number { get; init; }
    public string? AscId { get; init; }
    public DateTime CreatedAt { get; init; }
    public DateTime UpdatedAt { get; init; }
    public ICollection<StableCard>? StableCards { get; init; }
    public ICollection<ActualCard>? ActualCards { get; init; }
}