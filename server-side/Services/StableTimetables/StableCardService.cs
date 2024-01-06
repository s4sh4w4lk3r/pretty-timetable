using Microsoft.EntityFrameworkCore;
using Repository.Database;
using Repository.Entities.Timetable.Cards;
using Services.Interfaces.Stable;

namespace Services.StableTimetables
{
    public class StableCardService(TimetableContext timetableContext) : IStableCardService
    {
        public async Task<ServiceResult> CreateAsync(StableCard stableCard, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default)
        {
#warning проверить
            int rows = await timetableContext.StableCards.Where(e => e.Id == id).ExecuteDeleteAsync(cancellationToken);
            if (rows == 0)
            {
                return ServiceResult.Fail("Карточка на удаление не найдена в бд.");
            }

            else return ServiceResult.Ok("Карточка расписания удалена из бд.");
        }

        public async Task<ServiceResult> UpdateAsync(StableCard stableCard, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }
    }
}
