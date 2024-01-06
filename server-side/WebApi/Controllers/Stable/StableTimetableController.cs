using Auth;
using Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models.Request;
using Services.Interfaces.Stable;

namespace WebApi.Controllers.Stable
{
    [ApiController, Route("timetable/stable")]
    public class StableTimetableController(IStableTimetableService stableTimetableService) : ControllerBase
    {
        [HttpPatch, Route(""), Authorize(policy: KeycloakPolicies.TimetableCRUD)]
        public async Task<IActionResult> Update(StableTimetableModels.StableTimetableUpdate models)
        {

            var result = await stableTimetableService.UpdateAsync(models.ToEntity());

            return result.Success is true ? Ok(result) : BadRequest(result);
        }

        [HttpPost, Route(""), Authorize(policy: KeycloakPolicies.TimetableCRUD)]
        public async Task<IActionResult> Create(StableTimetableModels.StableTimetableCreate models)
        {

            var result = await stableTimetableService.CreateAsync(models.ToEntity());

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
