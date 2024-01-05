using Auth;
using Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models.Request.Timetables.Cards;
using Services;
using Services.Interfaces.Actual;

namespace WebApi.Controllers.Actual
{
    [ApiController, Route("timetable/actual/card")]
    public class ActualCardController(IActualCardService actualCardService) : ControllerBase
    {

        [HttpPatch, Route(""), Authorize(policy: KeycloakPolicies.TimetableCRUD)]
        public async Task<IActionResult> Update(ActualCardUpdateModel model)
        {
            var result = await actualCardService.UpdateAsync(model.ToEntity());

            return result.Success ? Ok(result) : BadRequest(result);
        }

        [HttpPost, Route(""), Authorize(policy: KeycloakPolicies.TimetableCRUD)]
        public async Task<IActionResult> Create()
        {
            throw new NotImplementedException();
        }

        [HttpDelete, Route(""), Authorize(policy: KeycloakPolicies.TimetableCRUD)]
        public async Task<IActionResult> Delete(int id)
        {
            if (id == default)
            {
                return NotFound(ServiceResult.Fail("Id не должен быть равен нулю"));
            }

            throw new NotImplementedException();
        }
    }
}
