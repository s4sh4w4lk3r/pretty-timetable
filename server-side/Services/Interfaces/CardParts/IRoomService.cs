using Repository.Entities.Timetable.Cards.Info;

namespace Services.Interfaces.CardParts
{
    public interface IRoomService
    {
        public Task<ServiceResult<int>> PutAsync(Room cabinet, CancellationToken cancellationToken = default);
        public Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
