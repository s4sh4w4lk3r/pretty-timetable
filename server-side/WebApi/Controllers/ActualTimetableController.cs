using Microsoft.AspNetCore.Mvc;
using Services.AcutalTimetables;
using WebApi.Models.Request.Timetables;

namespace WebApi.Controllers
{
    [ApiController, Route("timetable/actual")]
    public class ActualTimetableController(ActualTimetableService actualTimetableService) : ControllerBase
    {
#warning не забыть авторизацию
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
