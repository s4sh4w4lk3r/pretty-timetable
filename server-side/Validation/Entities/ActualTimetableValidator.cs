using FluentValidation;
using Repository.Entities.Timetable;

namespace Validation.Entities
{
    public class ActualTimetableValidator : AbstractValidator<ActualTimetable>
    {
        public ActualTimetableValidator()
        {
            RuleFor(e=>e.GroupId).NotEmpty();
            RuleFor(e=>e.WeekNumber).NotEmpty().LessThanOrEqualTo(53);
        }
    }
}
