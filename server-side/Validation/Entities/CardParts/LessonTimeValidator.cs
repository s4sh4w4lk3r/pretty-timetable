using FluentValidation;
using Repository.Entities.Timetable.Cards.Parts;

namespace Validation.Entities.CardParts
{
    public class LessonTimeValidator : AbstractValidator<LessonTime>
    {
        public LessonTimeValidator()
        {
            RuleFor(e => e.StartsAt).LessThan(e => e.EndsAt);
            RuleFor(e => e.ActualCards).Null();
            RuleFor(e => e.StableCards).Null();

            RuleFor(e => e.ActualCards).Null();
            RuleFor(e => e.StableCards).Null();
        }
    }
}
