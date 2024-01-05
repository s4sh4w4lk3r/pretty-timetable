using Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces.Stable;

namespace WebApi.Controllers.Stable
{
    [ApiController, Route("timetable/asc")]
    public class AscController(IAscService ascService) : ControllerBase
    {
        [HttpPost, Route("timetable"), Authorize(policy: KeycloakPolicies.TimetableCRUD)]
        public async Task<IActionResult> AddTimetable(IFormFile timetable)
        {
            var stream = timetable.OpenReadStream();
            var result = await ascService.ImportTimetables(stream);
            return Ok(result);
        }


        [HttpPost, Route("substitutions"), Authorize(policy: KeycloakPolicies.TimetableCRUD)]
        public async Task<IActionResult> AddSubstitutions(IFormFile substitutions)
        {
            var stream = substitutions.OpenReadStream();
            var result = await ascService.ImportSubstitations(stream);
            return Ok(result);
        }
    }
}
