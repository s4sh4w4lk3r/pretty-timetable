using Mappers;
using Microsoft.AspNetCore.Mvc;
using Models.Request;
using PrettyTimetable.Abstractions;

namespace PrettyTimetable.WebApi.Controllers
{
    [ApiController, Route("group")]
    public class GroupController(IGroupService groupService) : ControllerBase
    {
        [HttpPut, Route("")]
        public async Task<IActionResult> Update(GroupModels.GroupPut model)
        {
            var result = await groupService.PutAsync(model.ToEntity());

            return result.Success is true ? Ok(result) : BadRequest(result);
        }


        [HttpDelete, Route("")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await groupService.DeleteAsync(id);

            return result.Success is true ? Ok(result) : BadRequest(result);
        }
    }
}
