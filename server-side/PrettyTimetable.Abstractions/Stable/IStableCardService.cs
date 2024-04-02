
using PrettyTimetable.Core;
using PrettyTimetable.Core.Entities.Timetable.Cards;

namespace PrettyTimetable.Abstractions.Stable
{
    public interface IStableCardService
    {
        public Task<ServiceResult<int>> PutAsync(StableCard stableCard, CancellationToken cancellationToken = default);
        public Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
