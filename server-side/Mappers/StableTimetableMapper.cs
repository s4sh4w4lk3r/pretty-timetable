using Models.Request;
using Repository.Entities.Timetable;

namespace Mappers
{
    public static class StableTimetableMapper
    {

        public static StableTimetable ToEntity(this StableTimetableModels.StableTimetablePut model)
        {
            return new()
            {
                Id = model.Id,
                GroupId = model.GroupId,
                ModifiedAt = DateTime.UtcNow
            };
        }
    }
}
