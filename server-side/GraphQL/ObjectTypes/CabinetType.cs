using Repository.Entities.Timetable.Cards.Parts;

namespace GraphQL.ObjectTypes
{
    public class CabinetType : ObjectType<Cabinet>
    {
        protected override void Configure(IObjectTypeDescriptor<Cabinet> descriptor)
        {
            descriptor.BindFieldsImplicitly();

            descriptor.Ignore(e => e.ActualCards);
            descriptor.Ignore(e => e.StableCards);
        }
    }
}
