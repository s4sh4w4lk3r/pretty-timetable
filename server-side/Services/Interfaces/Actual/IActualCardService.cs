using Repository.Entities.Timetable.Cards;

namespace Services.Interfaces.Actual
{
    public interface IActualCardService
    {
        Task<ServiceResult> CreateAsync(ActualCard actualCard);
        Task<ServiceResult> UpdateAsync(ActualCard actualCard);
        Task<ServiceResult> DeleteAsync(int id);
    }
}
