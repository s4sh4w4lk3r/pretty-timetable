﻿
using Repository.Entities.Timetable.Cards;

namespace Repository.Entities.Timetable
{
    public class ActualTimetable : ITimetable
    {
        public required int Id { get; init; }
        public Group? Group { get; set; }
        public required int GroupId { get; set; }
        public required int WeekNumber { get; set; }
        public required DateTime ModifiedAt { get; set; }
        public ICollection<ActualCard>? Cards { get; set; }
    }
}
