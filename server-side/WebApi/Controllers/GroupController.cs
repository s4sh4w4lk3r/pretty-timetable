using Auth;
using Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models.Request;
using Services.Interfaces;

namespace WebApi.Controllers
{
    [ApiController, Route("group")]
    public class GroupController(IGroupService groupService) : ControllerBase
    {
        [HttpPut, Route(""), /*Authorize(policy: KeycloakPolicies.TimetableCRUD)*/ AllowAnonymous]
        public async Task<IActionResult> Update(GroupModels.GroupPut model)
        {
            var result = await groupService.PutAsync(model.ToEntity());

            return result.Success is true ? Ok(result) : BadRequest(result);
        }


        [HttpDelete, Route(""), Authorize(policy: KeycloakPolicies.TimetableCRUD)]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await groupService.DeleteAsync(id);

            return result.Success is true ? Ok(result) : BadRequest(result);
        }
    }
}
