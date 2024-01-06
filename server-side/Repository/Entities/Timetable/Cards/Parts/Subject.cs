namespace Repository.Entities.Timetable.Cards.Parts;

public class Subject : IEntity
{
    public required int Id { get; init; }
    public required string Name { get; init; }
    public string? AscId { get; init; }
    public required DateTime CreatedAt { get; init; }
    public required DateTime UpdatedAt { get; init; }

    public ICollection<StableCard>? StableCards { get; init; }
    public ICollection<ActualCard>? ActualCards { get; init; }
}