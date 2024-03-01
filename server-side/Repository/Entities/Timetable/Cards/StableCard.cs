using Repository.Entities.Timetable.Cards.Info;

namespace Repository.Entities.Timetable.Cards
{
    public class StableCard : ICard
    {
        public required int Id { get; init; }
        public Teacher? Teacher { get; set; }
        public Subject? Subject { get; set; }
        public Room? Cabinet { get; set; }
        public LessonTime? LessonTime { get; set; }
        public required int TeacherId { get; set; }
        public required int SubjectId { get; set; }
        public required int RoomId { get; set; }
        public required int LessonTimeId { get; set; }
        public required bool IsWeekEven { get; set; }
        public required DayOfWeek DayOfWeek { get; set; }
        public required SubGroup SubGroup { get; set; }

        public required int RelatedTimetableId { get; init; }
        public StableTimetable? RelatedTimetable { get; set; }

        public required DateTime ModifiedAt { get; set; }
    }
}
