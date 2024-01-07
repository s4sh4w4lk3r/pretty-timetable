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
            int rows = await timetableContext.ActualTimetables.Where(e => e.Id == id).ExecuteDeleteAsync(cancellationToken);
            if (rows == 0)
            {
                return ServiceResult.Fail("Расписание для удаления не найдено в бд.");
            }

            return ServiceResult.Ok("Расписание удалено из бд.");
        }

        public async Task<ServiceResult<int>> PutAsync(ActualTimetable actualTimetable, CancellationToken cancellationToken = default)
        {
            var valResult = new ActualTimetableValidator().Validate(actualTimetable);
            if (valResult.IsValid is false)
            {
                return ServiceResult.Fail(valResult.ToString(), default(int));
            }

            timetableContext.ActualTimetables.Update(actualTimetable);
            await timetableContext.SaveChangesAsync(cancellationToken);
            return ServiceResult.Ok("Запись добавлена или обновлена", actualTimetable.Id);
        }
    }
}
