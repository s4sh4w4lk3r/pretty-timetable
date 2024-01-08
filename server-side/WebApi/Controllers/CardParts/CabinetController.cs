using Auth;
using Mappers.CardParts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models.Request.CardParts;
using Services.Interfaces.CardParts;

namespace WebApi.Controllers.CardParts
{
    [ApiController, Route("cabinet")]
    public class CabinetController(ICabinetService cabinetService) : ControllerBase
    {
        [HttpPut, Route(""), Authorize(policy: KeycloakPolicies.TimetableCRUD)]
        public async Task<IActionResult> Put(CabinetModels.CabinetPut model)
        {
            var result = await cabinetService.PutAsync(model.ToEntity());

            return result.Success ? Ok(result) : BadRequest(result);
        }


        [HttpDelete, Route(""), Authorize(policy: KeycloakPolicies.TimetableCRUD)]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await cabinetService.DeleteAsync(id);

            return result.Success ? Ok(result) : BadRequest(result);
        }
    }
}
