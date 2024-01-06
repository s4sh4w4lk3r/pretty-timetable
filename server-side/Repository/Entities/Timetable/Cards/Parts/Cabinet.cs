﻿namespace Repository.Entities.Timetable.Cards.Parts;

public class Cabinet : IEntity
{
    public required int Id { get; init; }
    public required string Address { get; init; }
    public required string Number { get; init; }
    public required string FullName { get; init; }
    public string? AscId { get; init; }
    public required DateTime CreatedAt { get; init; }
    public required DateTime UpdatedAt { get; init; }
    public ICollection<StableCard>? StableCards { get; init; }
    public ICollection<ActualCard>? ActualCards { get; init; }
}