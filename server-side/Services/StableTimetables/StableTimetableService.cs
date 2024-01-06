using Microsoft.EntityFrameworkCore;
using Repository.Database;
using Repository.Entities.Timetable;
using Services.Interfaces.Stable;

namespace Services.StableTimetables
{
    public class StableTimetableService(TimetableContext timetableContext) : IStableTimetableService
    {
        public async Task<ServiceResult> CreateAsync(StableTimetable stableTimetable, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default)
        {
#warning проверить.
            await timetableContext.StableCards.Where(e => e.RelatedTimetableId == id).ExecuteDeleteAsync(cancellationToken);
            int rows = await timetableContext.StableTimetables.Where(e => e.Id == id).ExecuteDeleteAsync(cancellationToken);
            if (rows == 0)
            {
                return ServiceResult.Fail("Расписание для удаления не найдено в бд.");
            }

            return ServiceResult.Ok("Расписание удалено из бд.");
        }

        public async Task<ServiceResult> UpdateAsync(StableTimetable stableTimetable, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }
    }
}
