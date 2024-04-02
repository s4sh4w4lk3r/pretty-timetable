using PrettyTimetable.Core;
using PrettyTimetable.Core.Entities.Timetable.Cards;

namespace PrettyTimetable.Core.Entities.Timetable.Cards.Info
{
    public class LessonTime : IEntity
    {
        public required int Id { get; init; }
        public required int Number { get; init; }
        public required TimeOnly StartsAt { get; init; }
        public required TimeOnly EndsAt { get; init; }
        public required DateTime ModifiedAt { get; init; }

        public ICollection<StableCard>? StableCards { get; init; }
        public ICollection<ActualCard>? ActualCards { get; init; }

    }
}
