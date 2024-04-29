using PrettyTimetable.Core;
using PrettyTimetable.Core.Entities.Timetable.Cards;
using System.Text.Json.Serialization;

namespace PrettyTimetable.Core.Entities.Timetable.Cards.Info;

public class Subject : IEntity
{
    public required int Id { get; init; }
    public required string Name { get; init; }
    public string? AscId { get; init; }
    public required DateTime ModifiedAt { get; init; }

    [JsonIgnore] public ICollection<StableCard>? StableCards { get; init; }
    [JsonIgnore] public ICollection<ActualCard>? ActualCards { get; init; }
}