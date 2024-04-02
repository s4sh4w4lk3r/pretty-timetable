using FluentValidation;
using PrettyTimetable.Core.Entities.Timetable.Cards.Info;

namespace Validation.Entities.CardParts
{
    public class SubjectValidator : AbstractValidator<Subject>
    {
        public SubjectValidator()
        {
            RuleFor(e => e.Name).NotEmpty();
            RuleFor(e => e.StableCards).Null();
            RuleFor(e => e.ActualCards).Null();
        }
    }
}
