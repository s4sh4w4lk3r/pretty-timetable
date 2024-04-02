using PrettyTimetable.Core;
using PrettyTimetable.Core.Entities.Timetable.Cards.Info;

namespace PrettyTimetable.Abstractions.CardParts
{
    public interface ISubjectService
    {
        public Task<ServiceResult<int>> PutAsync(Subject subject, CancellationToken cancellationToken = default);
        public Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
