using Mappers.CardParts;
using Microsoft.AspNetCore.Mvc;
using Models.Request.CardParts;
using Services.Interfaces.CardParts;

namespace WebApi.Controllers.CardParts
{
    [ApiController, Route("cardparts/cabinet")]
    public class CabinetController(ICabinetService cabinetService) : ControllerBase
    {
        [HttpPost, Route("")]
        public async Task<IActionResult> Create(CabinetModels.CabinetCreate model)
        {
            var result = await cabinetService.CreateAsync(model.ToEntity());

            return result.Success ? Ok(result) : BadRequest(result);
        }

        [HttpPatch, Route("")]
        public async Task<IActionResult> Update(CabinetModels.CabinetUpdate model)
        {
            var result = await cabinetService.UpdateAsync(model.ToEntity());

            return result.Success ? Ok(result) : BadRequest(result);
        }

        [HttpDelete, Route("")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await cabinetService.DeleteAsync(id);

            return result.Success ? Ok(result) : BadRequest(result);
        }
    }
}
