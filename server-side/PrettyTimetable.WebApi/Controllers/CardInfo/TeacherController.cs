using Mappers.CardParts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models.Request.CardParts;
using PrettyTimetable.Abstractions.CardParts;

namespace PrettyTimetable.WebApi.Controllers.CardInfo
{
    [ApiController, Route("teacher")]
    public class TeacherController(ITeacherService teacherService) : ControllerBase
    {
        [HttpPut, Route(""), Authorize(policy: KeycloakPolicies.TimetableCRUD)]
        public async Task<IActionResult> Put(TeacherModels.TeacherPut model)
        {
            var result = await teacherService.PutAsync(model.ToEntity());

            return result.Success ? Ok(result) : BadRequest(result);
        }


        [HttpDelete, Route(""), Authorize(policy: KeycloakPolicies.TimetableCRUD)]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await teacherService.DeleteAsync(id);

            return result.Success ? Ok(result) : BadRequest(result);
        }
    }
}
