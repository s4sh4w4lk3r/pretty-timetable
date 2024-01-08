using FluentValidation;
using Repository.Entities.Timetable.Cards.Parts;

namespace Validation.Entities.CardParts
{
    public class CabinetValidator : AbstractValidator<Cabinet>
    {
        public CabinetValidator()
        {
            RuleFor(e=>e.Address).NotEmpty();
            RuleFor(e=>e.Number).NotEmpty();

            RuleFor(e => e.ActualCards).Null();
            RuleFor(e => e.StableCards).Null();
        }
    }
}
