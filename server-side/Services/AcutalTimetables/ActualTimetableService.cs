using Microsoft.EntityFrameworkCore;
using Repository.Database;
using Repository.Entities.Timetable;
using Services.Interfaces.Actual;

namespace Services.AcutalTimetables
{
    public class ActualTimetableService(TimetableContext timetableContext) : IActualTimetableService
    {
        /// <summary>
        /// Проецирует расписание всех групп, на указанные даты в массиве.
        /// </summary>
        /// <returns></returns>
        public async Task<ServiceResult> ProjectStableToActualAsync(IEnumerable<DateOnly> dates)
        {
            var projectorResult = await new TimetableProjector(timetableContext).Project(dates);
            if (projectorResult.Success is false)
            {
                return ServiceResult.Fail("Расписание не спроецировалось.", projectorResult);
            }

            return ServiceResult.Ok("Расписание спроецировалось успешно.");
        }

        public async Task<ServiceResult> UpdateAsync(ActualTimetable actualTimetable)
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResult> CreateAsync(ActualTimetable actualTimetable)
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResult> DeleteAsync(int id)
        {
#warning проверить.
            await timetableContext.ActualCards.Where(e => e.RelatedTimetableId == id).ExecuteDeleteAsync();
            int rows = await timetableContext.ActualTimetables.Where(e => e.Id == id).ExecuteDeleteAsync();
            if (rows == 0)
            {
                return ServiceResult.Fail("Расписание для удаления не найдено в бд.");
            }

            return ServiceResult.Ok("Расписание удалено из бд.");
        }
    }
}
