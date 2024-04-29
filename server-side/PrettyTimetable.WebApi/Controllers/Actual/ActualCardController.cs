using Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models.Request;
using PrettyTimetable.Abstractions.Actual;
using PrettyTimetable.Repository.Database;
using System.Globalization;

namespace PrettyTimetable.WebApi.Controllers.Actual
{
    [ApiController, Route("actual/card")]
    public class ActualCardController(IActualCardService actualCardService) : ControllerBase
    {

        [HttpPut, Route("")]
        public async Task<IActionResult> Update(ActualCardModels.ActualCardPut model)
        {
            var result = await actualCardService.PutAsync(model.ToEntity());

            return result.Success ? Ok(result) : BadRequest(result);
        }

        [HttpDelete, Route("")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await actualCardService.DeleteAsync(id);

            return result.Success is true ? Ok(result) : BadRequest(result);
        }

        [HttpGet, Route("kachok/{groupName}")]
        public IActionResult GetCards([FromRoute] string groupName, [FromQuery] bool isTomorrow, [FromServices] TimetableContext context)
        {
            DateTime dateTime = isTomorrow ? DateTime.Now.AddDays(1) : DateTime.Now;
            int weekNumber = ISOWeek.GetWeekOfYear(dateTime);
            DateOnly date = DateOnly.FromDateTime(dateTime);
            var cards = context.ActualCards.Where(x => x.Date == date && x.RelatedTimetable!.WeekNumber == weekNumber && x.RelatedTimetable!.Group!.Name == groupName).OrderBy(x => x.LessonTime!.Number)
                .Include(x=>x.Cabinet).Include(x=>x.Subject).Include(x=>x.Teacher).Include(x=>x.LessonTime).ToList();

            if (cards.Count != 0)
            {
                return Ok(cards);
            }

            else return BadRequest();
        }
    }
}
