using Repository.Entities.Timetable.Cards.Parts;

namespace Services.Interfaces.CardParts
{
    public interface ISubjectService
    {
        public Task<ServiceResult<int>> PutAsync(Subject subject, CancellationToken cancellationToken = default);
        public Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
