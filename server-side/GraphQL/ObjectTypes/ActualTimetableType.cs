using Repository.Entities.Timetable;

namespace GraphQL.ObjectTypes
{


    public class ActualTimetableType : ObjectType<ActualTimetable>
    {
        protected override void Configure(IObjectTypeDescriptor<ActualTimetable> descriptor)
        {
            descriptor.BindFieldsImplicitly();
            descriptor.Field(e => e.Group).Type<NonNullType<GroupType>>();
        }
    }
}
