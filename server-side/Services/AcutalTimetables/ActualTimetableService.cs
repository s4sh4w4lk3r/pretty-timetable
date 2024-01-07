using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Repository.Database;
using Repository.Entities.Timetable;
using Services.Interfaces.Actual;
using Validation.Entities;

namespace Services.AcutalTimetables
{
    public class ActualTimetableService(TimetableContext timetableContext) : IActualTimetableService
    {
        /// <summary>
        /// Проецирует расписание всех групп, на указанные даты в массиве.
        /// </summary>
        /// <returns></returns>
        public async Task<ServiceResult> ProjectStableToActualAsync(IEnumerable<DateOnly> dates, CancellationToken cancellationToken = default)
        {
            var projectorResult = await new TimetableProjector(timetableContext).Project(dates, cancellationToken);
            if (projectorResult.Success is false)
            {
                return ServiceResult.Fail("Расписание не спроецировалось.", projectorResult);
            }

            return ServiceResult.Ok("Расписание спроецировалось успешно.");
        }

        public async Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default)
        {
            var queryResult = await timetableContext.ActualTimetables.Where(e => e.Id == id).ExecuteDeleteAsync(cancellationToken).HandleQuery();
            if (queryResult.Success is false)
            {
                return ServiceResult.Fail(ResultMessages.DeleteError).AddInnerResult(queryResult);
            }

            return ServiceResult.Ok(ResultMessages.Deleted);
        }

        public async Task<ServiceResult<int>> PutAsync(ActualTimetable actualTimetable, CancellationToken cancellationToken = default)
        {
            var valResult = new ActualTimetableValidator().Validate(actualTimetable);
            if (valResult.IsValid is false)
            {
                return ServiceResult.Fail(valResult.ToString(), default(int));
            }

            timetableContext.ActualTimetables.Update(actualTimetable);

            var queryResult = await timetableContext.SaveChangesAsync(cancellationToken).HandleQuery();
            if (queryResult.Success is false)
            {
                return ServiceResult.Fail(ResultMessages.PutError, default(int)).AddInnerResult(queryResult);
            }

            return ServiceResult.Ok(ResultMessages.Putted, actualTimetable.Id);
        }
    }
}
