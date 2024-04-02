using Microsoft.EntityFrameworkCore;
using Repository.Database;
using PrettyTimetable.Abstractions.Stable;
using Validation.Entities;
using PrettyTimetable.Core;
using PrettyTimetable.Core.Entities.Timetable;

namespace Services.StableTimetables
{
    public class StableTimetableService(TimetableContext timetableContext) : IStableTimetableService
    {
        public async Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default)
        {
            var queryResult = await timetableContext.StableTimetables.Where(e => e.Id == id).ExecuteDeleteAsync(cancellationToken).HandleQuery();
            if (queryResult.Success is false)
            {
                return ServiceResult.Fail(ResultMessages.DeleteError).AddInnerResult(queryResult);
            }

            return ServiceResult.Ok(ResultMessages.Deleted);
        }

        public async Task<ServiceResult<int>> PutAsync(StableTimetable stableTimetable, CancellationToken cancellationToken = default)
        {
            var valResult = new StableTimetableValidator().Validate(stableTimetable);
            if (valResult.IsValid is false)
            {
                return ServiceResult.Fail(valResult.ToString(), default(int));
            }

            timetableContext.StableTimetables.Update(stableTimetable);

            var queryResult = await timetableContext.SaveChangesAsync(cancellationToken).HandleQuery();
            if (queryResult.Success is false)
            {
                return ServiceResult.Fail(ResultMessages.PutError, default(int)).AddInnerResult(queryResult);
            }

            return ServiceResult.Ok(ResultMessages.Putted, stableTimetable.Id);
        }
    }
}
