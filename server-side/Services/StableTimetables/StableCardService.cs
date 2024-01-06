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
#warning проверить
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

            bool isOverlaying = await IsOverlaying(stableCard, cancellationToken);
            if (isOverlaying is true)
            {
                return ServiceResult.Fail(CARD_OVERLAID_MSG);
            }

            stableCard.Subject = null;
            stableCard.Cabinet = null;
            stableCard.Teacher = null;
            stableCard.LessonTime = null;
            stableCard.RelatedTimetable = null;

            await timetableContext.StableCards.AddAsync(stableCard, cancellationToken);
            await timetableContext.SaveChangesAsync(cancellationToken);

            return ServiceResult.Ok("Карточка добавлена");
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
#warning проверить
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

            bool isOverlaying = await IsOverlaying(stableCard, cancellationToken);
            if (isOverlaying is true)
            {
                return ServiceResult.Fail(CARD_OVERLAID_MSG);
            }

            cardFromRepo.SubjectId = stableCard.SubjectId;
            cardFromRepo.TeacherId = stableCard.TeacherId;
            cardFromRepo.LessonTimeId = stableCard.LessonTimeId;
            cardFromRepo.CabinetId = stableCard.CabinetId;
            cardFromRepo.SubGroup = stableCard.SubGroup;
            cardFromRepo.DayOfWeek = stableCard.DayOfWeek;
            cardFromRepo.IsWeekEven = stableCard.IsWeekEven;
            cardFromRepo.UpdatedAt = DateTime.UtcNow;

            await timetableContext.SaveChangesAsync(cancellationToken);

            return ServiceResult.Ok("Карточка обновлена");
        }

        private async Task<bool> IsOverlaying(StableCard stableCard, CancellationToken cancellationToken)
        {
            return await timetableContext.StableCards.AnyAsync(e => e.IsWeekEven == stableCard.IsWeekEven, cancellationToken)
                && await timetableContext.StableCards.AnyAsync(e => e.DayOfWeek == stableCard.DayOfWeek, cancellationToken)
                && await timetableContext.StableCards.AnyAsync(e => e.SubGroup == stableCard.SubGroup, cancellationToken)
                && await timetableContext.StableCards.AnyAsync(e => e.LessonTimeId== stableCard.LessonTimeId, cancellationToken)
                && await timetableContext.StableCards.AnyAsync(e => e.RelatedTimetableId == stableCard.RelatedTimetableId, cancellationToken);
        }
    }
}
