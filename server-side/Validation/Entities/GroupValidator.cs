using FluentValidation;
using Repository.Entities.Timetable;

namespace Validation.Entities
{
    public class GroupValidator : AbstractValidator<Group>
    {
        public GroupValidator()
        {
            RuleFor(e=>e.Name).NotEmpty();
        }
    }
}
