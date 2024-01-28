using Models.Request.CardParts;
using Repository.Entities.Timetable.Cards.Parts;

namespace Mappers.CardParts
{
    public static class CabinetMapper
    {

        public static Cabinet ToEntity(this CabinetModels.CabinetPut model)
        {
            return new()
            {
                Id = model.Id,
                Address = model.Address,
                Number = model.Number,
                FullName = model.FullName,
                ModifiedAt = DateTime.UtcNow
            };
        }
    }
}
