using PrettyTimetable.Core.Entities.Timetable.Cards;

namespace PrettyTimetable.Core.Entities.Timetable
{
    public class StableTimetable : ITimetable
    {
        required public int Id { get; init; }
        public Group? Group { get; set; }
        required public int GroupId { get; set; }
        required public DateTime ModifiedAt { get; set; }
        public ICollection<StableCard>? Cards { get; set; }
    }
}
