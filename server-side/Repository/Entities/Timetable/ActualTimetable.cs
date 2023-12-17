
using Repository.Entities.Timetable.Cards;

namespace Repository.Entities.Timetable
{
    public class ActualTimetable : ITimetable
    {
        public int Id { get; init; }
        public Group? Group { get; init; }
        public int GroupId { get; init; }
        public int WeekNumber { get; init; }
        public DateTime CreatedAt { get; init; }
        public DateTime UpdatedAt { get; init; }
        public ICollection<ActualCard>? Cards { get; init; } 
        public bool CheckNoDuplicates()
        {
            throw new NotImplementedException();
        }
    }
}
