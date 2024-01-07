using FluentValidation;
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
                return ServiceResult.Fail<int>(valResult.ToString(), default);
            }

            timetableContext.Update(stableCard);
            await timetableContext.SaveChangesAsync(cancellationToken);
            return ServiceResult.Ok("Карточка добавлена или обновлена", stableCard.Id);
        }

        public async Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default)
        {
            int rows = await timetableContext.StableCards.Where(e => e.Id == id).ExecuteDeleteAsync(cancellationToken);
            if (rows == 0)
            {
                return ServiceResult.Fail("Карточка для удаления не найдена в бд.");
            }

            else return ServiceResult.Ok("Карточка расписания удалена из бд.");
        }
    }
}
