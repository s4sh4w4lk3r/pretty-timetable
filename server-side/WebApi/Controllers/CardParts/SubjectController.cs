using Mappers.CardParts;
using Microsoft.AspNetCore.Mvc;
using Models.Request.CardParts;
using Services.Interfaces.CardParts;

namespace WebApi.Controllers.CardParts
{
    [ApiController, Route("cardparts/subject")]
    public class SubjectController(ISubjectService subjectService) : ControllerBase
    {
        [HttpPost, Route("")]
        public async Task<IActionResult> Create(SubjectModels.SubjectCreate model)
        {
            var result = await subjectService.CreateAsync(model.ToEntity());

            return result.Success ? Ok(result) : BadRequest(result);
        }

        [HttpPatch, Route("")]
        public async Task<IActionResult> Update(SubjectModels.SubjectUpdate model)
        {
            var result = await subjectService.UpdateAsync(model.ToEntity());

            return result.Success ? Ok(result) : BadRequest(result);
        }

        [HttpDelete, Route("")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await subjectService.DeleteAsync(id);

            return result.Success ? Ok(result) : BadRequest(result);
        }
    }
}
