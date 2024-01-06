using Microsoft.EntityFrameworkCore;
using Repository.Database;
using Repository.Entities.Timetable;
using Services.Interfaces.Stable;

namespace Services.StableTimetables
{
    public class StableTimetableService(TimetableContext timetableContext) : IStableTimetableService
    {
        public async Task<ServiceResult> CreateAsync(StableTimetable stableTimetable)
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResult> DeleteAsync(int id)
        {
#warning проверить.
            await timetableContext.StableCards.Where(e => e.RelatedTimetableId == id).ExecuteDeleteAsync();
            int rows = await timetableContext.StableTimetables.Where(e => e.Id == id).ExecuteDeleteAsync();
            if (rows == 0)
            {
                return ServiceResult.Fail("Расписание для удаления не найдено в бд.");
            }

            return ServiceResult.Ok("Расписание удалено из бд.");
        }

        public async Task<ServiceResult> UpdateAsync(StableTimetable stableTimetable)
        {
            throw new NotImplementedException();
        }
    }
}
