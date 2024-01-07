using Microsoft.EntityFrameworkCore;
using Npgsql;
using Repository.Database;
using Repository.Entities.Timetable.Cards.Parts;
using Services.Interfaces.CardParts;
using Validation.Entities.CardParts;

namespace Services.CardParts
{
    public class CabinetService(TimetableContext timetableContext) : ICabinetService
    {
        public async Task<ServiceResult<int>> PutAsync(Cabinet cabinet, CancellationToken cancellationToken = default)
        {
#warning проверить
            var valResult = new CabinetValidator().Validate(cabinet);
            if (valResult.IsValid is false)
            {
                return ServiceResult.Fail(valResult.ToString(), default(int));
            }

            timetableContext.Cabinets.Update(cabinet);
            await timetableContext.SaveChangesAsync(cancellationToken);
            return ServiceResult.Ok("Запись добавлена или обновлена", cabinet.Id);
        }

        public async Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default)
        {
#warning проверить
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
    }
}
