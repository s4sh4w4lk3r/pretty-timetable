using Models.Request.CardParts;
using Repository.Entities.Timetable.Cards.Parts;

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
                StartsAt = model.StartsAt,
                EndsAt = model.EndsAt,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
        }
    }
}
