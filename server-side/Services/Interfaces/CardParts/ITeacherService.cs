using Repository.Entities.Timetable.Cards.Info;

namespace Services.Interfaces.CardParts
{
    public interface ITeacherService
    {
        public Task<ServiceResult<int>> PutAsync(Teacher teacher, CancellationToken cancellationToken = default);
        public Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
