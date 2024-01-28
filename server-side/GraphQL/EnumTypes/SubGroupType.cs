using Repository.Entities.Timetable.Cards.Info;

namespace GraphQL.EnumTypes
{
    public class SubGroupType : EnumType<SubGroup>
    {
        protected override void Configure(IEnumTypeDescriptor<SubGroup> descriptor)
        {
            descriptor.BindValuesImplicitly();
        }
    }
}
