using FluentValidation;
using Repository.Entities.Timetable.Cards;

namespace Validation.Entities
{
    public class ActualCardValidator : AbstractValidator<ActualCard>
    {

        public ActualCardValidator()
        {
            RuleSet(RuleSets.ForeignIdsOnly, () =>
            {
                RuleFor(e => e.Id).NotEmpty();
                RuleFor(e => e.CabinetId).NotEmpty();
                RuleFor(e => e.TeacherId).NotEmpty();
                RuleFor(e => e.LessonTimeId).NotEmpty();
                RuleFor(e => e.SubjectId).NotEmpty();
                RuleFor(e => e.RelatedTimetableId).NotEmpty();
            });

            RuleSet(RuleSets.ForeignIdsOnly, () =>
            {
                RuleFor(e => e.CabinetId).NotEmpty();
                RuleFor(e => e.TeacherId).NotEmpty();
                RuleFor(e => e.LessonTimeId).NotEmpty();
                RuleFor(e => e.SubjectId).NotEmpty();
                RuleFor(e => e.RelatedTimetableId).NotEmpty();
            });
        }
    }
}
