using PrettyTimetable.Core;
using PrettyTimetable.Core.Entities.Timetable.Cards;

namespace PrettyTimetable.Abstractions.Actual
{
    public interface IActualCardService
    {
        Task<ServiceResult<int>> PutAsync(ActualCard actualCard, CancellationToken cancellationToken = default);
        Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
