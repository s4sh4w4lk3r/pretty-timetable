using Microsoft.EntityFrameworkCore;
using Npgsql;
using Repository.Database;
using Repository.Entities.Timetable.Cards.Parts;
using Services.Interfaces.CardParts;

namespace Services.CardParts
{
    public class TeacherService(TimetableContext timetableContext) : ITeacherService
    {
        public async Task<ServiceResult> CreateAsync(Teacher teacher, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
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

        public async Task<ServiceResult> UpdateAsync(Teacher teacher, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }
    }
}
