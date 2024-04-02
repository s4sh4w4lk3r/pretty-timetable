using Auth;
using Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models.Request;
using PrettyTimetable.Abstractions.Stable;

namespace WebApi.Controllers.Stable
{
    [ApiController, Route("stable")]
    public class StableTimetableController(IStableTimetableService stableTimetableService) : ControllerBase
    {
        [HttpPut, Route(""), Authorize(policy: KeycloakPolicies.TimetableCRUD)]
        public async Task<IActionResult> Update(StableTimetableModels.StableTimetablePut models)
        {
            var result = await stableTimetableService.PutAsync(models.ToEntity());

            return result.Success is true ? Ok(result) : BadRequest(result);
        }

        [HttpDelete, Route(""), Authorize(policy: KeycloakPolicies.TimetableCRUD)]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await stableTimetableService.DeleteAsync(id);

            return result.Success is true ? Ok(result) : BadRequest(result);
        }
    }
}
