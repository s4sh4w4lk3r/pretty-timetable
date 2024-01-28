using FluentValidation;
using Repository.Entities.Timetable.Cards.Info;

namespace Validation.Entities.CardParts
{
    public class RoomValidator : AbstractValidator<Room>
    {
        public RoomValidator()
        {
            RuleFor(e=>e.Address).NotEmpty();
            RuleFor(e=>e.Number).NotEmpty();

            RuleFor(e => e.ActualCards).Null();
            RuleFor(e => e.StableCards).Null();
        }
    }
}
