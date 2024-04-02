using Microsoft.EntityFrameworkCore;
using PrettyTimetable.Abstractions.CardParts;
using PrettyTimetable.Core;
using PrettyTimetable.Core.Entities.Timetable.Cards.Info;
using Repository.Database;
using Validation.Entities.CardParts;

namespace Services.CardParts
{
    public class SubjectService(TimetableContext timetableContext) : ISubjectService
    {
        public async Task<ServiceResult<int>> PutAsync(Subject subject, CancellationToken cancellationToken = default)
        {
            var valResult = new SubjectValidator().Validate(subject);
            if (valResult.IsValid is false)
            {
                return ServiceResult.Fail(valResult.ToString(), default(int));
            }

            timetableContext.Subjects.Update(subject);

            var queryResult = await timetableContext.SaveChangesAsync(cancellationToken).HandleQuery();
            if (queryResult.Success is false)
            {
                return ServiceResult.Fail(ResultMessages.PutError, default(int)).AddInnerResult(queryResult);
            }

            return ServiceResult.Ok(ResultMessages.Putted, subject.Id).AddInnerResult(queryResult);
        }

        public async Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default)
        {
            var queryResult = await timetableContext.Subjects.Where(e => e.Id == id).ExecuteDeleteAsync(cancellationToken).HandleQuery();
            if (queryResult.Success is false)
            {
                return ServiceResult.Fail(ResultMessages.DeleteError).AddInnerResult(queryResult);
            }

            return ServiceResult.Ok(ResultMessages.Deleted).AddInnerResult(queryResult);
        }
    }
}
