﻿using Repository.Entities.Timetable.Cards.Parts;

namespace Repository.Entities.Timetable.Cards
{
    public class StableCard : ICard
    {
        public required int Id { get; init; }
        public Teacher? Teacher { get; set; }
        public Subject? Subject { get; set; }
        public Cabinet? Cabinet { get; set; }
        public LessonTime? LessonTime { get; set; }
        public required int TeacherId { get; set; }
        public required int SubjectId { get; set; }
        public required int CabinetId { get; set; }
        public required int LessonTimeId { get; set; }
        public required bool IsWeekEven { get; set; }
        public required DayOfWeek DayOfWeek { get; set; }
        public required SubGroup SubGroup { get; set; }

        public required int RelatedTimetableId { get; init; }
        public StableTimetable? RelatedTimetable { get; set; }

        public required DateTime CreatedAt { get; init; }
        public required DateTime UpdatedAt { get; set; }
    }
}
