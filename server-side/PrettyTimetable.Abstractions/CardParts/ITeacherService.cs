using PrettyTimetable.Core;
using PrettyTimetable.Core.Entities.Timetable.Cards.Info;

namespace PrettyTimetable.Abstractions.CardParts
{
    public interface ITeacherService
    {
        public Task<ServiceResult<int>> PutAsync(Teacher teacher, CancellationToken cancellationToken = default);
        public Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
