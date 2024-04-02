using PrettyTimetable.Core;
using PrettyTimetable.Core.Entities.Timetable.Cards.Info;

namespace PrettyTimetable.Abstractions.CardParts
{
    public interface IRoomService
    {
        public Task<ServiceResult<int>> PutAsync(Room cabinet, CancellationToken cancellationToken = default);
        public Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
