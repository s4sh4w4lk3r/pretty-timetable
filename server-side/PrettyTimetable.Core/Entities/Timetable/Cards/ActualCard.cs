using PrettyTimetable.Core.Entities.Timetable.Cards.Info;
using System.Text.Json.Serialization;

namespace PrettyTimetable.Core.Entities.Timetable.Cards
{
    public class ActualCard : ICard
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
        public required DateOnly Date { get; set; }
        public required bool IsModified { get; set; }
        public required bool IsCanceled { get; set; }
        public required bool IsMoved { get; set; }
        public required SubGroup SubGroup { get; set; }
        public required DateTime ModifiedAt { get; set; }

        public required int RelatedTimetableId { get; init; }
        [JsonIgnore] public ActualTimetable? RelatedTimetable { get; set; }
    }
}
