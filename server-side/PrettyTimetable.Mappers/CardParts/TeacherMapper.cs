using Models.Request.CardParts;
using PrettyTimetable.Core.Entities.Timetable.Cards.Info;

namespace Mappers.CardParts
{
    public static class TeacherMapper
    {
        public static Teacher ToEntity(this TeacherModels.TeacherPut model)
        {
            return new()
            {
                Id = model.Id,
                Firstname = model.Firstname,
                Lastname = model.Lastname,
                Middlename = model.Middlename,
                ModifiedAt = DateTime.UtcNow,
                AscId = string.IsNullOrWhiteSpace(model.AscId) ? null : model.AscId,
            };
        }
    }
}
