using Repository.Entities.Timetable.Cards.Parts;

namespace GraphQL.ObjectTypes
{
    public class LessonTimeType : ObjectType<LessonTime>
    {
        protected override void Configure(IObjectTypeDescriptor<LessonTime> descriptor)
        {
            descriptor.BindFieldsImplicitly();

            descriptor.Ignore(e => e.ActualCards);
            descriptor.Ignore(e => e.StableCards);

            descriptor.Field(e => e.EndsAt).Type<NonNullType<StringType>>();
            descriptor.Field(e => e.StartsAt).Type<NonNullType<StringType>>();
        }
    }
}
