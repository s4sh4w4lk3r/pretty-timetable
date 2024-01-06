using Models.Request;
using Repository.Entities.Timetable;

namespace Mappers
{
    public static class StableTimetableMapper
    {
        public static StableTimetable ToEntity(this StableTimetableModels.StableTimetableCreate model)
        {
            return new()
            {
                Id = default,
                GroupId = model.GroupId,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
        }

        public static StableTimetable ToEntity(this StableTimetableModels.StableTimetableUpdate model)
        {
            return new()
            {
                Id = model.Id,
                GroupId = model.GroupId,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
        }
    }
}
