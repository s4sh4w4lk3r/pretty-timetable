using Microsoft.EntityFrameworkCore;
using Npgsql;
using Repository.Database;
using Repository.Entities.Timetable.Cards.Parts;
using Services.Interfaces.CardParts;
using Validation.Entities.CardParts;

namespace Services.CardParts
{
    public class LessonTimeService(TimetableContext timetableContext) : ILessonTimeService
    {
        public async Task<ServiceResult<int>> PutAsync(LessonTime lessonTime, CancellationToken cancellationToken = default)
        {
#warning проверить
            var valResult = new LessonTimeValidator().Validate(lessonTime);
            if (valResult.IsValid is false)
            {
                return ServiceResult.Fail(valResult.ToString(), default(int));
            }

            timetableContext.LessonTimes.Update(lessonTime);
            await timetableContext.SaveChangesAsync(cancellationToken);
            return ServiceResult.Ok("Запись добавлена или обновлена", lessonTime.Id);
        }

        public async Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default)
        {
#warning проверить
            try
            {
                await timetableContext.LessonTimes.Where(e => e.Id == id).ExecuteDeleteAsync(cancellationToken);
                return ServiceResult.Ok("Урок удален.");
            }
            catch (PostgresException ex) when (ex.SqlState == PostgresErrorCodes.ForeignKeyViolation)
            {
                return ServiceResult.Fail("Урок не удален, поскольку на него ссылается какая-то сущность.");
            }
        }
    }
}
