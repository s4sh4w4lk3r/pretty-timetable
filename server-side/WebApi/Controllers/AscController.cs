using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

namespace WebApi.Controllers
{
    [ApiController, Route("timetable/asc")]
    public class AscController(IAscService ascService) : ControllerBase
    {
#warning не забыть авторизацию

        /// <response code="200">Успешное выполнение</response>
        /// <response code="400">Ошибка API</response>
        [HttpPost, Route("timetable")]
        public async Task<IActionResult> AddTimetable(IFormFile timetable)
        {
            var stream = timetable.OpenReadStream();
            var result = await ascService.ImportTimetables(stream);
            return Ok(result);
        }


        /// <response code="200">Успешное выполнение</response>
        /// <response code="400">Ошибка API</response>
        [HttpPost, Route("substitutions")]
        public async Task<IActionResult> AddSubstitutions(IFormFile substitutions)
        {
            var stream = substitutions.OpenReadStream();
            var result = await ascService.ImportSubstitations(stream);
            return Ok(result);
        }
    }
}
