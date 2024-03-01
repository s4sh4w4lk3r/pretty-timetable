using Repository.Entities.Timetable;
using Repository.Entities.Timetable.Cards.Info;

namespace Repository.Entities.Substs
{
    public class Substitution : IEntity
    {
        public required int Id { get; init; }
        public required DateTime ModifiedAt { get; init; }


        public required int AbsentId { get; init; }
        public required int LessonTimeId { get; init; }
        public required int SubjectId { get; init; }
        public required int GroupId { get; init; }
        public required int RoomId { get; init; }
        public SubGroup SubGroup { get; init; }
        public required int TeacherId { get; init; }


        public Teacher? Absent { get; init; }
        public Subject? Subject { get; init; }
        public Group? Group { get; init; }
        public Teacher? Teacher { get; init; }
        public Room? Cabinet { get; init; }
        public LessonTime? LessonTime { get; init; }

        public required DateOnly Date { get; init; }

        /// <summary>
        /// Уведомлены ли подписчики об этой замене.
        /// </summary>
        public required bool IsSubscribersNotified { get; set; }
    }
}
