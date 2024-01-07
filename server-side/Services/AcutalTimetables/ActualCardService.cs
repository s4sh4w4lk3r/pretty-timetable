using Microsoft.EntityFrameworkCore;
using Repository.Database;
using Repository.Entities.Timetable.Cards;
using Services.Interfaces.Actual;
using System.Globalization;
using Validation.Entities;

namespace Services.AcutalTimetables
{
    public class ActualCardService(TimetableContext timetableContext) : IActualCardService
    {
        public async Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default)
        {
            var queryResult = await timetableContext.ActualCards.Where(e => e.Id == id).ExecuteDeleteAsync(cancellationToken).HandleQuery();
            if (queryResult.Success is false)
            {
                return ServiceResult.Fail(ResultMessages.DeleteError).AddInnerResult(queryResult);
            }

            return ServiceResult.Ok(ResultMessages.Deleted);
        }

        public async Task<ServiceResult<int>> PutAsync(ActualCard actualCard, CancellationToken cancellationToken = default)
        {
            var valResult = new ActualCardValidator().Validate(actualCard);
            if (valResult.IsValid is false)
            {
                return ServiceResult.Fail(valResult.ToString(), default(int));
            }

            bool dateAndWeekMatches = await IsDateAndWeekMatсhes(actualCard, cancellationToken);
            if (dateAndWeekMatches is false)
            {
                return ServiceResult.Fail("Дата в карточке не попадает на номер недели, указанный в расписании.", default(int));
            }

            timetableContext.ActualCards.Update(actualCard);

            var queryResult = await timetableContext.SaveChangesAsync(cancellationToken).HandleQuery();
            if (queryResult.Success is false)
            {
                return ServiceResult.Fail(ResultMessages.PutError, default(int)).AddInnerResult(queryResult);
            }

            return ServiceResult.Ok(ResultMessages.Putted, actualCard.Id);


        }

        /// <summary>
        /// Метод проверяет, подходит номер недели и дата друг другу.
        /// </summary>
        /// <param name="actualCard"></param>
        /// <param name="cancellationToken"></param>
        /// <returns>Если подходит, то возвращается True, иначе False.</returns>
        private async Task<bool> IsDateAndWeekMatсhes(ActualCard actualCard, CancellationToken cancellationToken)
        {
            int timetableWeekNumber = await timetableContext.ActualTimetables.Where(e => e.Id == actualCard.RelatedTimetableId)
                .Select(e => e.WeekNumber).SingleAsync(cancellationToken);

            int cardWeekNumber = ISOWeek.GetWeekOfYear(actualCard.Date.ToDateTime(default));

            return timetableWeekNumber == cardWeekNumber;
        }
    }
}
