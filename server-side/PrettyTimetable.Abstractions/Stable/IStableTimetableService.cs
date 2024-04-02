using PrettyTimetable.Core;
using PrettyTimetable.Core.Entities.Timetable;

namespace PrettyTimetable.Abstractions.Stable
{
    public interface IStableTimetableService
    {
        Task<ServiceResult<int>> PutAsync(StableTimetable stableTimetable, CancellationToken cancellationToken = default);
        Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
