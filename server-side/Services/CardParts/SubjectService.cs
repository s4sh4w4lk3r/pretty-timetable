using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Npgsql;
using Repository.Database;
using Repository.Entities.Timetable.Cards.Parts;
using Services.Interfaces.CardParts;

namespace Services.CardParts
{
    public class SubjectService(TimetableContext timetableContext, ILoggerFactory logger) : ISubjectService
    {
        public async Task<ServiceResult> CreateAsync(Subject subject, CancellationToken cancellationToken = default)
        {
            if (string.IsNullOrWhiteSpace(subject.Name))
            {
                return ServiceResult.Fail("Имя предмета не должно быть пустым.");
            }

            if (subject.Id != 0)
            {
                return ServiceResult.Fail("Id при добавлении должен быть равен нулю.");
            }

            await timetableContext.Subjects.AddAsync(subject, cancellationToken);
            await timetableContext.SaveChangesAsync(cancellationToken);
            return ServiceResult.Ok("Премдет добавился в бд.");
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

        public async Task<ServiceResult> UpdateAsync(Subject subject, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }
    }
}
