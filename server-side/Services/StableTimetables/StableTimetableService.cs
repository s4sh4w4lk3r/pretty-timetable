using Microsoft.EntityFrameworkCore;
using Repository.Database;
using Repository.Entities.Timetable;
using Services.Interfaces.Stable;
using Validation.Entities;

namespace Services.StableTimetables
{
    public class StableTimetableService(TimetableContext timetableContext) : IStableTimetableService
    {
        public async Task<ServiceResult> CreateAsync(StableTimetable stableTimetable, CancellationToken cancellationToken = default)
        {
            if (stableTimetable.Id != default)
            {
                return ServiceResult.Fail("Id должен быть равен нулю при добавлении.");
            }
            var valResult = new StableTimetableValidator().Validate(stableTimetable);
            if (valResult.IsValid is false) 
            {
                return ServiceResult.Fail(valResult.ToString());
            }

            bool isGroupExists = await timetableContext.Groups.AnyAsync(g => g.Id == stableTimetable.GroupId, cancellationToken);
            if (isGroupExists is false)
            {
                return ServiceResult.Fail("Группа не найдена в бд.");
            }

            bool isOverlaying = await IsOverlaying(stableTimetable, cancellationToken);
            if (isOverlaying is true) 
            {
                return ServiceResult.Fail("Расписание с такой группой уже есть.");
            }

            stableTimetable.Cards = null;
            stableTimetable.Group = null;

            await timetableContext.StableTimetables.AddAsync(stableTimetable, cancellationToken);
            await timetableContext.SaveChangesAsync(cancellationToken);
            return ServiceResult.Ok("Расписание добавлено.");
        }

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

        public async Task<ServiceResult> UpdateAsync(StableTimetable stableTimetable, CancellationToken cancellationToken = default)
        {
#warning проверить
            var valResult = new StableTimetableValidator().Validate(stableTimetable); //
            if (valResult.IsValid is false)
            {
                return ServiceResult.Fail(valResult.ToString());
            }

            var timetableFromRepo = await timetableContext.StableTimetables.SingleOrDefaultAsync(e => e.Id == stableTimetable.Id, cancellationToken);
            if (timetableFromRepo is null)
            {
                return ServiceResult.Fail("Расписание в бд не найдено.");
            }

            bool isGroupExists = await timetableContext.Groups.AnyAsync(g => g.Id == stableTimetable.Id, cancellationToken);
            if (isGroupExists is false)
            {
                return ServiceResult.Fail("Группа не найдена в бд.");
            }

            bool isOverlaying = await IsOverlaying(stableTimetable, cancellationToken);
            if (isOverlaying is true)
            {
                return ServiceResult.Fail("Расписание с такой группой уже есть.");
            }

            timetableFromRepo.GroupId = stableTimetable.GroupId;
            timetableFromRepo.UpdatedAt = DateTime.UtcNow;


            await timetableContext.SaveChangesAsync(cancellationToken);
            return ServiceResult.Ok("Расписание обновлено.");
        }

        private async Task<bool> IsOverlaying(StableTimetable stableTimetable, CancellationToken cancellationToken)
        {
            return await timetableContext.StableTimetables.AnyAsync(e => e.GroupId == stableTimetable.GroupId, cancellationToken);
        }
    }
}
