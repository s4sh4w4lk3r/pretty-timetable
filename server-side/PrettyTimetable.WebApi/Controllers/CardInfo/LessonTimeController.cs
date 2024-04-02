using Microsoft.AspNetCore.Mvc;
using Models.Request.CardParts;
using Mappers.CardParts;
using Microsoft.AspNetCore.Authorization;
using PrettyTimetable.Abstractions.CardParts;

namespace PrettyTimetable.WebApi.Controllers.CardInfo
{
    [ApiController, Route("lessontime")]
    public class LessonTimeController(ILessonTimeService lessonTimeService) : ControllerBase
    {
        [HttpPut, Route(""), Authorize(policy: KeycloakPolicies.TimetableCRUD)]
        public async Task<IActionResult> Put(LessonTimeModels.LessonTimePut model)
        {
            var result = await lessonTimeService.PutAsync(model.ToEntity());

            return result.Success ? Ok(result) : BadRequest(result);
        }


        [HttpDelete, Route(""), Authorize(policy: KeycloakPolicies.TimetableCRUD)]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await lessonTimeService.DeleteAsync(id);

            return result.Success ? Ok(result) : BadRequest(result);
        }
    }
}
