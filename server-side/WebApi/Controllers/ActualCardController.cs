using Auth;
using Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models.Request.Timetables.Cards;
using Services.AcutalTimetables;

namespace WebApi.Controllers
{
    [ApiController, Route("timetable/actualcard")]
    public class ActualCardController(ActualCardService actualCardService) : ControllerBase
    {

        [HttpPatch, Route(""), Authorize(policy: KeycloakPolicies.TimetableCRUD)]
        public async Task<IActionResult> UpdateActualCard(ActualCardUpdateModel model)
        {
            var result = await actualCardService.UpdateCard(model.ToEntity());
            
            return result.Success ? Ok(result) : BadRequest(result);

#warning попробовать сделать ендпоинт, который принимает интерфейс карточки.
        }
    }
}
