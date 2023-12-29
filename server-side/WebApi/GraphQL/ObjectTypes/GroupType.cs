using Repository.Entities.Timetable;

namespace WebApi.GraphQL.ObjectTypes
{
    public class GroupType : ObjectType<Group>
    {
        protected override void Configure(IObjectTypeDescriptor<Group> descriptor)
        {
            descriptor.BindFieldsImplicitly();
        }
    }
}
