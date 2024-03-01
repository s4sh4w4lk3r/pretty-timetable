using Models.Request.CardParts;
using Repository.Entities.Timetable.Cards.Info;

namespace Mappers.CardParts
{
    public static class SubjectMapper
    {
        public static Subject ToEntity(this SubjectModels.SubjectPut model)
        {
            return new()
            {
                Id = model.Id,
                Name = model.Name,
                ModifiedAt = DateTime.UtcNow,
                AscId = model.AscId,
            };
        }
    }
}
