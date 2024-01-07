using Microsoft.EntityFrameworkCore;
using Npgsql;
using Repository.Database;
using Repository.Entities.Timetable.Cards.Parts;
using Services.Interfaces.CardParts;
using Validation.Entities.CardParts;

namespace Services.CardParts
{
    public class TeacherService(TimetableContext timetableContext) : ITeacherService
    {
        public async Task<ServiceResult<int>> PutAsync(Teacher teacher, CancellationToken cancellationToken = default)
        {
#warning проверить
            var valResult = new TeacherValidator().Validate(teacher);
            if (valResult.IsValid is false)
            {
                return ServiceResult<int>.Fail(valResult.ToString(), default);
            }

            timetableContext.Teachers.Update(teacher);
            await timetableContext.SaveChangesAsync(cancellationToken);
            return ServiceResult<int>.Ok("Запись добавлена или обновлена", teacher.Id);
        }

        public async Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default)
        {
            try
            {
                await timetableContext.Teachers.Where(e => e.Id == id).ExecuteDeleteAsync(cancellationToken);
                return ServiceResult.Ok("Учитель удален.");
            }
            catch (PostgresException ex) when (ex.SqlState == PostgresErrorCodes.ForeignKeyViolation)
            {
                return ServiceResult.Fail("Учитель не удален, поскольку на него ссылается какая-то сущность.");
            }
        }
    }
}
