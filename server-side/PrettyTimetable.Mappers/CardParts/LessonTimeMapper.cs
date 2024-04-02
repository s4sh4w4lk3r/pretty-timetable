using Models.Request.CardParts;
using PrettyTimetable.Core.Entities.Timetable.Cards.Info;

namespace Mappers.CardParts
{
    public static class LessonTimeMapper
    {
        public static LessonTime ToEntity(this LessonTimeModels.LessonTimePut model)
        {
            return new()
            {
                Id = model.Id,
                Number = model.Number,
                StartsAt = TimeOnly.Parse(model.StartsAt),
                EndsAt = TimeOnly.Parse(model.EndsAt),
                ModifiedAt = DateTime.UtcNow
            };
        }
    }
}
