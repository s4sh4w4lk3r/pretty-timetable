using Mappers.CardParts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models.Request.CardParts;
using PrettyTimetable.Abstractions.CardParts;

namespace PrettyTimetable.WebApi.Controllers.CardInfo
{
    [ApiController, Route("subject")]
    public class SubjectController(ISubjectService subjectService) : ControllerBase
    {
        [HttpPut, Route("")]
        public async Task<IActionResult> Put(SubjectModels.SubjectPut model)
        {
            var result = await subjectService.PutAsync(model.ToEntity());

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
