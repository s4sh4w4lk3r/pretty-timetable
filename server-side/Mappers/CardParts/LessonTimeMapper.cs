using Models.Request.CardParts;
using Repository.Entities.Timetable.Cards.Parts;

namespace Mappers.CardParts
{
    public static class LessonTimeMapper
    {
        public static LessonTime ToEntity(this LessonTimeModels.LessonTimeCreate model)
        {
            return new()
            {
                Id = default,
                Number = model.Number,
                StartsAt = model.StartsAt,
                EndsAt = model.EndsAt,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
        }

        public static LessonTime ToEntity(this LessonTimeModels.LessonTimeUpdate model)
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
