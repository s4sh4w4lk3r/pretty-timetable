using Repository.Entities.Timetable.Cards.Info;

namespace GraphQL.ObjectTypes
{
    public class LessonTimeType : ObjectType<LessonTime>
    {
        protected override void Configure(IObjectTypeDescriptor<LessonTime> descriptor)
        {
            descriptor.BindFieldsImplicitly();

            descriptor.Ignore(e => e.ActualCards);
            descriptor.Ignore(e => e.StableCards);

            descriptor.Field(e => e.EndsAt);
            descriptor.Field(e => e.StartsAt);
        }
    }
}
