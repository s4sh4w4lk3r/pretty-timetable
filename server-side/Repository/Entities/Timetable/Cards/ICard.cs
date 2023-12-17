using Repository.Entities.Timetable.Cards.Parts;

namespace Repository.Entities.Timetable.Cards
{
    public interface ICard : IEntity
    {
        public Teacher? Teacher { get; }
        public Subject? Subject { get; }
        public Cabinet? Cabinet { get; }
        public LessonTime? LessonTime { get; }
        public SubGroup SubGroup { get; }

        public int TeacherId { get; }
        public int SubjectId { get; }
        public int CabinetId { get; }
        public int LessonTimeId { get; }
    }
}
