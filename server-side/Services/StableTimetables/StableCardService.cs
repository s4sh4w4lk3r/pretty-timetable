using Microsoft.EntityFrameworkCore;
using Repository.Database;
using Repository.Entities.Timetable.Cards;
using Services.Interfaces.Stable;
using Validation.Entities;

namespace Services.StableTimetables
{
    public class StableCardService(TimetableContext timetableContext) : IStableCardService
    {
        public async Task<ServiceResult<int>> PutAsync(StableCard stableCard, CancellationToken cancellationToken)
        {
            var valResult = new StableCardValidator().Validate(stableCard);
            if (valResult.IsValid is false)
            {
                return ServiceResult.Fail(valResult.ToString(), default(int));
            }

            timetableContext.StableCards.Update(stableCard);

            var queryResult = await timetableContext.SaveChangesAsync(cancellationToken).HandleQuery();
            if (queryResult.Success is false)
            {
                return ServiceResult.Fail(ResultMessages.PutError, default(int)).AddInnerResult(queryResult);
            }

            return ServiceResult.Ok(ResultMessages.Putted, stableCard.Id);
        }

        public async Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default)
        {
            var queryResult = await timetableContext.StableCards.Where(e => e.Id == id).ExecuteDeleteAsync(cancellationToken).HandleQuery();
            if (queryResult.Success is false)
            {
                return ServiceResult.Fail(ResultMessages.DeleteError).AddInnerResult(queryResult);
            }

            return ServiceResult.Ok(ResultMessages.Deleted);
        }
    }
}
