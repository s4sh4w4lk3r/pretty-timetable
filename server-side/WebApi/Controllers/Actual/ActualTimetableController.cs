using Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models.Request.Timetables;
using Services;
using Services.Interfaces.Actual;

namespace WebApi.Controllers.Actual
{
    [ApiController, Route("timetable/actual")]
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
        public async Task<IActionResult> StableToActual(StableToActualModel stableToActualModel)
        {
            var dates = stableToActualModel.Dates.Select(DateOnly.Parse);

            var result = await actualTimetableService.ProjectStableToActualAsync(dates);
            if (result.Success is false)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }


        [HttpPatch, Route(""), Authorize(policy: KeycloakPolicies.TimetableCRUD)]
        public async Task<IActionResult> Update()
        {
            throw new NotImplementedException();
        }

        [HttpPost, Route(""), Authorize(policy: KeycloakPolicies.TimetableCRUD)]
        public async Task<IActionResult> Create()
        {
            throw new NotImplementedException();
        }

        [HttpDelete, Route(""), Authorize(policy: KeycloakPolicies.TimetableCRUD)]
        public async Task<IActionResult> Delete(int id)
        {
            if (id == default)
            {
                return NotFound(ServiceResult.Fail("Id не должен быть равен нулю"));
            }

            throw new NotImplementedException();
        }
    }
}
