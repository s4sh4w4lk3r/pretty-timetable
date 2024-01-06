using Auth;
using Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models.Request;
using Services.Interfaces.Actual;

namespace WebApi.Controllers.Actual
{
    [ApiController, Route("timetable/actual/card")]
    public class ActualCardController(IActualCardService actualCardService) : ControllerBase
    {

        [HttpPatch, Route(""), Authorize(policy: KeycloakPolicies.TimetableCRUD)]
        public async Task<IActionResult> Update(ActualCardModels.ActualCardUpdate model)
        {
            var result = await actualCardService.UpdateAsync(model.ToEntity());

            return result.Success ? Ok(result) : BadRequest(result);
        }

        [HttpPost, Route(""), Authorize(policy: KeycloakPolicies.TimetableCRUD)]
        public async Task<IActionResult> Create(ActualCardModels.ActualCardCreate model)
        {
            var result = await actualCardService.CreateAsync(model.ToEntity());

            return result.Success ? Ok(result) : BadRequest(result);
        }

        [HttpDelete, Route(""), Authorize(policy: KeycloakPolicies.TimetableCRUD)]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await actualCardService.DeleteAsync(id);

            return result.Success is true ? Ok(result) : BadRequest(result);
        }
    }
}
