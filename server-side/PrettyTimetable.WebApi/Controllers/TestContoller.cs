using Auth;
using Mappers;
using Mappers.CardParts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static Models.Request.ActualTimetableModels;

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

        [HttpPost, Route("crud"), Authorize(policy: KeycloakPolicies.TimetableCRUD)]
        public IActionResult CRUD(ActualTimetablePut model)
        {
            return Ok(model.ToEntity());
        }
    }

}
