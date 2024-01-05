using Repository.Entities.Timetable.Cards;

namespace Services.Interfaces.Stable
{
    public interface IStableCardService
    {
        Task<ServiceResult> CreateAsync(StableCard stableCard);
        Task<ServiceResult> UpdateAsync(StableCard stableCard);
        Task<ServiceResult> DeleteAsync(int id);
    }
}
