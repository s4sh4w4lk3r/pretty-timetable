using Repository.Entities.Timetable.Cards;

namespace Services.Interfaces.Actual
{
    public interface IActualCardService
    {
        Task<ServiceResult> CreateAsync(ActualCard actualCard, CancellationToken cancellationToken = default);
        Task<ServiceResult> UpdateAsync(ActualCard actualCard, CancellationToken cancellationToken = default);
        Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
