using Repository.Entities.Timetable;

namespace Services.Interfaces.Actual
{
    public interface IActualTimetableService
    {
        Task<ServiceResult> ProjectStableToActualAsync(IEnumerable<DateOnly> dates);
        Task<ServiceResult> CreateAsync(ActualTimetable actualTimetable);
        Task<ServiceResult> UpdateAsync(ActualTimetable actualTimetable);
        Task<ServiceResult> DeleteAsync(int id);
    }
}