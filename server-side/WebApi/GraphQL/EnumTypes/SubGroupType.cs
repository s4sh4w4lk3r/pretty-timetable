using Repository.Entities.Timetable.Cards.Parts;

namespace WebApi.GraphQL.EnumTypes
{
    public class SubGroupType : EnumType<SubGroup>
    {
        protected override void Configure(IEnumTypeDescriptor<SubGroup> descriptor)
        {
            descriptor.BindValuesImplicitly();
        }
    }
}
