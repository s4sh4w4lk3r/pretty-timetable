﻿using Repository.Entities.Timetable;

namespace WebApi.GraphQL.ObjectTypes
{
    public class StableTimetableType : ObjectType<StableTimetable>
    {
        protected override void Configure(IObjectTypeDescriptor<StableTimetable> descriptor)
        {
            descriptor.BindFieldsImplicitly();
        }
    }
}
