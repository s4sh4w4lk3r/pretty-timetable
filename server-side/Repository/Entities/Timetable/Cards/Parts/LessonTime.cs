namespace Repository.Entities.Timetable.Cards.Parts
{
    public class LessonTime : IEntity
    {
        public required int Id { get; init; }
        public required int Number { get; init; }
        public required TimeOnly StartsAt { get; init; }
        public required TimeOnly EndsAt { get; init; }
        public required DateTime CreatedAt { get; init; }
        public required DateTime UpdatedAt { get; init; }

        public ICollection<StableCard>? StableCards { get; init; }
        public ICollection<ActualCard>? ActualCards { get; init; }

    }
}
