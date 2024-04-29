﻿using PrettyTimetable.Core;
using PrettyTimetable.Core.Entities.Timetable.Cards;
using System.Text.Json.Serialization;

namespace PrettyTimetable.Core.Entities.Timetable.Cards.Info;

public class Room : IEntity
{
    public required int Id { get; init; }
    public required string Address { get; init; }
    public required string Number { get; init; }
    public required string FullName { get; init; }
    public string? AscId { get; init; }
    public required DateTime ModifiedAt { get; init; }
    [JsonIgnore]  public ICollection<StableCard>? StableCards { get; init; }
    [JsonIgnore] public ICollection<ActualCard>? ActualCards { get; init; }
}