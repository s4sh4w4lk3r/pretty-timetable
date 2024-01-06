using Models.Request;
using Repository.Entities.Timetable.Cards;
using Repository.Entities.Timetable.Cards.Parts;

namespace Mappers
{
    public static class StableCardMapper
    {
        public static StableCard ToEntity(this StableCardModels.StableCardCreate model)
        {
            return new()
            {
                Id = default,
                LessonTimeId = model.LessonTimeId,
                RelatedTimetableId = model.RelatedTimetableId,
                SubjectId = model.SubjectId,
                TeacherId = model.TeacherId,
                CabinetId = model.CabinetId,
                IsWeekEven = model.IsWeekEven,
                SubGroup = (SubGroup)model.SubGroup,
                DayOfWeek = (DayOfWeek)model.DayOfWeek,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
        }

        public static StableCard ToEntity(this StableCardModels.StableCardUpdate model)
        {
            return new()
            {
                Id = model.Id,
                LessonTimeId = model.LessonTimeId,
                RelatedTimetableId = model.RelatedTimetableId,
                SubjectId = model.SubjectId,
                TeacherId = model.TeacherId,
                CabinetId = model.CabinetId,
                IsWeekEven = model.IsWeekEven,
                SubGroup = (SubGroup)model.SubGroup,
                DayOfWeek = (DayOfWeek)model.DayOfWeek,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
        }
    }
}
