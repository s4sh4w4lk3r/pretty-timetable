using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PrettyTimetable.Abstractions.Stable;

namespace PrettyTimetable.WebApi.Controllers.Stable
{
    [ApiController, Route("stable/asc")]
    public class AscController(IAscService ascService) : ControllerBase
    {
        [HttpPost, Route("timetable")]
        public async Task<IActionResult> AddTimetable(IFormFile timetable)
        {
            var stream = timetable.OpenReadStream();
            var result = await ascService.ImportTimetablesAsync(stream);
            return Ok(result);
        }


        [HttpPost, Route("substitutions")]
        public IActionResult AddSubstitutions(IFormFile substitutions)
        {
            /*var stream = substitutions.OpenReadStream();
            var result = await ascService.ImportSubstitationsAsync(stream);*/
            return StatusCode(418);
        }
    }
}
