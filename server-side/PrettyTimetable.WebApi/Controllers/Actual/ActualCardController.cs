using Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models.Request;
using PrettyTimetable.Abstractions.Actual;

namespace PrettyTimetable.WebApi.Controllers.Actual
{
    [ApiController, Route("actual/card")]
    public class ActualCardController(IActualCardService actualCardService) : ControllerBase
    {

        [HttpPut, Route("")]
        public async Task<IActionResult> Update(ActualCardModels.ActualCardPut model)
        {
            var result = await actualCardService.PutAsync(model.ToEntity());

            return result.Success ? Ok(result) : BadRequest(result);
        }

        [HttpDelete, Route("")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await actualCardService.DeleteAsync(id);

            return result.Success is true ? Ok(result) : BadRequest(result);
        }
    }
}
