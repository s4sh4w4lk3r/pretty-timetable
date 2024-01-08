using Repository.Entities.Timetable.Cards;

namespace Repository.Entities.Timetable
{
    public class StableTimetable : ITimetable
    {
        required public int Id { get; init; }
        public Group? Group { get; set; }
        required public int GroupId { get; set; }
        required public DateTime CreatedAt { get; init; }
        required public DateTime UpdatedAt { get; set; }
        public ICollection<StableCard>? Cards { get; set; }
    }
}
