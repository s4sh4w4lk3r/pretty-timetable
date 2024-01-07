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
                StartsAt = TimeOnly.Parse(model.StartsAt),
                EndsAt = TimeOnly.Parse(model.EndsAt),
#warning сделать на вход контроллерах regex для успешного парсинга времени
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
        }
    }
}
