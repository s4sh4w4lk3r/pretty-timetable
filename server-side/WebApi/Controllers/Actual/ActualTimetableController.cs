using Auth;
using Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models.Request;
using Npgsql;
using Services;
using Services.Interfaces.Actual;
using System.Globalization;

namespace WebApi.Controllers.Actual
{
    [ApiController, Route("actual")]
    public class ActualTimetableController(IActualTimetableService actualTimetableService) : ControllerBase
    {

        /// <summary>
        /// 
        /// </summary>
        /// 
        /// <remarks>
        /// Пример тела запроса:
        /// {
        ///    "dates": [
        ///       "02.09.2024",
        ///       "03.09.2024",
        ///       "04.09.2024",
        ///       "05.09.2024",
        ///       "06.09.2024"
        ///     ]
        /// }
        /// </remarks>
        /// 
        /// <param name="stableToActualModel"></param>
        /// <returns></returns>
        [HttpPost, Route("convert-from-stable"), Authorize(policy: KeycloakPolicies.TimetableCRUD)]
        public async Task<IActionResult> StableToActual(ActualTimetableModels.StableToActual stableToActualModel)
        {
            var dates = stableToActualModel.Dates.Select(d => DateOnly.ParseExact(d, "dd.MM.yyyy"));

            var result = await actualTimetableService.ProjectStableToActualAsync(dates);
            if (result.Success is false)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }


        [HttpPut, Route(""), Authorize(policy: KeycloakPolicies.TimetableCRUD)]
        public async Task<IActionResult> Update(ActualTimetableModels.ActualTimetablePut model)
        {
            var result = await actualTimetableService.PutAsync(model.ToEntity());

            return result.Success is true ? Ok(result) : BadRequest(result);
        }

        [HttpDelete, Route(""), Authorize(policy: KeycloakPolicies.TimetableCRUD)]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await actualTimetableService.DeleteAsync(id);

            return result.Success is true ? Ok(result) : BadRequest(result);
        }

        [HttpPost, Route("convert-from-stable/mon-to-fri"), Authorize(policy: KeycloakPolicies.TimetableCRUD)]
        public async Task<IActionResult> StableToActual(int weekNumber)
        {
            if (weekNumber < 0 || weekNumber > 53)
            {
                return BadRequest(ServiceResult.Fail("Номер недели должен быть больше нуля и не более 53"));
            }

            var firstDayOfWeek = DateOnly.FromDateTime(ISOWeek.ToDateTime(DateTime.Now.Year, weekNumber, DayOfWeek.Monday));
            List<DateOnly> dates = [];

            for (int i = 0; i < 5; i++)
            {
                dates.Add(firstDayOfWeek.AddDays(i));
            }


            try
            {
                var result = await actualTimetableService.ProjectStableToActualAsync(dates);
                if (result.Success is false)
                {
                    return BadRequest(result);
                }
                return Ok(result);
            }
            catch (DbUpdateException ex) when (ex.InnerException is PostgresException pgEx && pgEx.SqlState == PostgresErrorCodes.UniqueViolation)
            {
                return BadRequest(ServiceResult.Fail("На данную неделю расписание уже создано."));
            }
        }
    }
}
