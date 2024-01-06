
using Repository.Entities.Timetable.Cards;

namespace Repository.Entities.Timetable
{
    public class ActualTimetable : ITimetable
    {
        public int Id { get; init; }
        public Group? Group { get; set; }
        public int GroupId { get; set; }
        public int WeekNumber { get; set; }
        public DateTime CreatedAt { get; init; }
        public DateTime UpdatedAt { get; set; }
        public ICollection<ActualCard>? Cards { get; set; } 
    }
}
