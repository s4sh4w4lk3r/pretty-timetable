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
            var valResult = new ActualCardValidator().Validate(actualCard);
            if (valResult.IsValid is false)
            {
                return ServiceResult.Fail(valResult.ToString());
            }

            var cardFromRepo = timetableContext.ActualCards.SingleOrDefault(e => e.Id == actualCard.Id);
            if (cardFromRepo is null)
            {
                return ServiceResult.Fail("Такой карточки актуального расписания нет в бд для обновления.");
            }

            bool foreingIdsExist = timetableContext.Subjects.Any(e => e.Id == actualCard.SubjectId) &&
            timetableContext.Subjects.Any(e => e.Id == actualCard.TeacherId) &&
            timetableContext.Subjects.Any(e => e.Id == actualCard.LessonTimeId) &&
            timetableContext.Subjects.Any(e => e.Id == actualCard.CabinetId) &&
            timetableContext.Subjects.Any(e => e.Id == actualCard.SubjectId);

            if (foreingIdsExist is false)
            {
                return ServiceResult.Fail("Указаны несуществующие внешние ключи.");
            }

            cardFromRepo.SubjectId = actualCard.SubjectId;
            cardFromRepo.TeacherId = actualCard.TeacherId;
            cardFromRepo.LessonTimeId = actualCard.LessonTimeId;
            cardFromRepo.CabinetId = actualCard.CabinetId;
            cardFromRepo.SubGroup = actualCard.SubGroup;
            cardFromRepo.IsCanceled = actualCard.IsCanceled;
            cardFromRepo.IsCanceled = actualCard.IsModified;
            cardFromRepo.IsCanceled = actualCard.IsMoved;
            cardFromRepo.UpdatedAt = DateTime.UtcNow;


            await timetableContext.SaveChangesAsync();

            return ServiceResult.Ok("Актуальная карточка обновлена.");
        }

        public async Task<ServiceResult> CreateAsync(ActualCard actualCard, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
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
    }
}
