﻿using Repository.Entities.Timetable.Cards;

namespace WebApi.GraphQL.ObjectTypes
{
    public class StableCardType : ObjectType<StableCard>
    {
        protected override void Configure(IObjectTypeDescriptor<StableCard> descriptor)
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