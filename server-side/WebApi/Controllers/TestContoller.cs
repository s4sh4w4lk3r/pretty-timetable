using Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("test")]
    public class TestContoller : ControllerBase
    {
        [HttpGet, Route("r")]
        public IActionResult R()
        {
            return Ok();
        }

        [HttpGet, Route("crud"), Authorize(policy: KeycloakPolicies.TimetableCRUD)]
        public IActionResult CRUD()
        {
            return Ok();
        }
    }
}
