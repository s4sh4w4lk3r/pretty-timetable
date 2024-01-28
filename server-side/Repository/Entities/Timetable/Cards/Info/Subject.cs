namespace Repository.Entities.Timetable.Cards.Info;

public class Subject : IEntity
{
    public required int Id { get; init; }
    public required string Name { get; init; }
    public string? AscId { get; init; }
    public required DateTime ModifiedAt { get; init; }

    public ICollection<StableCard>? StableCards { get; init; }
    public ICollection<ActualCard>? ActualCards { get; init; }
}