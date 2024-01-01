using Mappers;
using Microsoft.AspNetCore.Mvc;
using Models.Request.Timetables.Cards;
using Services.AcutalTimetables;

namespace WebApi.Controllers
{
    [ApiController, Route("timetable/actualcard")]
    public class ActualCardController(ActualCardService actualCardService) : ControllerBase
    {
        [HttpPatch, Route("")]
        public async Task<IActionResult> UpdateActualCard(ActualCardUpdateModel model)
        {
            var result = await actualCardService.UpdateCard(model.ToEntity());
            
            return result.Success ? Ok(result) : BadRequest(result);

#warning проверить и добавить авторизацию
        }
    }
}
