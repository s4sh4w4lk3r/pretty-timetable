using Repository.Entities.Timetable.Cards.Info;

namespace GraphQL.ObjectTypes
{
    public class TeacherType : ObjectType<Teacher>
    {
        protected override void Configure(IObjectTypeDescriptor<Teacher> descriptor)
        {
            descriptor.BindFieldsImplicitly();

            descriptor.Ignore(e => e.StableCards);
            descriptor.Ignore(e => e.ActualCards);
        }
    }
}
