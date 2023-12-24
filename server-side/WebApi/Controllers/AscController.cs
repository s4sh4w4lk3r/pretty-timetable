using Microsoft.AspNetCore.Mvc;
using Services.Asc;

namespace WebApi.Controllers
{
    [ApiController, Route("asc")]
    public class AscController(AscService ascService) : ControllerBase
    {
#warning не забыть авторизацию
        [HttpPost, Route("timetable")]
        public async Task<IActionResult> AddTimetable(IFormFile timetable)
        {
            var stream = timetable.OpenReadStream();
            await ascService.ImportTimetables(stream);
            return Ok();
        }

        [HttpPost, Route("substitutions")]
        public async Task<IActionResult> AddSubstitutions(IFormFile substitutions)
        {
            var stream = substitutions.OpenReadStream();
            await ascService.ImportSubstitations(stream);
            return Ok();
        }
    }
}
