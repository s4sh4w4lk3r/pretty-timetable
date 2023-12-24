﻿using Repository.Entities.Timetable.Cards.Parts;

namespace Repository.Entities.Timetable.Cards
{
    public class StableCard : ICard
    {
        public int Id { get; init; }
        public Teacher? Teacher { get; init; }
        public Subject? Subject { get; init; }
        public Cabinet? Cabinet { get; init; }
        public LessonTime? LessonTime { get; init; }
        public int TeacherId { get; init; }
        public int SubjectId { get; init; }
        public int CabinetId { get; init; }
        public int LessonTimeId { get; init; }
        public bool IsWeekEven { get; init; }
        public DayOfWeek DayOfWeek { get; init; }
        public SubGroup SubGroup { get; init; }

        public int RelatedTimetableId { get;init; } 
        public StableTimetable? RelatedTimetable { get;init; } 

        public DateTime CreatedAt { get; init; }
        public DateTime UpdatedAt { get; init; }
    }
}