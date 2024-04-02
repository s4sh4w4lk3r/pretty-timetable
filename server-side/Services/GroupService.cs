using Microsoft.EntityFrameworkCore;
using PrettyTimetable.Abstractions;
using PrettyTimetable.Core;
using PrettyTimetable.Core.Entities.Timetable;
using Repository.Database;
using Validation.Entities;

namespace Services
{
    public class GroupService(TimetableContext timetableContext) : IGroupService
    {
        public async Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default)
        {
            var queryResult = await timetableContext.Groups.Where(e => e.Id == id).ExecuteDeleteAsync(cancellationToken).HandleQuery();
            if (queryResult.Success is false)
            {
                return ServiceResult.Fail(ResultMessages.DeleteError).AddInnerResult(queryResult);
            }

            return ServiceResult.Ok(ResultMessages.Deleted);
        }

        public async Task<ServiceResult<int>> PutAsync(Group group, CancellationToken cancellationToken = default)
        {
            var valResult = new GroupValidator().Validate(group);
            if (valResult.IsValid is false)
            {
                return ServiceResult.Fail(valResult.ToString(), default(int));
            }

            timetableContext.Groups.Update(group);

            var queryResult = await timetableContext.SaveChangesAsync(cancellationToken).HandleQuery();
            if (queryResult.Success is false)
            {
                return ServiceResult.Fail(ResultMessages.PutError, default(int)).AddInnerResult(queryResult);
            }

            return ServiceResult.Ok(ResultMessages.Putted, group.Id);
        }
    }
}
