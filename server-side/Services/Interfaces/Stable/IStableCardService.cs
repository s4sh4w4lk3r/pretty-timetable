using Repository.Entities.Timetable.Cards;

namespace Services.Interfaces.Stable
{
    public interface IStableCardService
    {
        Task<ServiceResult<int>> PutAsync(StableCard stableCard, CancellationToken cancellationToken = default);
        Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
