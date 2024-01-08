using FluentValidation;
using Repository.Entities.Timetable;
using System.Globalization;

namespace Validation.Entities
{
    public class ActualTimetableValidator : AbstractValidator<ActualTimetable>
    {
        public ActualTimetableValidator()
        {
            RuleFor(e=>e.GroupId).NotEmpty();

            RuleFor(e => e.Cards).Null();
            RuleFor(e => e.Group).Null();

            int weeksInThisYear = ISOWeek.GetWeeksInYear(DateTime.UtcNow.Year);

            RuleFor(e => e.WeekNumber)
            .GreaterThanOrEqualTo(1)
            .LessThanOrEqualTo(weeksInThisYear);
        }
    }
}
