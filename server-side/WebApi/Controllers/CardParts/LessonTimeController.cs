using Microsoft.AspNetCore.Mvc;
using Models.Request.CardParts;
using Services.Interfaces.CardParts;
using Mappers.CardParts;

namespace WebApi.Controllers.CardParts
{
    [ApiController, Route("cardparts/lessontime")]
    public class LessonTimeController(ILessonTimeService lessonTimeService) : ControllerBase
    {
        [HttpPost, Route("")]
        public async Task<IActionResult> Create(LessonTimeModels.LessonTimeCreate model)
        {
            var result = await lessonTimeService.CreateAsync(model.ToEntity());

            return result.Success ? Ok(result) : BadRequest(result);
        }

        [HttpPatch, Route("")]
        public async Task<IActionResult> Update(LessonTimeModels.LessonTimeUpdate model)
        {
            var result = await lessonTimeService.UpdateAsync(model.ToEntity());

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
