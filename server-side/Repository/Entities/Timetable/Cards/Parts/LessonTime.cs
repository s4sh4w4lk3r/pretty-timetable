namespace Repository.Entities.Timetable.Cards.Parts
{
    public class LessonTime : IEntity/*, IEquatable<LessonTime?>*/
    {
        public int Id { get; init; }
        public required int Number { get; init; }
        public required TimeOnly StartsAt { get; init; }
        public required TimeOnly EndsAt { get; init; }
        public DateTime CreatedAt { get; init; }
        public DateTime UpdatedAt { get; init; }
/*        public override bool Equals(object? obj)
        {
            return Equals(obj as LessonTime);
        }

        public bool Equals(LessonTime? other)
        {
            return other is not null &&
                   Id == other.Id &&
                   Number == other.Number &&
                   StartsAt.Equals(other.StartsAt) &&
                   EndsAt.Equals(other.EndsAt);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id, Number, StartsAt, EndsAt);
        }

        public static bool operator ==(LessonTime? left, LessonTime? right)
        {
            return EqualityComparer<LessonTime>.Default.Equals(left, right);
        }

        public static bool operator !=(LessonTime? left, LessonTime? right)
        {
            return !(left == right);
        }*/
    }
}
