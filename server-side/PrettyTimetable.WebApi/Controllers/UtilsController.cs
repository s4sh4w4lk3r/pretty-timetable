using HotChocolate.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrettyTimetable.Core;
using PrettyTimetable.Repository.Database;

namespace PrettyTimetable.WebApi.Controllers
{
    [ApiController, Route("utils")]
    public class UtilsController(TimetableContext timetableContext, ILoggerFactory loggerFactory) : ControllerBase
    {
        private readonly ILogger _logger = loggerFactory.CreateLogger<UtilsController>();

        [HttpPost, Route("apply-migration")]
        public async Task<IActionResult> ApplyMigration(CancellationToken cancellationToken = default)
        {
            var pendingMigrations = await timetableContext.Database.GetPendingMigrationsAsync(cancellationToken: cancellationToken);
            if (!pendingMigrations.Any())
            {
                return Ok(ServiceResult.Ok("Миграция базы данных не требуется."));
            }

            try
            {
                await timetableContext.Database.MigrateAsync(cancellationToken);
                return Ok(ServiceResult.Ok("Миграция базы данных прошла успешно."));
            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex, "Ошибка миграции.");
                return StatusCode(500, ServiceResult.Fail("Не получилось провести миграцию БД. См. логи на бекенде."));
            }
        }

    }
}
