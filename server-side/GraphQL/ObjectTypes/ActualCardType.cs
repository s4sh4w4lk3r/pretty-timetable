using Repository.Entities.Timetable.Cards;

namespace GraphQL.ObjectTypes
{
    public class ActualCardType : ObjectType<ActualCard>
    {
        protected override void Configure(IObjectTypeDescriptor<ActualCard> descriptor)
        {
            descriptor.BindFieldsImplicitly();

            descriptor.Field(e => e.Cabinet).Type<NonNullType<CabinetType>>();
            descriptor.Field(e => e.Teacher).Type<NonNullType<TeacherType>>();
            descriptor.Field(e => e.Subject).Type<NonNullType<SubjectType>>();
            descriptor.Field(e => e.LessonTime).Type<NonNullType<LessonTimeType>>();
            descriptor.Ignore(e => e.RelatedTimetable);
        }
    }
}
