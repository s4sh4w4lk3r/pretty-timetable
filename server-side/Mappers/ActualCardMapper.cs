
using Models.Request;
using Repository.Entities.Timetable.Cards.Parts;


namespace Mappers
{
    public static class ActualCardMapper
    {
        public static Repository.Entities.Timetable.Cards.ActualCard ToEntity(this ActualCardModels.ActualCardUpdate model)
        {
            return new()
            {
                Id = model.Id,
                SubGroup = (SubGroup)model.SubGroup,
                CabinetId = model.CabinetId,
                SubjectId = model.SubjectId,
                LessonTimeId = model.LessonTimeId,
                TeacherId = model.TeacherId,
                IsCanceled = model.IsCanceled,
                IsModified = model.IsModified,
                IsMoved = model.IsMoved,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                RelatedTimetableId = model.RelatedTimetableId,
                Date = model.Date
            };
        }

        public static Repository.Entities.Timetable.Cards.ActualCard ToEntity(this ActualCardModels.ActualCardCreate model)
        {
            return new()
            {
                Id = default,
                SubGroup = (SubGroup)model.SubGroup,
                CabinetId = model.CabinetId,
                SubjectId = model.SubjectId,
                LessonTimeId = model.LessonTimeId,
                TeacherId = model.TeacherId,
                IsCanceled = model.IsCanceled,
                IsModified = model.IsModified,
                IsMoved = model.IsMoved,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                RelatedTimetableId = model.RelatedTimetableId,
                Date = model.Date
            };
        }
    }
}
