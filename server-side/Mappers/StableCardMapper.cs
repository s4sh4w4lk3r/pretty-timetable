using Models.Request;
using Repository.Entities.Timetable.Cards;
using Repository.Entities.Timetable.Cards.Info;

namespace Mappers
{
    public static class StableCardMapper
    {

        public static StableCard ToEntity(this StableCardModels.StableCardPut model)
        {
            return new()
            {
                Id = model.Id,
                LessonTimeId = model.LessonTimeId,
                RelatedTimetableId = model.RelatedTimetableId,
                SubjectId = model.SubjectId,
                TeacherId = model.TeacherId,
                RoomId = model.RoomId,
                IsWeekEven = model.IsWeekEven,
                SubGroup = (SubGroup)model.SubGroup,
                DayOfWeek = (DayOfWeek)model.DayOfWeek,
                ModifiedAt = DateTime.UtcNow
            };
        }
    }
}
