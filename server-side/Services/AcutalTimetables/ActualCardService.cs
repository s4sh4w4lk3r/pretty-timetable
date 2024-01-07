using Microsoft.EntityFrameworkCore;
using Repository.Database;
using Repository.Entities.Timetable;
using Repository.Entities.Timetable.Cards;
using Services.Interfaces.Actual;
using System.Globalization;
using Validation.Entities;
using static Services.Other.CardServiceHelper;

namespace Services.AcutalTimetables
{
    public class ActualCardService(TimetableContext timetableContext) : IActualCardService
    {
        public async Task<ServiceResult> UpdateAsync(ActualCard actualCard, CancellationToken cancellationToken = default)
        {
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

            bool foreignIdsExist = await IsForeignKeysExistsAsync<ActualTimetable>(timetableContext, actualCard, cancellationToken);
            if (foreignIdsExist is false)
            {
                return ServiceResult.Fail(FOREIGN_KEYS_NOT_FOUND_MSG);
            }

            bool overlyingRequired = CheckOverlayingRequired(cardFromRepo: cardFromRepo, cardToUpdate: actualCard);
            bool isOverlayingCard = await IsOverlaying(actualCard, overlayingCheckRequired: overlyingRequired, cancellationToken);
            if (isOverlayingCard is true)
            {
                return ServiceResult.Fail(CARD_OVERLAID_MSG);
            }

            bool dateAndWeekCorrect = await IsDateAndWeekMatсhes(actualCard, cancellationToken);
            if (dateAndWeekCorrect is false)
            {
                return ServiceResult.Fail("Дата в карточке не попадает на номер недели, указанный в расписании.");
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

        public async Task<ServiceResult> PutAsync(ActualCard actualCard, CancellationToken cancellationToken = default)
        {
            if (actualCard.Id != 0)
            {
                return ServiceResult.Fail(ID_MUST_BE_ZERO_MSG);
            }

            var valResult = new ActualCardValidator().Validate(actualCard);
            if (valResult.IsValid is false)
            {
                return ServiceResult.Fail(valResult.ToString());
            }

            bool isOverlayingCard = await IsOverlaying(actualCard, overlayingCheckRequired: true, cancellationToken);
            if (isOverlayingCard is true)
            {
                return ServiceResult.Fail(CARD_OVERLAID_MSG);
            }


            bool foreignIdsExist = await IsForeignKeysExistsAsync<ActualTimetable>(timetableContext, actualCard, cancellationToken);
            if (foreignIdsExist == false)
            {
                return ServiceResult.Fail(FOREIGN_KEYS_NOT_FOUND_MSG);
            }

            bool dateAndWeekCorrect = await IsDateAndWeekMatсhes(actualCard, cancellationToken);
            if (dateAndWeekCorrect is false)
            {
                return ServiceResult.Fail("Дата в карточке не попадает на номер недели, указанный в расписании.");
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
        /// <param name="overlayingCheckRequired"></param>
        /// <returns>Возвращает True, если есть заслонение, в противном случае - False</returns>
        private async Task<bool> IsOverlaying(ActualCard actualCard, bool overlayingCheckRequired, CancellationToken cancellationToken = default)
        {
            if (overlayingCheckRequired is false)
            {
                return false;
            }

            return await timetableContext.ActualCards.AnyAsync(e => e.Date == actualCard.Date
            && e.LessonTimeId == actualCard.LessonTimeId
            && e.RelatedTimetableId == actualCard.RelatedTimetableId
            && e.SubGroup == actualCard.SubGroup, cancellationToken);
        }

        /// <summary>
        /// Метод проверяет, подходит номер недели и дата друг другу.
        /// </summary>
        /// <param name="actualCard"></param>
        /// <param name="cancellationToken"></param>
        /// <returns>Если подходит, то возвращается True, иначе False.</returns>
        private async Task<bool> IsDateAndWeekMatсhes(ActualCard actualCard, CancellationToken cancellationToken)
        {
            int timetableWeekNumber = await timetableContext.ActualTimetables.Where(e => e.Id == actualCard.RelatedTimetableId)
                .Select(e => e.WeekNumber).SingleAsync(cancellationToken);

            int cardWeekNumber = ISOWeek.GetWeekOfYear(actualCard.Date.ToDateTime(default));

            return timetableWeekNumber == cardWeekNumber;
        }

        /// <summary>
        /// Сравнивает карточку из бд и полученную пользователем.
        /// </summary>
        /// <param name="cardFromRepo"></param>
        /// <param name="cardToUpdate"></param>
        /// <returns>Если данные карточки о ее положении в расписании изменены, то метод вернет True, 
        /// что будет значить, что нужна проверка на наложение. Если проверка не требуется - False.</returns>
        private static bool CheckOverlayingRequired(ActualCard cardFromRepo, ActualCard cardToUpdate)
        {
            return !(cardFromRepo.Date == cardToUpdate.Date &&
                cardFromRepo.SubGroup == cardToUpdate.SubGroup &&
                cardFromRepo.LessonTimeId == cardToUpdate.LessonTimeId &&
                cardFromRepo.RelatedTimetableId == cardToUpdate.RelatedTimetableId);
        }
    }
}
