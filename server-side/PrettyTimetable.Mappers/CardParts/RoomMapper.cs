using Models.Request.CardParts;
using PrettyTimetable.Core.Entities.Timetable.Cards.Info;

namespace Mappers.CardParts
{
    public static class RoomMapper
    {

        public static Room ToEntity(this RoomModels.RoomPut model)
        {
            return new()
            {
                Id = model.Id,
                Address = model.Address,
                Number = model.Number,
                FullName = model.FullName,
                ModifiedAt = DateTime.UtcNow,
                AscId = string.IsNullOrWhiteSpace(model.AscId) ? null : model.AscId,
            };
        }
    }
}
