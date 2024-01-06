using Microsoft.EntityFrameworkCore;
using Repository.Database;
using Repository.Entities.Timetable.Cards;
using Services.Interfaces.Actual;
using Validation.Entities;
using static Services.Other.CardServiceHelper;

namespace Services.AcutalTimetables
{
    public class ActualCardService(TimetableContext timetableContext) : IActualCardService
    {
        public async Task<ServiceResult> UpdateAsync(ActualCard actualCard, CancellationToken cancellationToken = default)
        {
#warning проверить
            var valResult = new ActualCardValidator().Validate(actualCard);
            if (valResult.IsValid is false)
            {
                return ServiceResult.Fail(valResult.ToString());
            }

            var cardFromRepo = await timetableContext.ActualCards.SingleOrDefaultAsync(e => e.Id == actualCard.Id, cancellationToken);
            if (cardFromRepo is null)
            {
                return ServiceResult.Fail(CARD_NOT_FOUND_MSG);
            }

            bool foreignIdsExist = await IsForeignKeysExistsAsync(timetableContext, actualCard, cancellationToken);
            if (foreignIdsExist is false)
            {
                return ServiceResult.Fail(FOREIGN_KEYS_NOT_FOUND_MSG);
            }

            bool isOverlayingCard = await IsOverlaying(actualCard, cancellationToken);

            if (isOverlayingCard is true)
            {
                return ServiceResult.Fail(CARD_OVERLAID_MSG);
            }

            cardFromRepo.SubjectId = actualCard.SubjectId;
            cardFromRepo.TeacherId = actualCard.TeacherId;
            cardFromRepo.LessonTimeId = actualCard.LessonTimeId;
            cardFromRepo.CabinetId = actualCard.CabinetId;
            cardFromRepo.SubGroup = actualCard.SubGroup;
            cardFromRepo.IsCanceled = actualCard.IsCanceled;
            cardFromRepo.IsModified = actualCard.IsModified;
            cardFromRepo.IsMoved = actualCard.IsMoved;
            cardFromRepo.Date = actualCard.Date;
            cardFromRepo.UpdatedAt = DateTime.UtcNow;


            await timetableContext.SaveChangesAsync(cancellationToken);

            return ServiceResult.Ok("Карточка обновлена.");
        }

        public async Task<ServiceResult> CreateAsync(ActualCard actualCard, CancellationToken cancellationToken = default)
        {
#warning проверить
            if (actualCard.Id != 0)
            {
                return ServiceResult.Fail(ID_MUST_BE_ZERO_MSG);
            }

            var valResult = new ActualCardValidator().Validate(actualCard);
            if (valResult.IsValid is false)
            {
                return ServiceResult.Fail(valResult.ToString());
            }

            bool isOverlayingCard = await IsOverlaying(actualCard, cancellationToken);
            if (isOverlayingCard is true)
            {
                return ServiceResult.Fail(CARD_OVERLAID_MSG);
            }


            bool foreignIdsExist = await IsForeignKeysExistsAsync(timetableContext, actualCard, cancellationToken);
            if (foreignIdsExist == false)
            {
                return ServiceResult.Fail(FOREIGN_KEYS_NOT_FOUND_MSG);
            }

            actualCard.Subject = null;
            actualCard.Cabinet = null;
            actualCard.Teacher = null;
            actualCard.LessonTime = null;
            actualCard.RelatedTimetable = null;

            await timetableContext.ActualCards.AddAsync(actualCard, cancellationToken);
            await timetableContext.SaveChangesAsync(cancellationToken);
            return ServiceResult.Ok("Карточка добавлена");
        }

        public async Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default)
        {
#warning проверить
            int rows = await timetableContext.ActualCards.Where(e => e.Id == id).ExecuteDeleteAsync(cancellationToken);
            if (rows == 0)
            {
                return ServiceResult.Fail(CARD_NOT_FOUND_MSG);
            }

            else return ServiceResult.Ok("Карточка расписания удалена из бд.");
        }

        /// <summary>
        /// Проверяет, есть ли бд карточки, которые могут быть заслонены карточкой, полученной в параметрах этого метода.
        /// </summary>
        /// <param name="actualCard"></param>
        /// <param name="cancellationToken"></param>
        /// <returns>Возвращает True, если есть заслонение, в противном случае - False</returns>
        private async Task<bool> IsOverlaying(ActualCard actualCard, CancellationToken cancellationToken = default)
        {
            return await timetableContext.ActualCards.AnyAsync(e => e.Date == actualCard.Date
            && e.LessonTimeId == actualCard.LessonTimeId
            && e.RelatedTimetableId == actualCard.RelatedTimetableId
            && e.SubGroup == actualCard.SubGroup, cancellationToken);
        }
    }
}
