using Models.Request.CardParts;
using Repository.Entities.Timetable.Cards.Parts;

namespace Mappers.CardParts
{
    public static class SubjectMapper
    {
        public static Subject ToEntity(this SubjectModels.SubjectCreate model)
        {
            return new()
            {
                Id = default,
                Name = model.Name,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
            };
        }

        public static Subject ToEntity(this SubjectModels.SubjectUpdate model)
        {
            return new()
            {
                Id = model.Id,
                Name = model.Name,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
            };
        }
    }
}
