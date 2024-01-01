using Microsoft.AspNetCore.Mvc;
using Models.Request.Timetables;
using Services.Interfaces;

namespace WebApi.Controllers
{
    [ApiController, Route("timetable/actual")]
    public class ActualTimetableController(IActualTimetableService actualTimetableService) : ControllerBase
    {
#warning не забыть авторизацию

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
        [HttpPost, Route("convert-from-stable")]
        public async Task<IActionResult> StableToActual(StableToActualModel stableToActualModel)
        {
            var dates = stableToActualModel.Dates.Select(DateOnly.Parse);

            var result = await actualTimetableService.StableToActual(dates);
            if (result.Success is false)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }
    }
}
