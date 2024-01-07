using Microsoft.EntityFrameworkCore;
using Npgsql;
using Repository.Database;
using Repository.Entities.Timetable.Cards.Parts;
using Services.Interfaces.CardParts;

namespace Services.CardParts
{
    public class CabinetService(TimetableContext timetableContext) : ICabinetService
    {
        public async Task<ServiceResult> CreateAsync(Cabinet cabinet, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default)
        {
            try
            {
                await timetableContext.Cabinets.Where(e => e.Id == id).ExecuteDeleteAsync(cancellationToken);
                return ServiceResult.Ok("Кабинет удален.");
            }
            catch (PostgresException ex) when (ex.SqlState == PostgresErrorCodes.ForeignKeyViolation)
            {
                return ServiceResult.Fail("Кабинет не удален, поскольку на него ссылается какая-то сущность.");
            }
        }

        public async Task<ServiceResult> UpdateAsync(Cabinet cabinet, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }
    }
}
