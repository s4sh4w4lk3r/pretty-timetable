using Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace WebApi.Controllers.Stable
{
    [ApiController, Route("timetable/stable")]
    public class StableTimetableController : ControllerBase
    {
        [HttpPatch, Route(""), Authorize(policy: KeycloakPolicies.TimetableCRUD)]
        public async Task<IActionResult> Update()
        {
            throw new NotImplementedException();
        }

        [HttpPost, Route(""), Authorize(policy: KeycloakPolicies.TimetableCRUD)]
        public async Task<IActionResult> Create()
        {
            throw new NotImplementedException();
        }

        [HttpDelete, Route(""), Authorize(policy: KeycloakPolicies.TimetableCRUD)]
        public async Task<IActionResult> Delete(int id)
        {
            if (id == default)
            {
                return NotFound(ServiceResult.Fail("Id не должен быть равен нулю"));
            }
            throw new NotImplementedException();
        }
    }
}
