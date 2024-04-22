using Mappers.CardParts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models.Request.CardParts;
using PrettyTimetable.Abstractions.CardParts;

namespace PrettyTimetable.WebApi.Controllers.CardInfo
{
    [ApiController, Route("room")]
    public class RoomController(IRoomService cabinetService) : ControllerBase
    {
        [HttpPut, Route("")]
        public async Task<IActionResult> Put(RoomModels.RoomPut model)
        {
            var result = await cabinetService.PutAsync(model.ToEntity());

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
