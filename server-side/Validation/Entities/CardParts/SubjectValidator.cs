using FluentValidation;
using Repository.Entities.Timetable.Cards.Parts;

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
