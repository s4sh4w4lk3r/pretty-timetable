using Repository.Entities.Timetable.Cards.Parts;

namespace GraphQL.ObjectTypes
{
    public class SubjectType : ObjectType<Subject>
    {
        protected override void Configure(IObjectTypeDescriptor<Subject> descriptor)
        {
            descriptor.BindFieldsImplicitly();

            descriptor.Ignore(e => e.ActualCards);
            descriptor.Ignore(e => e.StableCards);
        }
    }
}
