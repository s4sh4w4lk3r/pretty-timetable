using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Repository.Database;
using Repository.Entities.Timetable.Cards;
using Services.Interfaces.Stable;
using Validation.Entities;
using static Services.Other.CardServiceHelper;

namespace Services.StableTimetables
{
    public class StableCardService(TimetableContext timetableContext) : IStableCardService
    {
        public async Task<ServiceResult> CreateAsync(StableCard stableCard, CancellationToken cancellationToken = default)
        {
            if (stableCard.Id != 0)
            {
                return ServiceResult.Fail(ID_MUST_BE_ZERO_MSG);
            }

            var valResult = new StableCardValidator().Validate(stableCard);
            if (valResult.IsValid is false)
            {
                return ServiceResult.Fail(valResult.ToString());
            }

            bool foreignIdsExist = await IsForeignKeysExistsAsync(timetableContext, stableCard, cancellationToken);
            if (foreignIdsExist == false)
            {
                return ServiceResult.Fail(FOREIGN_KEYS_NOT_FOUND_MSG);
            }


        }

        public async Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default)
        {
#warning проверить
            int rows = await timetableContext.StableCards.Where(e => e.Id == id).ExecuteDeleteAsync(cancellationToken);
            if (rows == 0)
            {
                return ServiceResult.Fail(CARD_NOT_FOUND_MSG);
            }

            else return ServiceResult.Ok("Карточка расписания удалена из бд.");
        }

        public async Task<ServiceResult> UpdateAsync(StableCard stableCard, CancellationToken cancellationToken = default)
        {
            var valResult = new StableCardValidator().Validate(stableCard);
            if (valResult.IsValid is false)
            {
                return ServiceResult.Fail(valResult.ToString());
            }

            var cardFromRepo = await timetableContext.StableCards.SingleOrDefaultAsync(e=>e.Id == stableCard.Id, cancellationToken);
            if (cardFromRepo is null)
            {
                return ServiceResult.Fail(CARD_NOT_FOUND_MSG);
            }

            bool foreignIdsExist = await IsForeignKeysExistsAsync(timetableContext, stableCard, cancellationToken);
            if (foreignIdsExist == false)
            {
                return ServiceResult.Fail(FOREIGN_KEYS_NOT_FOUND_MSG);
            }


        }
    }
}
