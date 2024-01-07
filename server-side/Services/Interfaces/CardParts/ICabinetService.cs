using Repository.Entities.Timetable.Cards.Parts;

namespace Services.Interfaces.CardParts
{
    public interface ICabinetService
    {
        public Task<ServiceResult<int>> PutAsync(Cabinet cabinet, CancellationToken cancellationToken = default);
        public Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
