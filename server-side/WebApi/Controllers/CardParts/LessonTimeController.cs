using Microsoft.AspNetCore.Mvc;
using Models.Request.CardParts;
using Services.Interfaces.CardParts;
using Mappers.CardParts;

namespace WebApi.Controllers.CardParts
{
    [ApiController, Route("lessontime")]
    public class LessonTimeController(ILessonTimeService lessonTimeService) : ControllerBase
    {
        [HttpPut, Route("")]
        public async Task<IActionResult> Put(LessonTimeModels.LessonTimePut model)
        {
            var result = await lessonTimeService.PutAsync(model.ToEntity());

            return result.Success ? Ok(result) : BadRequest(result);
        }


        [HttpDelete, Route("")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await lessonTimeService.DeleteAsync(id);

            return result.Success ? Ok(result) : BadRequest(result);
        }
    }
}
