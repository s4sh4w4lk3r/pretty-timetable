using Repository.Entities.Timetable.Cards;

namespace Services.Interfaces.Stable
{
    public interface IStableCardService
    {
        public Task<ServiceResult<int>> PutAsync(StableCard stableCard, CancellationToken cancellationToken = default);
        public Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
