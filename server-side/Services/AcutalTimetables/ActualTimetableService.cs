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

        public async Task<ServiceResult> PutAsync(ActualTimetable actualTimetable, CancellationToken cancellationToken = default)
        {
            var valResult = new ActualTimetableValidator().Validate(actualTimetable);
            if (valResult.IsValid is false)
            {
                return ServiceResult.Fail(valResult.ToString());
            }

            var timetableFromRepo = await timetableContext.ActualTimetables.SingleOrDefaultAsync(e => e.Id == actualTimetable.Id, cancellationToken);
            if (timetableFromRepo == null)
            {
                return ServiceResult.Fail("Расписание с таким ID не найдено в бд.");
            }

            bool groupExist = await timetableContext.Groups.AnyAsync(e => e.Id == actualTimetable.GroupId, cancellationToken);
            if (groupExist == false)
            {
                return ServiceResult.Fail("Группа с таким ID не найдена в бд.");
            }

            bool isOverlaying = await IsOverlaying(actualTimetable, cancellationToken);
            if (isOverlaying is true)
            {
                return ServiceResult.Fail("Расписание с таким номером недели и группой уже есть в бд.");
            }

            timetableFromRepo.WeekNumber = actualTimetable.WeekNumber;
            timetableFromRepo.GroupId = actualTimetable.GroupId;
            timetableFromRepo.UpdatedAt = DateTime.UtcNow;

            await timetableContext.SaveChangesAsync(cancellationToken);
            return ServiceResult.Ok("Расписание обновлено в бд.");
        }

        public async Task<ServiceResult> CreateAsync(ActualTimetable actualTimetable, CancellationToken cancellationToken = default)
        {
            if (actualTimetable.Id != 0)
            {
                return ServiceResult.Fail("При добавлении расписания, его Id должен быть равен нулю.");
            }

            var valResult = new ActualTimetableValidator().Validate(actualTimetable);
            if (valResult.IsValid is false)
            {
                return ServiceResult.Fail(valResult.ToString());
            }

            bool isGroupExists = await timetableContext.Groups.AnyAsync(g => g.Id == actualTimetable.GroupId, cancellationToken);
            if (isGroupExists is false)
            {
                return ServiceResult.Fail("Группа не найдена в бд.");
            }

            bool isOverlaying = await IsOverlaying(actualTimetable, cancellationToken);
            if (isOverlaying is true)
            {
                return ServiceResult.Fail("Расписание с таким номером недели и группой уже есть в бд.");
            }

            actualTimetable.Group = null;
            actualTimetable.Cards = null;

            await timetableContext.ActualTimetables.AddAsync(actualTimetable, cancellationToken);
            await timetableContext.SaveChangesAsync(cancellationToken);
            return ServiceResult.Ok("Расписание добавлено в бд.");
        }

        public async Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default)
        {
            await timetableContext.ActualCards.Where(e => e.RelatedTimetableId == id).ExecuteDeleteAsync(cancellationToken);
            int rows = await timetableContext.ActualTimetables.Where(e => e.Id == id).ExecuteDeleteAsync(cancellationToken);
            if (rows == 0)
            {
                return ServiceResult.Fail("Расписание для удаления не найдено в бд.");
            }

            return ServiceResult.Ok("Расписание удалено из бд.");
        }


        /// <summary>
        /// Проверяет наличие расписания с таким же номером недели и GroupId, чтобы не случилось исключение по уникальному индексу в бд.
        /// </summary>
        /// <param name="actualTimetable"></param>
        /// <param name="cancellationToken"></param>
        /// <returns> Возвращает True, если расписание с такими данными уже есть в бд, в противном случае - False.</returns>
        private async Task<bool> IsOverlaying(ActualTimetable actualTimetable, CancellationToken cancellationToken = default)
        {
            return await timetableContext.ActualTimetables.AnyAsync(e => e.WeekNumber == actualTimetable.WeekNumber
            && e.GroupId == actualTimetable.GroupId, cancellationToken);
        }
    }
}
