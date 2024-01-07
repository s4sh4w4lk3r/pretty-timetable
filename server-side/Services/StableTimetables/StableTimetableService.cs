using Microsoft.EntityFrameworkCore;
using Repository.Database;
using Repository.Entities.Timetable;
using Services.Interfaces.Stable;
using Validation.Entities;

namespace Services.StableTimetables
{
    public class StableTimetableService(TimetableContext timetableContext) : IStableTimetableService
    {
        public async Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default)
        {
            await timetableContext.StableCards.Where(e => e.RelatedTimetableId == id).ExecuteDeleteAsync(cancellationToken);
            int rows = await timetableContext.StableTimetables.Where(e => e.Id == id).ExecuteDeleteAsync(cancellationToken);
            if (rows == 0)
            {
                return ServiceResult.Fail("Расписание для удаления не найдено в бд.");
            }

            return ServiceResult.Ok("Расписание удалено из бд.");
        }

        public async Task<ServiceResult<int>> PutAsync(StableTimetable stableTimetable, CancellationToken cancellationToken = default)
        {
            var valResult = new StableTimetableValidator().Validate(stableTimetable);
            if (valResult.IsValid is false)
            {
                return ServiceResult.Fail(valResult.ToString(), default(int));
            }

            timetableContext.StableTimetables.Update(stableTimetable);
            await timetableContext.SaveChangesAsync(cancellationToken);
            return ServiceResult.Ok("Расписание добавлено", stableTimetable.Id);
        }
    }
}
