﻿using HotChocolate.Data.Filters;
using Repository.Entities.Timetable;

namespace WebApi.GraphQL.FilterTypes
{
    public class ActualTimetableFilterType : FilterInputType<ActualTimetable>
    {
        protected override void Configure(IFilterInputTypeDescriptor<ActualTimetable> descriptor)
        {
            descriptor.BindFieldsImplicitly();
            descriptor.Field(e => e.Cards).Type<ActualCardFilterType>();
        }
    }
}
