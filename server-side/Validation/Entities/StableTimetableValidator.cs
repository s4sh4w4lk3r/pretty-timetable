using FluentValidation;
using Repository.Entities.Timetable;

namespace Validation.Entities
{
    public class StableTimetableValidator : AbstractValidator<StableTimetable>
    {
        public StableTimetableValidator()
        {
            RuleFor(e=> e.GroupId).NotEmpty();
        }
    }
}
