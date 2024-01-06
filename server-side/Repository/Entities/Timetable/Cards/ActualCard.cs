using Repository.Entities.Timetable.Cards.Parts;

namespace Repository.Entities.Timetable.Cards
{
    public class ActualCard : ICard
    {
        public int Id { get; init; }
        public Teacher? Teacher { get; set; }
        public Subject? Subject { get; set; }
        public Cabinet? Cabinet { get; set; }
        public LessonTime? LessonTime { get; set; }
        public int TeacherId { get; set; }
        public int SubjectId { get; set; }
        public int CabinetId { get; set; }
        public int LessonTimeId { get; set; }
        public DateOnly Date { get; init; }
        public bool IsModified { get; set; }
        public bool IsCanceled { get; set; }
        public bool IsMoved { get; set; }
        public SubGroup SubGroup { get; set; }
        public DateTime CreatedAt { get; init; }
        public DateTime UpdatedAt { get; set; }

        public int RelatedTimetableId { get; init; }
        public ActualTimetable? RelatedTimetable { get; set; }
    }
}
