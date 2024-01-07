using Microsoft.EntityFrameworkCore;
using Npgsql;
using Repository.Database;
using Repository.Entities.Timetable.Cards.Parts;
using Services.Interfaces.CardParts;
using Validation.Entities.CardParts;

namespace Services.CardParts
{
    public class SubjectService(TimetableContext timetableContext) : ISubjectService
    {
        public async Task<ServiceResult<int>> PutAsync(Subject subject, CancellationToken cancellationToken = default)
        {
#warning проверить
            var valResult = new SubjectValidator().Validate(subject);
            if (valResult.IsValid is false)
            {
                return ServiceResult.Fail<int>(valResult.ToString(), default);
            }

            timetableContext.Subjects.Update(subject);
            await timetableContext.SaveChangesAsync(cancellationToken);
            return ServiceResult.Ok("Запись добавлена или обновлена", subject.Id);
        }

        public async Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default)
        {
            try
            {
                await timetableContext.Subjects.Where(e => e.Id == id).ExecuteDeleteAsync(cancellationToken);
                return ServiceResult.Ok("Предмет удален.");
            }
            catch (PostgresException ex) when (ex.SqlState == PostgresErrorCodes.ForeignKeyViolation)
            {
                return ServiceResult.Fail("Предмет не удален, поскольку на него ссылается какая-то сущность.");
            }
        }
    }
}
