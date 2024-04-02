using Microsoft.EntityFrameworkCore;
using PrettyTimetable.Abstractions.CardParts;
using PrettyTimetable.Core;
using PrettyTimetable.Core.Entities.Timetable.Cards.Info;
using PrettyTimetable.Repository.Database;
using Validation.Entities.CardParts;

namespace PrettyTimetable.Services.CardParts
{
    public class LessonTimeService(TimetableContext timetableContext) : ILessonTimeService
    {
        public async Task<ServiceResult<int>> PutAsync(LessonTime lessonTime, CancellationToken cancellationToken = default)
        {
            var valResult = new LessonTimeValidator().Validate(lessonTime);
            if (valResult.IsValid is false)
            {
                return ServiceResult.Fail(valResult.ToString(), default(int));
            }

            timetableContext.LessonTimes.Update(lessonTime);

            var queryResult = await timetableContext.SaveChangesAsync(cancellationToken).HandleQuery();
            if (queryResult.Success is false)
            {
                return ServiceResult.Fail(ResultMessages.PutError, default(int)).AddInnerResult(queryResult);
            }

            return ServiceResult.Ok(ResultMessages.Putted, lessonTime.Id).AddInnerResult(queryResult);
        }

        public async Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default)
        {
            var queryResult = await timetableContext.LessonTimes.Where(e => e.Id == id).ExecuteDeleteAsync(cancellationToken).HandleQuery();
            if (queryResult.Success is false)
            {
                return ServiceResult.Fail(ResultMessages.DeleteError).AddInnerResult(queryResult);
            }

            return ServiceResult.Ok(ResultMessages.Deleted).AddInnerResult(queryResult);
        }
    }
}
