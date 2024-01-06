using FluentValidation;
using Repository.Entities.Timetable.Cards;

namespace Validation.Entities
{
    public class StableCardValidator : AbstractValidator<StableCard>
    {
        public StableCardValidator()
        {
            RuleFor(e => e.CabinetId).NotEmpty();
            RuleFor(e => e.TeacherId).NotEmpty();
            RuleFor(e => e.LessonTimeId).NotEmpty();
            RuleFor(e => e.SubjectId).NotEmpty();
            RuleFor(e => e.RelatedTimetableId).NotEmpty();

            RuleFor(e => e.SubGroup).IsInEnum();
            RuleFor(e => e.DayOfWeek).IsInEnum();
        }
    }
}
