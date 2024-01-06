using Repository.Entities.Timetable.Cards;

namespace Repository.Entities.Timetable
{
    public class StableTimetable : ITimetable
    {
        public int Id { get; init; }
        public Group? Group { get; set; }
        public int GroupId { get; set; }
        public DateTime CreatedAt { get; init; }
        public DateTime UpdatedAt { get; set; }
        public ICollection<StableCard>? Cards { get; set; }
    }
}
