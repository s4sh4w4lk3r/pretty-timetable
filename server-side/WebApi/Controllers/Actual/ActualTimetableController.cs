using Auth;
using Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models.Request;
using Services.Interfaces.Actual;

namespace WebApi.Controllers.Actual
{
    [ApiController, Route("actual")]
    public class ActualTimetableController(IActualTimetableService actualTimetableService) : ControllerBase
    {

        /// <summary>
        /// 
        /// </summary>
        /// 
        /// <remarks>
        /// Пример тела запроса:
        /// {
        ///    "dates": [
        ///       "02.09.2024",
        ///       "03.09.2024",
        ///       "04.09.2024",
        ///       "05.09.2024",
        ///       "06.09.2024"
        ///     ]
        /// }
        /// </remarks>
        /// 
        /// <param name="stableToActualModel"></param>
        /// <returns></returns>
        [HttpPost, Route("convert-from-stable"), Authorize(policy: KeycloakPolicies.TimetableCRUD)]
        public async Task<IActionResult> StableToActual(ActualTimetableModels.StableToActual stableToActualModel)
        {
            var dates = stableToActualModel.Dates.Select(DateOnly.Parse);

#warning на линуксе и видне по разному парсятся даты
            var result = await actualTimetableService.ProjectStableToActualAsync(dates);
            if (result.Success is false)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }


        [HttpPut, Route(""), Authorize(policy: KeycloakPolicies.TimetableCRUD)]
        public async Task<IActionResult> Update(ActualTimetableModels.ActualTimetablePut model)
        {
            var result = await actualTimetableService.PutAsync(model.ToEntity());

            return result.Success is true ? Ok(result) : BadRequest(result);
        }

        [HttpDelete, Route(""), Authorize(policy: KeycloakPolicies.TimetableCRUD)]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await actualTimetableService.DeleteAsync(id);

            return result.Success is true ? Ok(result) : BadRequest(result);
        }
    }
}
