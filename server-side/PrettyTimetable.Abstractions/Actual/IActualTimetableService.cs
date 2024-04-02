using PrettyTimetable.Core;
using PrettyTimetable.Core.Entities.Timetable;

namespace PrettyTimetable.Abstractions.Actual
{
    public interface IActualTimetableService
    {
        Task<ServiceResult> ProjectStableToActualAsync(IEnumerable<DateOnly> dates, CancellationToken cancellationToken = default);
        Task<ServiceResult<int>> PutAsync(ActualTimetable actualTimetable, CancellationToken cancellationToken = default);
        Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}