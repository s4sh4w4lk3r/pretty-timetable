using Repository.Entities.Timetable;

namespace Services.Interfaces.Actual
{
    public interface IActualTimetableService
    {
        Task<ServiceResult> ProjectStableToActualAsync(IEnumerable<DateOnly> dates, CancellationToken cancellationToken = default);
        Task<ServiceResult<int>> PutAsync(ActualTimetable actualTimetable, CancellationToken cancellationToken = default);
        Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}