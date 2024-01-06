using Repository.Entities.Timetable;

namespace Services.Interfaces.Stable
{
    public interface IStableTimetableService
    {
        Task<ServiceResult> CreateAsync(StableTimetable stableTimetable, CancellationToken cancellationToken = default);
        Task<ServiceResult> UpdateAsync(StableTimetable stableTimetable, CancellationToken cancellationToken = default);
        Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
