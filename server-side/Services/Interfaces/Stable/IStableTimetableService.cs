using Repository.Entities.Timetable;

namespace Services.Interfaces.Stable
{
    public interface IStableTimetableService
    {
        Task<ServiceResult> CreateAsync(StableTimetable stableTimetable);
        Task<ServiceResult> UpdateAsync(StableTimetable stableTimetable);
        Task<ServiceResult> DeleteAsync(int id);
    }
}
