
using Models.Request;
using Repository.Entities.Timetable.Cards.Info;

namespace Mappers
{
    public static class ActualCardMapper
    {
        public static Repository.Entities.Timetable.Cards.ActualCard ToEntity(this ActualCardModels.ActualCardPut model)
        {
            return new()
            {
                Id = model.Id,
                SubGroup = (SubGroup)model.SubGroup,
                RoomId = model.RoomId,
                SubjectId = model.SubjectId,
                LessonTimeId = model.LessonTimeId,
                TeacherId = model.TeacherId,
                IsCanceled = model.IsCanceled,
                IsModified = model.IsModified,
                IsMoved = model.IsMoved,
                ModifiedAt = DateTime.UtcNow,
                RelatedTimetableId = model.RelatedTimetableId,
                Date = DateOnly.Parse(model.Date)
            };
        }
    }
}
