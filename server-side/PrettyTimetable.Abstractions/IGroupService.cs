using PrettyTimetable.Core;
using PrettyTimetable.Core.Entities.Timetable;

namespace PrettyTimetable.Abstractions
{
    public interface IGroupService
    {
        Task<ServiceResult<int>> PutAsync(Group group, CancellationToken cancellationToken = default);
        Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
