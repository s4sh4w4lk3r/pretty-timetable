using Repository.Entities.Timetable;
using static Models.Request.GroupModels;

namespace Mappers
{
    public static class GroupMapper
    {
        public static Group ToEntity(this GroupPut model)
        {
            return new()
            {
                Id = model.Id,
                Name = model.Name,
                ModifiedAt = DateTime.UtcNow,
                AscId = string.IsNullOrWhiteSpace(model.AscId) ? null : model.AscId,
            };
        }
    }
}
