using Repository.Entities.Timetable.Cards.Info;

namespace Repository.Entities.Timetable.Cards
{
    public interface ICard : IEntity
    {
        public Teacher? Teacher { get; }
        public Subject? Subject { get; }
        public Room? Cabinet { get; }
        public LessonTime? LessonTime { get; }
        public SubGroup SubGroup { get; }

        public int TeacherId { get; }
        public int SubjectId { get; }
        public int RoomId { get; }
        public int LessonTimeId { get; }
        public int RelatedTimetableId { get; }
    }
}
