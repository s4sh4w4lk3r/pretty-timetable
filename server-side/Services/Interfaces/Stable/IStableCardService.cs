using Repository.Entities.Timetable.Cards;

namespace Services.Interfaces.Stable
{
    public interface IStableCardService
    {
        Task<ServiceResult> CreateAsync(StableCard stableCard, CancellationToken cancellationToken = default);
        Task<ServiceResult> UpdateAsync(StableCard stableCard, CancellationToken cancellationToken = default);
        Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
