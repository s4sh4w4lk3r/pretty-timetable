using Models.Request.CardParts;
using Repository.Entities.Timetable.Cards.Parts;

namespace Mappers.CardParts
{
    public static class CabinetMapper
    {
        public static Cabinet ToEntity(this CabinetModels.CabinetCreate model)
        {
            return new()
            {
                Id = default,
                Address = model.Address,
                Number = model.Number,
                FullName = model.FullName,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
        }

        public static Cabinet ToEntity(this CabinetModels.CabinetUpdate model)
        {
            return new()
            {
                Id = model.Id,
                Address = model.Address,
                Number = model.Number,
                FullName = model.FullName,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
        }
    }
}
