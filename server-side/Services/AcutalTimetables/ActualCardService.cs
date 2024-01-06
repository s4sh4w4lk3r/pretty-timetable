using Microsoft.EntityFrameworkCore;
using Repository.Database;
using Repository.Entities.Timetable.Cards;
using Services.Interfaces.Actual;
using Validation.Entities;

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
                return ServiceResult.Fail("Такой карточки актуального расписания нет в бд для обновления.");
            }

            bool foreignIdsExist = await IsForeignKeysExists(actualCard, cancellationToken);
            if (foreignIdsExist is false)
            {
                return ServiceResult.Fail("Указаны несуществующие внешние ключи.");
            }

            bool isOverlayingCard = await IsOverlaying(actualCard, cancellationToken);

            if (isOverlayingCard is true)
            {
                return ServiceResult.Fail("Карточка расписания с такой датой, временем занятия, подгруппой и связанным расписанием уже есть в бд.");
            }

            cardFromRepo.SubjectId = actualCard.SubjectId;
            cardFromRepo.TeacherId = actualCard.TeacherId;
            cardFromRepo.LessonTimeId = actualCard.LessonTimeId;
            cardFromRepo.CabinetId = actualCard.CabinetId;
            cardFromRepo.SubGroup = actualCard.SubGroup;
            cardFromRepo.IsCanceled = actualCard.IsCanceled;
            cardFromRepo.IsModified = actualCard.IsModified;
            cardFromRepo.IsMoved = actualCard.IsMoved;
            cardFromRepo.UpdatedAt = DateTime.UtcNow;


            await timetableContext.SaveChangesAsync(cancellationToken);

            return ServiceResult.Ok("Актуальная карточка обновлена.");
        }

        public async Task<ServiceResult> CreateAsync(ActualCard actualCard, CancellationToken cancellationToken = default)
        {
#warning проверить
            if (actualCard.Id != 0)
            {
                return ServiceResult.Fail("При добавлении карточки Id должен быть равен нулю.");
            }

            var valResult = new ActualCardValidator().Validate(actualCard);
            if (valResult.IsValid is false)
            {
                return ServiceResult.Fail(valResult.ToString());
            }

            bool isOverlayingCard = await IsOverlaying(actualCard, cancellationToken);
            if (isOverlayingCard is true)
            {
                return ServiceResult.Fail("Карточка расписания с такой датой, временем занятия, подгруппой и связанным расписанием уже есть в бд.");
            }


            bool foreingIdsExist = await IsForeignKeysExists(actualCard, cancellationToken);
            if (foreingIdsExist == false)
            {
                return ServiceResult.Fail("Некоторые внешние ключи указывают на несуществующие значения в бд");
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
                return ServiceResult.Fail("Карточка на удаление не найдена в бд.");
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

        /// <summary>
        /// Проверяет, есть ли в бд внешние ключи, относящиеся к карточке, полученной в параметрах этого метода.
        /// </summary>
        /// <param name="actualCard"></param>
        /// <param name="cancellationToken"></param>
        /// <returns>Возвращает True, если все внешние ключи присутсвуют, если хоть один внешний ключ отсутсвует - False.</returns>
        private async Task<bool> IsForeignKeysExists(ActualCard actualCard, CancellationToken cancellationToken = default)
        {
            return await timetableContext.Subjects.AnyAsync(e => e.Id == actualCard.SubjectId, cancellationToken) &&
            await timetableContext.Subjects.AnyAsync(e => e.Id == actualCard.TeacherId, cancellationToken) &&
            await timetableContext.Subjects.AnyAsync(e => e.Id == actualCard.LessonTimeId, cancellationToken) &&
            await timetableContext.Subjects.AnyAsync(e => e.Id == actualCard.CabinetId, cancellationToken) &&
            await timetableContext.Subjects.AnyAsync(e => e.Id == actualCard.SubjectId, cancellationToken) &&
            await timetableContext.Subjects.AnyAsync(e => e.Id == actualCard.RelatedTimetableId, cancellationToken);
        }
    }
}
