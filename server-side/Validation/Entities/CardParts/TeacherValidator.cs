using FluentValidation;
using Repository.Entities.Timetable.Cards.Info;

namespace Validation.Entities.CardParts
{
    public class TeacherValidator : AbstractValidator<Teacher>
    {
        public TeacherValidator()
        {
            RuleFor(e=> e.Firstname).NotEmpty();
            RuleFor(e=> e.Lastname).NotEmpty();
            RuleFor(e=> e.Middlename).NotEmpty();

            RuleFor(e => e.ActualCards).Null();
            RuleFor(e => e.StableCards).Null();
        }
    }
}
