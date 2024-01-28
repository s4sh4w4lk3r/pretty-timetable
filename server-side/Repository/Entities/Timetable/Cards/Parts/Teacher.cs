namespace Repository.Entities.Timetable.Cards.Parts;

public class Teacher : IEntity
{
    public required int Id { get; init; }
    public required string Lastname { get; init; }
    public required string Firstname { get; init; }
    public required string Middlename { get; init; }
    public string? AscId { get; init; }
    public required DateTime ModifiedAt { get; init; }

    public ICollection<StableCard>? StableCards { get; init; }
    public ICollection<ActualCard>? ActualCards { get; init; }
}