using Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models.Request;
using PrettyTimetable.Abstractions.Stable;

namespace PrettyTimetable.WebApi.Controllers.Stable
{
    [ApiController, Route("stable/card")]
    public class StableCardController(IStableCardService stableCardService) : ControllerBase
    {
        [HttpPut, Route(""), Authorize(policy: KeycloakPolicies.TimetableCRUD)]
        public async Task<IActionResult> Update(StableCardModels.StableCardPut model)
        {
            var result = await stableCardService.PutAsync(model.ToEntity());

            return result.Success is true ? Ok(result) : BadRequest(result);
        }


        [HttpDelete, Route(""), Authorize(policy: KeycloakPolicies.TimetableCRUD)]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await stableCardService.DeleteAsync(id);

            return result.Success is true ? Ok(result) : BadRequest(result);
        }
    }
}
