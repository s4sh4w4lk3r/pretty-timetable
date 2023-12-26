using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("test")]
    public class TestContoller : ControllerBase
    {
        [HttpGet, Route(""), Authorize]
        public IActionResult Do()
        {
            return Ok();
        }
    }
}
