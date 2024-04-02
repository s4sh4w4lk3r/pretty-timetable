using Microsoft.EntityFrameworkCore;
using Npgsql;
using PrettyTimetable.Core;
using static PrettyTimetable.Core.ResultMessages;

namespace Services
{
    public static class QueryHandler
    {
        public static async Task<ServiceResult> HandleQuery(this Task<int> queryTask)
        {
            try
            {

                return await queryTask != 0 ? ServiceResult.Ok("Операция в базе данных прошла успешно.") : ServiceResult.Fail(NotFound);
            }

            catch (DbUpdateConcurrencyException)
            {
                return ServiceResult.Fail(NotFound);
            }

            catch (DbUpdateException ex) when (ex.InnerException is PostgresException pgEx && pgEx.SqlState == PostgresErrorCodes.ForeignKeyViolation)
            {
                return ServiceResult.Fail($"{ForeignKeyError} Имя ограничения: {pgEx.ConstraintName}");
            }
            

            catch (DbUpdateException ex) when (ex.InnerException is PostgresException pgEx && pgEx.SqlState == PostgresErrorCodes.UniqueViolation)
            {
                return ServiceResult.Fail($"{UniqueIndexError} Имя ограничения: {pgEx.ConstraintName}");
            }

            catch 
            {
                throw;
            }
        }
    }
}
