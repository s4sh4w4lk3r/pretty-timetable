namespace Repository.Entities.Timetable.Cards.Parts;

public class Teacher : IEntity
{
    public int Id { get; init; }
    public required string Lastname { get; init; }
    public required string Firstname { get; init; }
    public required string Middlename { get; init; }
    public string? AscId { get; init; }
    public DateTime CreatedAt { get; init; }
    public DateTime UpdatedAt { get; init; }

    public ICollection<StableCard>? StableCards { get; init; }
    public ICollection<ActualCard>? ActualCards { get; init; }
}