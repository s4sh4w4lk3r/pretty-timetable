using Mappers.CardParts;
using Microsoft.AspNetCore.Mvc;
using Models.Request.CardParts;
using Services.CardParts;
using Services.Interfaces.CardParts;

namespace WebApi.Controllers.CardParts
{
    [ApiController, Route("cardparts/teacher")]
    public class TeacherController(ITeacherService teacherService) : ControllerBase
    {
        [HttpPost, Route("")]
        public async Task<IActionResult> Create(TeacherModels.TeacherCreate model)
        {
            var result = await teacherService.CreateAsync(model.ToEntity());

            return result.Success ? Ok(result) : BadRequest(result);
        }

        [HttpPatch, Route("")]
        public async Task<IActionResult> Update(TeacherModels.TeacherUpdate model)
        {
            var result = await teacherService.UpdateAsync(model.ToEntity());

            return result.Success ? Ok(result) : BadRequest(result);
        }

        [HttpDelete, Route("")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await teacherService.DeleteAsync(id);

            return result.Success ? Ok(result) : BadRequest(result);
        }
    }
}
