using Repository.Entities.Timetable;

namespace Services.Interfaces
{
    public interface IGroupService
    {
        Task<ServiceResult<int>> PutAsync(Group group, CancellationToken cancellationToken = default);
        Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
